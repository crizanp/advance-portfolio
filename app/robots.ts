import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://srijanpokhrel.com.np";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
