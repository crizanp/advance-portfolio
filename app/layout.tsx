import type { Viewport } from "next";
import Script from "next/script";
import LayoutWrapper from "./components/LayoutWrapper";
import { constructMetadata, siteStructuredData } from "./lib/metadata";
import "./globals.css";

export const metadata = constructMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f172a",
  colorScheme: "light",
};

const GA_MEASUREMENT_ID = "G-W4GP9LQR1N";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteJsonLd = siteStructuredData();

  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6649894429894994" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        <Script
          id="site-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });
          `}
        </Script>
      </head>
      <body className="antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}