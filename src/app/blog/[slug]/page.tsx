import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MaterialIcon } from "@/components/material-icon";
import { API_URL, type Blog } from "@/lib/api";

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Not found" };
  return {
    title: `${blog.title} | Nabin Khanal`,
    description: blog.excerpt || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || undefined,
      type: "article",
      images: blog.cover_image ? [{ url: blog.cover_image.startsWith("http") ? blog.cover_image : `${API_URL}${blog.cover_image}` }] : undefined,
    },
  };
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  return (
    <main id="main-content" tabIndex={-1} className="page-main">
      <Link href="/blog" className="icon-label inline-flex text-sm font-semibold text-[var(--muted)] hover:text-[var(--text)]">
        <MaterialIcon name="arrow_back" className="text-base" />
        Back to blog
      </Link>

      <article className="mx-auto mt-8 max-w-3xl">
        {blog.cover_image && (
          <div className="overflow-hidden rounded-3xl border border-[var(--line)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.cover_image.startsWith("http") ? blog.cover_image : `${API_URL}${blog.cover_image}`}
              alt={blog.title}
              className="h-[320px] w-full object-cover"
            />
          </div>
        )}

        <p className="mt-8 font-mono text-[11px] font-bold tracking-[0.2em] text-[var(--accent)] uppercase">
          {blog.published_at ? new Date(blog.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "Draft"}
          {blog.tags?.length ? ` • ${blog.tags.join(", ")}` : ""}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-[var(--text)] sm:text-4xl">
          {blog.title}
        </h1>
        {blog.excerpt && (
          <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">{blog.excerpt}</p>
        )}

        <div
          className="prose prose-neutral mt-8 max-w-none text-[15px] leading-relaxed text-[var(--muted)] prose-headings:text-[var(--text)] prose-a:text-[var(--accent)] prose-strong:text-[var(--text)] prose-img:rounded-2xl prose-img:border prose-img:border-[var(--line)]"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="mt-12 flex gap-3 border-t border-[var(--line)] pt-6">
          <Link href="/blog" className="btn btn-secondary">
            <MaterialIcon name="article" className="text-base" />
            More posts
          </Link>
          <Link href="/contact" className="btn btn-primary">
            <MaterialIcon name="mail" className="text-base" />
            Get in touch
          </Link>
        </div>
      </article>
    </main>
  );
}
