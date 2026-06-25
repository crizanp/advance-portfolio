import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://srijanpokhrel.com.np";
const POSTS_API_BASE = process.env.NEXT_PUBLIC_API_URL;

type Post = {
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
};

type StaticPage = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const staticPages: StaticPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "daily", priority: 0.9 },
  { path: "/category", changeFrequency: "weekly", priority: 0.8 },
  { path: "/translation", changeFrequency: "weekly", priority: 0.7 },
  { path: "/notes", changeFrequency: "weekly", priority: 0.9 },
  { path: "/reference-notes", changeFrequency: "weekly", priority: 0.8 },
  { path: "/gre-exam", changeFrequency: "weekly", priority: 0.8 },
  { path: "/engineering-license", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/codecleaner", changeFrequency: "monthly", priority: 0.6 },
  { path: "/digitalgift", changeFrequency: "monthly", priority: 0.5 },
];

const toDate = (value?: string): Date | undefined => {
  if (!value) {
    return undefined;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

async function fetchPosts(): Promise<Post[]> {
  if (!POSTS_API_BASE) {
    return [];
  }

  try {
    const response = await fetch(`${POSTS_API_BASE}/posts`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchPosts();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const postEntries: MetadataRoute.Sitemap = posts
    .filter((post) => typeof post.slug === "string" && post.slug.trim().length > 0)
    .map((post) => ({
      url: `${SITE_URL}/blog/${encodeURIComponent((post.slug || "").trim())}`,
      lastModified: toDate(post.updatedAt || post.createdAt) || now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return Array.from(
    new Map([...staticEntries, ...postEntries].map((entry) => [entry.url, entry])).values()
  );
}
