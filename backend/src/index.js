import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import fs from "fs";
import pg from "pg";

const { Pool } = pg;

const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "";
const ADMIN_PLAIN_FALLBACK = process.env.ADMIN_PLAIN || "";
const CORS_ORIGINS = (process.env.CORS_ORIGINS || "*")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const UPLOAD_DIR = process.env.UPLOAD_DIR || "/app/uploads";

if (!DATABASE_URL) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const pool = new Pool({ connectionString: DATABASE_URL });

async function initDb() {
  await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT DEFAULT '',
      content TEXT NOT NULL,
      cover_image TEXT,
      status TEXT NOT NULL CHECK (status IN ('draft','published')) DEFAULT 'draft',
      tags TEXT[] DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now(),
      published_at TIMESTAMPTZ
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);`);
  console.log("DB ready");
}

const app = express();

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || CORS_ORIGINS.includes("*") || CORS_ORIGINS.includes(origin)) {
        cb(null, true);
      } else {
        cb(null, true); // allow all for now, tighten later
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve uploads statically
app.use("/uploads", express.static(UPLOAD_DIR, { maxAge: "7d" }));

// Health
app.get("/health", (req, res) => res.json({ ok: true }));
app.get("/readyz", (req, res) => res.json({ ok: true }));

// Auth helpers
function signToken() {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
}
function authMiddleware(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Prepare admin hash: if ADMIN_PASSWORD_HASH not set but plain provided, hash it
let effectiveHash = ADMIN_PASSWORD_HASH;
if (!effectiveHash && ADMIN_PLAIN_FALLBACK) {
  effectiveHash = bcrypt.hashSync(ADMIN_PLAIN_FALLBACK, 10);
  console.log("Generated hash from ADMIN_PLAIN");
}
if (!effectiveHash) {
  console.warn("No admin password set! Set ADMIN_PASSWORD_HASH or ADMIN_PLAIN");
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

app.post("/api/auth/login", async (req, res) => {
  const { password } = req.body || {};
  if (!password) return res.status(400).json({ error: "Password required" });
  if (!effectiveHash) return res.status(500).json({ error: "Admin not configured" });
  const ok = await bcrypt.compare(password, effectiveHash);
  if (!ok) return res.status(401).json({ error: "Invalid password" });
  const token = signToken();
  res.json({ token });
});

app.get("/api/auth/me", authMiddleware, (req, res) => {
  res.json({ ok: true, role: "admin" });
});

// Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    cb(null, name);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Only images allowed"), false);
    cb(null, true);
  },
});

app.post("/api/upload", authMiddleware, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file" });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url, filename: req.file.filename });
});

// Blogs public
app.get("/api/blogs", async (req, res) => {
  const status = req.query.status;
  const authHeader = req.headers.authorization || "";
  let isAdmin = false;
  if (authHeader.startsWith("Bearer ")) {
    try {
      jwt.verify(authHeader.slice(7), JWT_SECRET);
      isAdmin = true;
    } catch {}
  }
  try {
    let query = "SELECT * FROM blogs ORDER BY COALESCE(published_at, created_at) DESC, created_at DESC";
    let params = [];
    if (status === "published" || (!isAdmin && !status)) {
      // public default: only published
      query = "SELECT * FROM blogs WHERE status='published' ORDER BY COALESCE(published_at, created_at) DESC, created_at DESC";
    } else if (status === "draft" && isAdmin) {
      query = "SELECT * FROM blogs WHERE status='draft' ORDER BY updated_at DESC";
    } else if (status === "all" && isAdmin) {
      // all
    } else if (status && isAdmin) {
      query = "SELECT * FROM blogs WHERE status=$1 ORDER BY updated_at DESC";
      params = [status];
    }
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error" });
  }
});

app.get("/api/blogs/:slug", async (req, res) => {
  const { slug } = req.params;
  const authHeader = req.headers.authorization || "";
  let isAdmin = false;
  if (authHeader.startsWith("Bearer ")) {
    try { jwt.verify(authHeader.slice(7), JWT_SECRET); isAdmin = true; } catch {}
  }
  try {
    const { rows } = await pool.query("SELECT * FROM blogs WHERE slug=$1 LIMIT 1", [slug]);
    if (rows.length === 0) return res.status(404).json({ error: "Not found" });
    const blog = rows[0];
    if (blog.status !== "published" && !isAdmin) return res.status(404).json({ error: "Not found" });
    res.json(blog);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error" });
  }
});

app.post("/api/blogs", authMiddleware, async (req, res) => {
  let { title, slug, excerpt, content, cover_image, coverImage, status, tags } = req.body || {};
  cover_image = cover_image || coverImage || null;
  if (!title || !content) return res.status(400).json({ error: "title and content required" });
  const finalSlug = slug ? slugify(slug) : slugify(title);
  if (!finalSlug) return res.status(400).json({ error: "Invalid slug" });
  const finalStatus = status === "published" ? "published" : "draft";
  const publishedAt = finalStatus === "published" ? new Date().toISOString() : null;
  const tagsArr = Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map(s=>s.trim()).filter(Boolean) : [];
  try {
    const { rows } = await pool.query(
      `INSERT INTO blogs (title, slug, excerpt, content, cover_image, status, tags, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [title, finalSlug, excerpt || "", content, cover_image, finalStatus, tagsArr, publishedAt]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    if (e.code === "23505") return res.status(409).json({ error: "Slug already exists" });
    console.error(e);
    res.status(500).json({ error: "DB error" });
  }
});

app.put("/api/blogs/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  let { title, slug, excerpt, content, cover_image, coverImage, status, tags } = req.body || {};
  cover_image = cover_image ?? coverImage ?? undefined;
  try {
    const existing = await pool.query("SELECT * FROM blogs WHERE id=$1", [id]);
    if (existing.rows.length === 0) return res.status(404).json({ error: "Not found" });
    const cur = existing.rows[0];
    const newTitle = title ?? cur.title;
    const newSlug = slug ? slugify(slug) : cur.slug;
    const newExcerpt = excerpt ?? cur.excerpt;
    const newContent = content ?? cur.content;
    const newCover = cover_image !== undefined ? cover_image : cur.cover_image;
    const newStatus = status ? (status === "published" ? "published" : "draft") : cur.status;
    const newTags = tags !== undefined ? (Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map(s=>s.trim()).filter(Boolean) : []) : cur.tags;
    let publishedAt = cur.published_at;
    if (newStatus === "published" && cur.status !== "published") publishedAt = new Date().toISOString();
    if (newStatus === "draft") publishedAt = null;
    const { rows } = await pool.query(
      `UPDATE blogs SET title=$1, slug=$2, excerpt=$3, content=$4, cover_image=$5, status=$6, tags=$7, published_at=$8, updated_at=now() WHERE id=$9 RETURNING *`,
      [newTitle, newSlug, newExcerpt, newContent, newCover, newStatus, newTags, publishedAt, id]
    );
    res.json(rows[0]);
  } catch (e) {
    if (e.code === "23505") return res.status(409).json({ error: "Slug already exists" });
    console.error(e);
    res.status(500).json({ error: "DB error" });
  }
});

app.patch("/api/blogs/:id/publish", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  const newStatus = status === "published" ? "published" : status === "draft" ? "draft" : null;
  if (!newStatus) return res.status(400).json({ error: "status must be draft or published" });
  try {
    const publishedAt = newStatus === "published" ? new Date().toISOString() : null;
    const { rows } = await pool.query(
      `UPDATE blogs SET status=$1, published_at=COALESCE($2, published_at), updated_at=now() WHERE id=$3 RETURNING *`,
      [newStatus, publishedAt, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Not found" });
    // if publishing, ensure published_at set
    if (newStatus === "published" && !rows[0].published_at) {
      await pool.query(`UPDATE blogs SET published_at=now() WHERE id=$1`, [id]);
      const r2 = await pool.query(`SELECT * FROM blogs WHERE id=$1`, [id]);
      return res.json(r2.rows[0]);
    }
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error" });
  }
});

app.delete("/api/blogs/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query("DELETE FROM blogs WHERE id=$1", [id]);
    if (rowCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error" });
  }
});

initDb().then(() => {
  app.listen(PORT, () => console.log(`portfolio backend listening on ${PORT}`));
}).catch((e) => {
  console.error("DB init failed", e);
  process.exit(1);
});
