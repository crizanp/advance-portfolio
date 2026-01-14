import { NextResponse } from 'next/server'

const SITE_URL = process.env.SITE_URL || 'https://srijanpokhrel.com.np'

async function fetchPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
    if (!res.ok) return []
    const data = await res.json()
    return data
  } catch (e) {
    return []
  }
}

export async function GET() {
  const staticPages = [
    '/',
    '/about',
    '/projects',
    '/blog',
    '/category',
    '/translation',
    '/notes',
    '/gre-exam',
    '/engineering-license',
  ]

  const posts = await fetchPosts()

  const urls = [
    ...staticPages.map((p) => ({ loc: `${SITE_URL}${p}`, changefreq: 'daily', priority: 0.8 })),
    ...posts.map((post) => ({ loc: `${SITE_URL}/blog/${post.slug}`, lastmod: post.updatedAt || post.createdAt || new Date().toISOString(), changefreq: 'weekly', priority: 0.7 })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map((u) => {
        return `<url>
          <loc>${u.loc}</loc>
          ${u.lastmod ? `<lastmod>${new Date(u.lastmod).toISOString()}</lastmod>` : ''}
          <changefreq>${u.changefreq}</changefreq>
          <priority>${u.priority}</priority>
        </url>`
      })
      .join('\n')}
  </urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
