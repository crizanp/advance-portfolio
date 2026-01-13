// translate/metadata.ts
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nepali Unicode Converter | Romanized to Devanagari',
  description: 'Convert Romanized Nepali text to Unicode Devanagari instantly. Features real-time conversion, smart suggestions, and support for mixed text with over 10,000+ Nepali words.',
  openGraph: {
    title: 'Nepali Unicode Converter | Free Online Tool',
    description: 'Convert Romanized Nepali text to Unicode Devanagari instantly. Perfect for digital content creation and communication.',
    url: 'https://srijanpokhrel.com.np/translate',
    siteName: 'Crijan Pokhrel',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://srijanpokhrel.com.np/images/unicode-converter.png',
        width: 1200,
        height: 630,
        alt: 'Nepali Unicode Converter Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nepali Unicode Converter | Romanized to Devanagari',
    description: 'Convert Romanized Nepali to Unicode Devanagari instantly. Features real-time conversion and smart suggestions.',
    images: ['https://srijanpokhrel.com.np/images/unicode-converter.png'],
  },
  alternates: {
    canonical: 'https://srijanpokhrel.com.np/translate',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  other: {
    'google-site-verification': 'your-verification-code',
  },
}

// Structured data for the tool
export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Nepali Unicode Converter',
  description: 'Convert Romanized Nepali text to Unicode Devanagari instantly with smart suggestions and real-time conversion.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Real-time conversion',
    'Smart suggestions',
    'Support for mixed text',
    '10,000+ Nepali words dictionary',
  ],
}