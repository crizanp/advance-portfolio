// app/codecleaner/metadata.ts
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "CodeCleaner - Optimize and Beautify Your Code",
  description: "CodeCleaner is a powerful tool to clean, format, and optimize your code effortlessly. Enhance readability and maintainability with a single click.",
  keywords: [
    "Code Cleaner", "Code Formatter", "Code Optimizer", "Code Beautifier", 
    "Clean Code", "Optimize Code", "Code Minifier", "Code Prettifier"
  ],
  openGraph: {
    title: "CodeCleaner - Optimize and Beautify Your Code",
    description: "Effortlessly clean, format, and optimize your code for better readability and maintainability.",
    url: "https://srijanpokhrel.com.np/codecleaner",
    type: "website",
    images: ["https://srijanpokhrel.com.np/images/codecleaner-og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeCleaner - Optimize and Beautify Your Code",
    description: "Effortlessly clean, format, and optimize your code for better readability and maintainability.",
    images: ["https://srijanpokhrel.com.np/images/codecleaner-twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://srijanpokhrel.com.np/codecleaner",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  other: {
    "google-site-verification": "your-verification-code",
  },
}

// Structured data for CodeCleaner
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CodeCleaner",
  description: "A tool to clean, format, and optimize your code for better readability and maintainability.",
  applicationCategory: "DeveloperTool",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Automatic code formatting",
    "Syntax highlighting",
    "Code minification",
    "Supports multiple programming languages",
    "Instant cleanup with a single click",
  ],
}
