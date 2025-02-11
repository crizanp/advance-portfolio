import './globals.css';
import LayoutWrapper from './components/LayoutWrapper'; 
import { constructMetadata } from '../lib/metadata'

export const metadata = constructMetadata()


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
