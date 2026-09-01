import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/material-icon";
import { buildMetadata } from "@/lib/metadata";
import { API_URL, type Blog } from "@/lib/api";

export const metadata: Metadata = buildMetadata("blog");

async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${API_URL}/api/blogs?status=published`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main id="main-content" tabIndex={-1} className="page-main">
      <section className="page-hero border-b border-[var(--line)]">
        <p className="icon-label font-mono text-xs font-bold tracking-[0.3em] text-[var(--accent)] uppercase">
          <MaterialIcon name="article" className="text-sm" />
          Blog
        </p>
        <h1 className="mt-6 font-display text-4xl leading-[1.1] font-bold text-[var(--text)] sm:text-5xl">
          Notes on systems & intelligence
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          Deep dives on distributed systems, OS & networking, and how AI reshapes infrastructure — from Raft and MapReduce to PyTorch and production debugging.
        </p>
      </section>

      <section className="py-12">
        {blogs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--line)] p-12 text-center">
            <MaterialIcon name="article" className="mx-auto text-4xl text-[var(--muted)] opacity-40" />
            <p className="mt-4 text-sm text-[var(--muted)]">No published posts yet. Check back soon.</p>
            <Link href="/admin" className="btn btn-primary mt-6">
              <MaterialIcon name="edit" className="text-base" />
              Go to admin
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {blogs.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card-hover group rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-7"
              >
                {post.cover_image && (
                  <div className="mb-4 overflow-hidden rounded-2xl border border-[var(--line)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.cover_image.startsWith("http") ? post.cover_image : `${API_URL}${post.cover_image}`}
                      alt={post.title}
                      className="h-44 w-full object-cover transition group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[var(--accent)] uppercase">
                  {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Draft"}
                  {post.tags?.[0] ? ` • ${post.tags[0]}` : ""}
                </p>
                <h2 className="mt-2 text-xl font-bold leading-tight text-[var(--text)] group-hover:text-[var(--accent)]">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-[var(--muted)]">{post.excerpt}</p>
                )}
                <span className="icon-label mt-4 inline-flex text-xs font-semibold text-[var(--accent)]">
                  <MaterialIcon name="arrow_forward" className="text-sm" />
                  Read
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
