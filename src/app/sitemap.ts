import type { MetadataRoute } from "next";
import { profile, siteMetadata } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return Object.values(siteMetadata.routes).map((route) => ({
    url: new URL(route.path, profile.website).toString(),
    lastModified,
    changeFrequency: route.path === "/" ? "weekly" : "monthly",
    priority: route.path === "/" ? 1 : 0.7,
  }));
}
