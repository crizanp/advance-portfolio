"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/engineering-license", label: "Computer License" },
  { href: "/translation", label: "Nepali Unicode" },
  { href: "/category/reading", label: "Readings" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const isActivePath = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-[80]">
      <nav className="relative border-b border-violet-100/70 bg-white/90 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />

        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 text-gray-900 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label="CRIZAN home"
            className="group relative inline-flex items-end gap-0.5"
          >
            <span className="text-3xl font-black leading-none tracking-tight text-violet-700 transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-4xl">
              C
            </span>
            <span className="bg-gradient-to-r from-gray-900 via-violet-700 to-gray-900 bg-clip-text text-2xl font-bold tracking-[0.10em] text-transparent sm:text-3xl">
              RIZA
            </span>
            <span className="text-3xl font-black leading-none tracking-tight text-fuchsia-600 transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-4xl">
              N
            </span>
            <span className="absolute -bottom-1 left-0 h-[2px] w-full scale-x-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-violet-100 text-violet-800"
                      : "text-gray-700 hover:bg-violet-50 hover:text-violet-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="/resume.pdf"
              download="Srijan_Pokhrel_Resume.pdf"
              className="ml-2 rounded-full px-4 py-2 text-sm font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white transition-all duration-200 hover:shadow-lg hover:shadow-violet-300/50"
            >
              Download CV
            </a>
          </div>

          <button
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-200 bg-white text-violet-700 transition hover:bg-violet-50 md:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={`fixed inset-0 top-16 bg-slate-950/35 px-4 pb-6 pt-4 transition-all duration-300 md:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`mx-auto w-full max-w-7xl rounded-3xl border border-violet-200/70 bg-white p-4 shadow-2xl transition-all duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-5"
          }`}
        >
          <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
            Menu
          </div>
          <div className="grid gap-2">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-base font-semibold transition ${
                    active
                      ? "bg-violet-100 text-violet-800"
                      : "text-gray-700 hover:bg-violet-50 hover:text-violet-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="/resume.pdf"
              download="Srijan_Pokhrel_Resume.pdf"
              onClick={() => setIsOpen(false)}
              className="block rounded-2xl px-4 py-3 text-base font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-center transition hover:shadow-lg"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}