'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <nav className="bg-white  shadow-lg sticky top-0 z-40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {}
          <div className="flex items-center">
            <Link
              href="/"
              className="group relative flex items-center space-x-1"
            >
             <span className="sm:text-4xl text-3xl font-black tracking-tighter text-purple-700 ">
                C
              </span> <span className="sm:text-2xl text-2xl  font-black tracking-tighter text-gray-700 
                            transition-all duration-300">
                RIZAN
              </span>
              <span className="sm:text-4xl text-3xl font-black text-purple-700 tracking-tighter transition-colors duration-300">P</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <span className="ml-3 text-xs text-gray-500 hidden sm:block">Tech • Code • Tools</span>
          </div>
          {}
          <div className="hidden md:flex space-x-2 items-center">
            <NavLink href="/category">Categories</NavLink>
            <NavLink href="/translation">Nepali Unicode</NavLink>
            {}
            <NavLink href="/category/reading">Readings</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
          {}
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
      {}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-1">
            <MobileNavLink href="/category">Categories</MobileNavLink>
            <NavLink href="/translation">Nepali Unicode</NavLink>
            {}
            <MobileNavLink href="/category/reading">Readings</MobileNavLink>
            <MobileNavLink href="/about">About</MobileNavLink>
            <MobileNavLink href="/contact">Contact</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
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
const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="block text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md font-medium
               transition-colors hover:bg-gray-50"
  >
    {children}
  </Link>
);