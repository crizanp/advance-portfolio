"use client"; 
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import AdminLayout from './AdminLayout'; 
export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const isDigitalGiftPage = pathname === "/digitalgift";
  const isDexScreenerPage = pathname === "/dexScreener";
  return (
    <>
      {isAdminRoute ? (
        <AdminLayout> {}
          {children}
        </AdminLayout>
      ) : isDigitalGiftPage || isDexScreenerPage ? (
        <>
          {children}
        </>
      ) : (
        <>
          <Navbar /> {}
          {children} {}
          <Footer /> {}
        </>
      )}
    </>
  );
}