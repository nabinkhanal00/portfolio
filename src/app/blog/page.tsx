import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/material-icon";
import { BlogEmptyState } from "@/components/blog-empty-state";
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

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  const allTags = Array.from(new Set(blogs.flatMap((b) => b.tags || []))).slice(0, 8);

  return (
    <main id="main-content" tabIndex={-1} className="page-main">
      {/* Slim index header — no hero copy, just system-level metadata */}
      <div className="border-b border-[var(--line)]">
        <div className="flex flex-wrap items-center justify-between gap-3 py-4 text-xs">
          <div className="flex items-center gap-3 font-mono tracking-[0.14em] text-[var(--muted)] uppercase">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {blogs.length} {blogs.length === 1 ? "entry" : "entries"}
            </span>
            {allTags.length > 0 && (
              <span className="hidden items-center gap-1.5 sm:inline-flex">
                <MaterialIcon name="label" className="text-sm opacity-60" />
                {allTags.slice(0, 3).join(" • ")}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-[var(--muted)]">
            <span className="hidden sm:inline">Field notes — infra / systems / AI</span>
          </div>
        </div>
      </div>

      {blogs.length === 0 ? (
        <BlogEmptyState />
      ) : (
        <section className="py-10">
          {/* Featured — first post gets editorial treatment, rest in dense grid */}
          {(() => {
            const [featured, ...rest] = blogs;
            const featuredExcerpt = featured.excerpt || stripHtml(featured.content).slice(0, 180) + "…";
            const featuredTime = readingTime(stripHtml(featured.content));
            return (
              <>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group relative grid overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] md:grid-cols-[1.15fr_0.85fr]"
                >
                  <div className="relative min-h-[280px] overflow-hidden bg-[var(--surface)] md:min-h-[360px]">
                    {featured.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={featured.cover_image.startsWith("http") ? featured.cover_image : `${API_URL}${featured.cover_image}`}
                        alt={featured.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-soft)] via-transparent to-[var(--surface-strong)]" />
                    )}
                    <div className="absolute left-3 top-3 flex items-center gap-2">
                      <span className="rounded-full bg-[var(--text)] px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.16em] text-white uppercase">Featured</span>
                      {featured.tags?.[0] && (
                        <span className="rounded-full border border-white/20 bg-white/80 px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.14em] text-[var(--text)] uppercase backdrop-blur">
                          {featured.tags[0]}
                        </span>
                      )}
                    </div>
                    {!featured.cover_image && (
                      <div className="absolute inset-0 grid place-items-center p-8">
                        <div className="rounded-2xl border border-[var(--line)] bg-white/70 px-6 py-8 text-center backdrop-blur dark:bg-black/20">
                          <MaterialIcon name="article" className="mx-auto text-3xl text-[var(--accent)]" />
                          <p className="mt-2 font-mono text-xs tracking-widest text-[var(--muted)] uppercase">No cover — text-first</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col p-7 md:p-8">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-[var(--muted)] uppercase">
                      <span className="inline-flex items-center gap-1.5">
                        <MaterialIcon name="calendar_today" className="text-sm opacity-60" />
                        {featured.published_at ? new Date(featured.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Draft"}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-[var(--line)]" />
                      <span>{featuredTime} min read</span>
                      <span className="ml-auto font-mono text-[10px] tracking-[0.16em] opacity-60">BLOG — {(blogs.length).toString().padStart(3, "0")}</span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-bold leading-[1.15] tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] md:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-[var(--muted)]">{featuredExcerpt}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(featured.tags || []).slice(0, 4).map((t) => (
                        <span key={t} className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[10px] tracking-wide text-[var(--muted)] uppercase">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <span className="icon-label mt-auto pt-6 text-sm font-semibold text-[var(--accent)]">
                      <MaterialIcon name="arrow_forward" className="text-base" />
                      Read entry
                    </span>
                  </div>
                </Link>

                {rest.length > 0 && (
                  <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post, idx) => {
                      const excerpt = post.excerpt || stripHtml(post.content).slice(0, 140) + "…";
                      const time = readingTime(stripHtml(post.content));
                      return (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="card-hover group flex flex-col overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)]"
                        >
                          <div className="relative h-44 overflow-hidden bg-[var(--surface)]">
                            {post.cover_image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={post.cover_image.startsWith("http") ? post.cover_image : `${API_URL}${post.cover_image}`}
                                alt={post.title}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-soft)] to-transparent" />
                            )}
                            <div className="absolute left-3 top-3 flex gap-1.5">
                              <span className="rounded-full bg-white/90 px-2 py-1 font-mono text-[10px] font-bold tracking-[0.14em] text-[var(--text)] uppercase backdrop-blur"> {new Date(post.published_at || post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })} </span>
                              <span className="rounded-full bg-[var(--text)] px-2 py-1 font-mono text-[10px] font-bold tracking-[0.14em] text-white"> {time}m </span>
                            </div>
                            <span className="absolute bottom-3 right-3 rounded-full border border-black/5 bg-white/90 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-[var(--muted)] uppercase backdrop-blur">
                              {(idx + 2).toString().padStart(2, "0")}
                            </span>
                          </div>
                          <div className="flex flex-1 flex-col p-5">
                            <div className="flex flex-wrap gap-1">
                              {(post.tags || []).slice(0, 2).map((t) => (
                                <span key={t} className="font-mono text-[10px] font-bold tracking-[0.14em] text-[var(--accent)] uppercase">
                                  #{t}
                                </span>
                              ))}
                            </div>
                            <h3 className="mt-2 line-clamp-2 text-[17px] font-bold leading-tight tracking-tight text-[var(--text)] group-hover:text-[var(--accent)]">
                              {post.title}
                            </h3>
                            <p className="mt-2 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-[var(--muted)]">{excerpt}</p>
                            <span className="icon-label mt-4 text-xs font-semibold text-[var(--muted)] group-hover:text-[var(--accent)]">
                              <MaterialIcon name="north_east" className="text-sm" />
                              Open
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {allTags.length > 0 && (
                  <div className="mt-8 flex flex-wrap items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3">
                    <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-[var(--muted)] uppercase">Topics</span>
                    <span className="h-4 w-px bg-[var(--line)]" />
                    {allTags.map((t) => (
                      <span key={t} className="rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-xs font-medium text-[var(--accent)]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </>
            );
          })()}
        </section>
      )}
    </main>
  );
}
