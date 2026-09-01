"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/material-icon";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { API_URL, type Blog } from "@/lib/api";

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    status: "draft" as "draft" | "published",
    tags: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("portfolio_admin_token");
    if (!t) {
      router.push("/admin/login");
      return;
    }
    setToken(t);
    fetch(`${API_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${t}` } })
      .then((r) => {
        if (!r.ok) throw new Error("Invalid token");
      })
      .catch(() => {
        localStorage.removeItem("portfolio_admin_token");
        router.push("/admin/login");
      });
  }, [router]);

  const loadBlogs = async (t?: string) => {
    const tk = t || token;
    if (!tk) return;
    try {
      const res = await fetch(`${API_URL}/api/blogs?status=all`, {
        headers: { Authorization: `Bearer ${tk}` },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setBlogs(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadBlogs(token);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("portfolio_admin_token");
    router.push("/admin/login");
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setUploadingCover(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setForm((f) => ({ ...f, cover_image: data.url }));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingCover(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError("");
    const payload = {
      title: form.title,
      slug: form.slug || undefined,
      excerpt: form.excerpt,
      content: form.content,
      cover_image: form.cover_image || null,
      status: form.status,
      tags: form.tags ? form.tags.split(",").map((s) => s.trim()).filter(Boolean) : [],
    };
    try {
      const url = editingId ? `${API_URL}/api/blogs/${editingId}` : `${API_URL}/api/blogs`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setForm({ title: "", slug: "", excerpt: "", content: "", cover_image: "", status: "draft", tags: "" });
      setEditingId(null);
      await loadBlogs();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (b: Blog) => {
    setEditingId(b.id);
    setForm({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt || "",
      content: b.content,
      cover_image: b.cover_image || "",
      status: b.status,
      tags: b.tags?.join(", ") || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    if (!token) return;
    await fetch(`${API_URL}/api/blogs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    await loadBlogs();
  };

  const handleTogglePublish = async (b: Blog) => {
    if (!token) return;
    const nextStatus = b.status === "published" ? "draft" : "published";
    await fetch(`${API_URL}/api/blogs/${b.id}/publish`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: nextStatus }),
    });
    await loadBlogs();
  };

  if (!token) return null;

  return (
    <main id="main-content" tabIndex={-1} className="page-main">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
        <div>
          <h1 className="icon-label text-3xl font-bold text-[var(--text)]">
            <MaterialIcon name="edit" className="text-3xl text-[var(--accent)]" />
            Blog admin
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">Create, edit, and publish posts. Images go to Hetzner <code className="rounded bg-[var(--accent-soft)] px-1">/uploads</code>.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/blog" className="btn btn-secondary">
            <MaterialIcon name="visibility" className="text-base" />
            View blog
          </Link>
          <button onClick={handleLogout} className="btn btn-secondary">
            <MaterialIcon name="logout" className="text-base" />
            Logout
          </button>
        </div>
      </div>

      <section className="mt-8 rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6">
        <h2 className="icon-label text-lg font-bold text-[var(--text)]">
          <MaterialIcon name={editingId ? "edit_note" : "add"} className="text-xl text-[var(--accent)]" />
          {editingId ? "Edit post" : "New post"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold tracking-widest text-[var(--muted)] uppercase">Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" placeholder="My deep dive" />
            </div>
            <div>
              <label className="text-xs font-semibold tracking-widest text-[var(--muted)] uppercase">Slug (auto if empty)</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" placeholder="my-deep-dive" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold tracking-widest text-[var(--muted)] uppercase">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" placeholder="One-line summary for cards and SEO" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold tracking-widest text-[var(--muted)] uppercase">Cover image</label>
              <div className="mt-1 flex gap-2">
                <input value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} className="flex-1 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" placeholder="/uploads/... or https://" />
                <label className="btn btn-secondary whitespace-nowrap">
                  <MaterialIcon name="upload" className="text-base" />
                  {uploadingCover ? "..." : "Upload"}
                  <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} disabled={uploadingCover} />
                </label>
              </div>
              {form.cover_image && (
                <div className="mt-2 overflow-hidden rounded-xl border border-[var(--line)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.cover_image.startsWith("http") ? form.cover_image : `${API_URL}${form.cover_image}`} alt="cover" className="h-32 w-full object-cover" />
                </div>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold tracking-widest text-[var(--muted)] uppercase">Tags (comma separated)</label>
              <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" placeholder="distributed-systems, raft" />
              <label className="mt-3 flex items-center gap-2 text-sm">
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm">
                  <option value="draft">Draft (hidden)</option>
                  <option value="published">Published (public)</option>
                </select>
                <span className="text-xs text-[var(--muted)]">Status on save</span>
              </label>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold tracking-widest text-[var(--muted)] uppercase">Content * (rich text + images)</label>
            <div className="mt-1">
              <RichTextEditor value={form.content} onChange={(html) => setForm({ ...form, content: html })} token={token} />
            </div>
          </div>

          {error && <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-600">{error}</p>}

          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="btn btn-primary">
              <MaterialIcon name={saving ? "progress_activity" : "save"} className="text-base" />
              {saving ? "Saving..." : editingId ? "Update post" : "Create post"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setForm({ title: "", slug: "", excerpt: "", content: "", cover_image: "", status: "draft", tags: "" }); }} className="btn btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="icon-label text-lg font-bold text-[var(--text)]">
          <MaterialIcon name="article" className="text-xl text-[var(--accent)]" />
          All posts ({blogs.length})
        </h2>
        {loading ? (
          <p className="mt-4 text-sm text-[var(--muted)]">Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-[var(--line)] p-6 text-sm text-[var(--muted)]">No posts yet.</p>
        ) : (
          <div className="mt-4 grid gap-4">
            {blogs.map((b) => (
              <div key={b.id} className="flex flex-col gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] font-bold tracking-[0.15em] uppercase opacity-60">
                    {b.status === "published" ? <span className="text-green-600">● Published</span> : <span className="text-amber-600">○ Draft</span>} • {b.slug} • {new Date(b.created_at).toLocaleDateString()}
                  </p>
                  <p className="mt-1 truncate text-sm font-bold text-[var(--text)]">{b.title}</p>
                  <p className="line-clamp-1 text-xs text-[var(--muted)]">{b.excerpt}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => handleTogglePublish(b)} className="btn btn-secondary px-3 py-1 text-xs">
                    <MaterialIcon name={b.status === "published" ? "visibility_off" : "publish"} className="text-sm" />
                    {b.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => handleEdit(b)} className="btn btn-secondary px-3 py-1 text-xs">
                    <MaterialIcon name="edit" className="text-sm" />
                    Edit
                  </button>
                  <Link href={`/blog/${b.slug}`} target="_blank" className="btn btn-secondary px-3 py-1 text-xs">
                    <MaterialIcon name="open_in_new" className="text-sm" />
                    View
                  </Link>
                  <button onClick={() => handleDelete(b.id)} className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
