"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  return (
    <div className="flex min-h-screen">
      {!isLoginPage && (
        <div className="w-64 bg-gray-800">
          <AdminSidebar />
        </div>
      )}
      <main className={`flex-1 bg-gray-100 p-6 ${isLoginPage ? "w-full" : ""}`}>
        {children}
      </main>
    </div>
  );
}
