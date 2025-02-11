// lib/metadata.ts
import { Metadata } from 'next'

interface SeoProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogImage?: string
  noIndex?: boolean
}

export function constructMetadata({
  title = "Crijan Pokhrel - Developer, Blockchain Enthusiast & Tech Blogger",
  description = "Explore my portfolio, projects, and technical blogs. I specialize in blockchain development, software engineering, and Web3 technologies.",
  canonicalUrl = "https://srijanpokhrel.com.np",
  ogImage = "https://srijanpokhrel.com.np/images/image.png",
  noIndex = false,
}: SeoProps = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Crijan Pokhrel",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@crijanpokhrel",
    },
    icons: {
      icon: "/images/favicon.png",
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    metadataBase: new URL('https://srijanpokhrel.com.np'),
  }
}