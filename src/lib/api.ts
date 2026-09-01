export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.nabinkhanal00.com.np";

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  status: "draft" | "published";
  tags: string[];
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export async function fetchBlogs(status?: string, token?: string): Promise<Blog[]> {
  const url = new URL(`${API_URL}/api/blogs`);
  if (status) url.searchParams.set("status", status);
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url.toString(), { headers, cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
  return res.json();
}

export async function fetchBlogBySlug(slug: string, token?: string): Promise<Blog> {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_URL}/api/blogs/${encodeURIComponent(slug)}`, {
    headers,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Blog not found");
  return res.json();
}

export function getCoverImageUrl(cover: string | null): string | null {
  if (!cover) return null;
  if (cover.startsWith("http")) return cover;
  return `${API_URL}${cover}`;
}
