import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-10 border-t-2 border-purple-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Footer Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left">
            <Link href="/about" className="hover:text-purple-600">
              About
            </Link>
            <Link href="/projects" className="hover:text-purple-600">
              Projects
            </Link>
            <Link href="/notes" className="hover:text-purple-600">
              Engineering Notes
            </Link>
            <Link href="/translation" className="hover:text-purple-600">
              Nepali Unicode
            </Link>
            <Link href="/contact" className="hover:text-purple-600">
              Contact
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://facebook.com/srijanpokhrel.11"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/srijan_pokhrel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/srijanpokhrel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/crizanp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black"
            >
              <FaGithub className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Crizan Pokhrel. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
