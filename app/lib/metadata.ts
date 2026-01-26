// lib/metadata.ts
import { Metadata } from 'next'

interface SeoProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogImage?: string
  noIndex?: boolean
  keywords?: string[]
}

export function constructMetadata({
  title = "Srijan Pokhrel - Developer, Tech Blogger",
  description = "Explore my portfolio, projects, and technical blogs. I specialize in blockchain development, software engineering, and Web3 technologies.",
  canonicalUrl = "https://srijanpokhrel.com.np",
  ogImage = "https://srijanpokhrel.com.np/images/image.png",
  noIndex = false,
  keywords = [
    'Srijan Pokhrel',
    'Web Developer',
    'React',
    'Next.js',
    'Node.js',
    'Engineering Notes',
    'GRE',
  ],
}: SeoProps = {}): Metadata {
  const siteName = 'Srijan Pokhrel'

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Srijan Pokhrel' }],
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@crijanpokhrel',
    },
    icons: {
      icon: '/images/favicon.png',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': canonicalUrl,
        'ne-NP': `${canonicalUrl}/translation`,
      },
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    metadataBase: new URL(canonicalUrl),
  }
}

export function siteStructuredData({
  url = 'https://srijanpokhrel.com.np',
  name = 'Srijan Pokhrel',
  description = 'Portfolio and technical blog by Srijan Pokhrel',
  logo = 'https://srijanpokhrel.com.np/images/favicon.png',
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name,
    description,
    publisher: {
      '@type': 'Person',
      name: 'Srijan Pokhrel',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    logo,
  }
}

export function articleStructuredData({
  title,
  description,
  author = 'Srijan Pokhrel',
  datePublished,
  dateModified,
  image,
  url,
} : any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: image ? [image] : undefined,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Srijan Pokhrel',
      logo: {
        '@type': 'ImageObject',
        url: 'https://srijanpokhrel.com.np/images/favicon.png',
      },
    },
    description,
  }
}