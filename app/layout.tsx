import './globals.css'
import Script from 'next/script'
import LayoutWrapper from './components/LayoutWrapper'
import { constructMetadata, siteStructuredData } from '../lib/metadata'

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="google-adsense-account" content="ca-pub-6649894429894994" />
        {/* Site JSON-LD for structured data */}
        <Script id="site-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData()) }} />
        {/* Hreflang / alternates */}
        <link rel="alternate" hrefLang="en-US" href="https://srijanpokhrel.com.np/" />
        <link rel="alternate" hrefLang="ne-NP" href="https://srijanpokhrel.com.np/translation" />
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W4GP9LQR1N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W4GP9LQR1N');
          `}
        </Script>
      </head>
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}