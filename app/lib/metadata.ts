import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://srijanpokhrel.com.np";
const SITE_NAME = "Srijan Pokhrel";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/image.png`;

interface SeoProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
}

interface SiteStructuredDataProps {
  url?: string;
  name?: string;
  description?: string;
  logo?: string;
}

interface ArticleStructuredDataProps {
  title: string;
  description: string;
  author?: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}

const normalizeCanonicalUrl = (url: string): string => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
};

export function constructMetadata({
  title = "Srijan Pokhrel | Developer, QA Engineer and Tech Blogger",
  description =
    "Explore projects, engineering notes, and technical blogs by Srijan Pokhrel focused on React, Next.js, QA automation, and modern web engineering.",
  canonicalUrl = SITE_URL,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  keywords = [
    "Srijan Pokhrel",
    "React developer",
    "Next.js portfolio",
    "Software QA engineer",
    "Technical blog",
    "Engineering notes",
    "GRE preparation",
  ],
}: SeoProps = {}): Metadata {
  const normalizedCanonicalUrl = normalizeCanonicalUrl(canonicalUrl);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    applicationName: SITE_NAME,
    creator: SITE_NAME,
    publisher: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    category: "technology",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title,
      description,
      url: normalizedCanonicalUrl,
      siteName: SITE_NAME,
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
      creator: "@crizanp",
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
      shortcut: ["/favicon.ico"],
    },
    alternates: {
      canonical: normalizedCanonicalUrl,
      languages: {
        "en-US": SITE_URL,
        "ne-NP": `${SITE_URL}/translation`,
      },
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        }
      : undefined,
  };
}

export function siteStructuredData({
  url = SITE_URL,
  name = SITE_NAME,
  description =
    "Portfolio and technical blog by Srijan Pokhrel focused on web development, QA engineering, and practical learning resources.",
  logo = `${SITE_URL}/android-chrome-512x512.png`,
}: SiteStructuredDataProps = {}) {
  const siteRoot = normalizeCanonicalUrl(url);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteRoot}/#website`,
        url: siteRoot,
        name,
        description,
        inLanguage: ["en-US", "ne-NP"],
      },
      {
        "@type": "Person",
        "@id": `${siteRoot}/#person`,
        name,
        url: siteRoot,
        image: `${siteRoot}/images/sideimg_sri.png`,
        sameAs: [
          "https://github.com/crizanp",
          "https://linkedin.com/in/srijanpokhrel",
        ],
      },
      {
        "@type": "Organization",
        "@id": `${siteRoot}/#organization`,
        name,
        url: siteRoot,
        logo,
      },
    ],
  };
}

export function articleStructuredData({
  title,
  description,
  author = SITE_NAME,
  datePublished,
  dateModified,
  image,
  url,
}: ArticleStructuredDataProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    description,
    image: image ? [image] : [DEFAULT_OG_IMAGE],
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/android-chrome-512x512.png`,
      },
    },
  };
}