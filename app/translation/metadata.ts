// translate/metadata.ts
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nepali Unicode Converter | Free Romanized to Devanagari Text Converter',
  description: 'Convert Romanized Nepali (Roman Script) to Unicode Devanagari instantly. Features real-time conversion, smart suggestions, over 10,000+ Nepali words dictionary, and copy-paste functionality. Perfect for typing Nepali, content creation, and digital communication.',
  keywords: ['Nepali Unicode converter', 'Romanized Nepali to Devanagari', 'Nepali text converter', 'Roman script to Devanagari', 'Nepali typing tool', 'Online Nepali converter', 'Nepali language tool', 'Devanagari converter', 'Romanization converter', 'Nepali dictionary'],
  authors: [{ name: 'Srijan Pokhrel' }],
  openGraph: {
    title: 'Nepali Unicode Converter | Free Online Tool - Convert Roman to Devanagari',
    description: 'Instantly convert Romanized Nepali to Unicode Devanagari. Features real-time conversion, smart suggestions, 10,000+ word dictionary. Perfect for typing Nepali text, content creation, and digital communication.',
    url: 'https://srijanpokhrel.com.np/translate',
    siteName: 'Srijan Pokhrel - Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://srijanpokhrel.com.np/images/unicode-converter.png',
        width: 1200,
        height: 630,
        alt: 'Nepali Unicode Converter Tool - Convert Roman to Devanagari Script',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nepali Unicode Converter | Free Roman to Devanagari Converter',
    description: 'Convert Romanized Nepali to Unicode Devanagari instantly with smart suggestions and a comprehensive 10,000+ word dictionary.',
    images: ['https://srijanpokhrel.com.np/images/unicode-converter.png'],
    creator: '@srijanpokhrel',
  },
  alternates: {
    canonical: 'https://srijanpokhrel.com.np/translate',
    languages: {
      'en-US': 'https://srijanpokhrel.com.np/translate',
      'ne-NP': 'https://srijanpokhrel.com.np/translate',
    },
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    'bingbot': 'index, follow',
  },
  other: {
    'google-site-verification': 'your-verification-code',
    'og:locale': 'en_US',
    'og:locale:alternate': 'ne_NP',
  },
}

// Structured data for the tool
export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Nepali Unicode Converter',
  alternateName: ['Nepali Text Converter', 'Romanized to Devanagari Converter', 'Roman Script to Unicode Converter'],
  description: 'Convert Romanized Nepali text to Unicode Devanagari instantly with smart suggestions, real-time conversion, and support for 10,000+ Nepali words.',
  url: 'https://srijanpokhrel.com.np/translate',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Any modern web browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  creator: {
    '@type': 'Person',
    name: 'Srijan Pokhrel',
    url: 'https://srijanpokhrel.com.np',
  },
  author: {
    '@type': 'Person',
    name: 'Srijan Pokhrel',
  },
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString(),
  inLanguage: ['en-US', 'ne-NP'],
  featureList: [
    'Real-time conversion from Roman script to Devanagari',
    'Smart suggestions for accurate word conversion',
    'Support for mixed text input',
    'Comprehensive 10,000+ Nepali words dictionary',
    'Copy to clipboard functionality',
    'Share generated Nepali text',
    'Keyboard input support',
    'Fast and responsive interface',
  ],
  screenshot: 'https://srijanpokhrel.com.np/images/unicode-converter.png',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '250',
    bestRating: '5',
    worstRating: '1',
  },
}