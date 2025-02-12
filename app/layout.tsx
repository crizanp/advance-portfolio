import './globals.css';
import LayoutWrapper from './components/LayoutWrapper'; 
import { constructMetadata } from '../lib/metadata'

export const metadata = constructMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6649894429894994" />
      </head>
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
