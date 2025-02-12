import './globals.css';
import Script from 'next/script';
import LayoutWrapper from './components/LayoutWrapper';
import { constructMetadata } from '../lib/metadata';

export const metadata = constructMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          data-ad-client="ca-pub-6649894429894994"
        />
      </head>
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}