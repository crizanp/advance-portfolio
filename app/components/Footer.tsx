import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 border-t border-purple-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Footer Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left">
            <Link href="/about" className="hover:text-purple-400 transition-colors">
              About
            </Link>
            <Link href="/codecleaner" className="hover:text-purple-400 transition-colors">
              Code Cleaner
            </Link>
            <Link href="/projects" className="hover:text-purple-400 transition-colors">
              Projects
            </Link>
            <Link href="/notes" className="hover:text-purple-400 transition-colors">
              Notes
            </Link>
            <a href="/translation" className="hover:text-purple-400 transition-colors">
              Nepali Unicode
            </a>
            <Link href="/contact" className="hover:text-purple-400 transition-colors">
              Contact
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="https://facebook.com/srijanpokhrel.11"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/srijan_pokhrel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-400 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/srijanpokhrel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/crizanp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
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