import type { MetadataRoute } from "next";
import { profile, siteMetadata } from "@/data/portfolio";
import { API_URL } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticRoutes = Object.values(siteMetadata.routes).map((route) => ({
    url: new URL(route.path, profile.website).toString(),
    lastModified,
    changeFrequency: (route.path === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route.path === "/" ? 1 : 0.7,
  }));

  try {
    const res = await fetch(`${API_URL}/api/blogs?status=published`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const blogs: { slug: string; updated_at: string; published_at: string | null }[] = await res.json();
      const blogEntries: MetadataRoute.Sitemap = blogs.map((b) => ({
        url: new URL(`/blog/${b.slug}`, profile.website).toString(),
        lastModified: new Date(b.published_at || b.updated_at),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
      return [...staticRoutes, ...blogEntries];
    }
  } catch {}
  return staticRoutes;
}
