'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white  shadow-sm sticky top-0 z-40 border-b-2 border-purple-300 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent
                         hover:from-purple-700 hover:to-blue-600 transition-all"
            >
              <span className="font-playfair tracking-tight">Crizan Pokhrel</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2 items-center">
            <NavLink href="/category">Categories</NavLink>
            {/* <NavLink href="/category/telegram-api">Telegram Bot</NavLink> */}
            <NavLink href="/category/reading">Readings</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-purple-600 p-2 rounded-lg transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-1">
            <MobileNavLink href="/category">Categories</MobileNavLink>
            {/* <MobileNavLink href="/category/telegram-api">Telegram Bot</MobileNavLink> */}
            <MobileNavLink href="/category/reading">Readings</MobileNavLink>
            <MobileNavLink href="/about">About</MobileNavLink>
            <MobileNavLink href="/contact">Contact</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

// Reusable NavLink component
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-gray-600 hover:text-purple-600 px-4 py-2 rounded-md text-sm font-medium 
               transition-colors hover:bg-gray-50 relative group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
  </Link>
);

// Mobile NavLink component
const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="block text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md font-medium
               transition-colors hover:bg-gray-50"
  >
    {children}
  </Link>
);