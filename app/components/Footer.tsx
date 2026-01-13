import Link from 'next/link';
import { useState } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaCode,
  FaBook,
  FaFileAlt,
  FaGlobe,
  FaEnvelope,
  FaArrowRight,
  FaRss
} from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add email subscription logic here
    setEmail('');
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">
              Crizan Pokhrel
            </h3>
            <p className="text-gray-500 mb-4 text-sm leading-relaxed">
              Software engineer with expertise in modern web technologies, passionate about building scalable and user-friendly applications.
            </p>
            <div className="mb-4">
              <Link href="/about" className="text-gray-400 hover:text-gray-300 text-sm flex items-center">
                <span>More about me</span>
                <FaArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/srijanpokhrel.11"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/srijan_pokhrel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/srijanpokhrel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/crizanp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-white transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaGlobe className="h-3 w-3 text-gray-500 mr-2" />
                <Link href="/category" className="text-gray-500 hover:text-gray-400 transition-colors duration-300 text-sm">
                  Category
                </Link>
              </li>
              <li className="flex items-center">
                <FaCode className="h-3 w-3 text-gray-500 mr-2" />
                <Link href="/codecleaner" className="text-gray-500 hover:text-gray-400 transition-colors duration-300 text-sm">
                  Code Cleaner
                </Link>
              </li>
              <li className="flex items-center">
                <FaFileAlt className="h-3 w-3 text-gray-500 mr-2" />
                <Link href="/projects" className="text-gray-500 hover:text-gray-400 transition-colors duration-300 text-sm">
                  Projects
                </Link>
              </li>
              <li className="flex items-center">
                <FaBook className="h-3 w-3 text-gray-500 mr-2" />
                <Link href="/notes" className="text-gray-500 hover:text-gray-400 transition-colors duration-300 text-sm">
                  Engineering Notes
                </Link>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="h-3 w-3 text-gray-500 mr-2" />
                <Link href="/contact" className="text-gray-500 hover:text-gray-400 transition-colors duration-300 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaFileAlt className="h-3 w-3 text-gray-500 mr-2" />
                <Link href="/engineering-license" className="text-gray-500 hover:text-gray-400 transition-colors duration-300 text-sm">
                  Engineering License
                </Link>
              </li>
              <li className="flex items-center">
                <FaFileAlt className="h-3 w-3 text-gray-500 mr-2" />
                <Link href="/gre-exam" className="text-gray-500 hover:text-gray-400 transition-colors duration-300 text-sm">
                  GRE Practice
                </Link>
              </li>
              <li className="flex items-center">
                <FaBook className="h-3 w-3 text-gray-500 mr-2" />
                <Link href="http://srijanpokhrel.com.np/nec-license-exam-computer-engineering-syllabus.pdf" className="text-gray-500 hover:text-gray-400 transition-colors duration-300 text-sm">
                  NEC Syllabus
                </Link>
              </li>
              <li className="flex items-center">
                <FaGlobe className="h-3 w-3 text-gray-500 mr-2" />
                <Link href="/translation" className="text-gray-500 hover:text-gray-400 transition-colors duration-300 text-sm">
                  Nepali Unicode
                </Link>
              </li>
              <li className="flex items-center">
                <FaRss className="h-3 w-3 text-gray-500 mr-2" />
                <Link href="/category/reading" className="text-gray-500 hover:text-gray-400 transition-colors duration-300 text-sm">
                  Reading
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-500 mb-4 text-sm">
              Subscribe to receive updates on latest projects and articles.
            </p>
            {subscribed ? (
              <div className="px-4 py-3 bg-gray-900/30 border border-gray-700 rounded-md text-gray-300 text-sm">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-gray-400 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors duration-300 text-sm flex items-center justify-center"
                >
                  Subscribe
                  <FaArrowRight className="ml-2 h-3 w-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-900 text-center text-gray-600 text-xs">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} Crizan Pokhrel. All Rights Reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="#" className="text-gray-500 hover:text-gray-400 transition-colors text-xs">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-400 transition-colors text-xs">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-400 transition-colors text-xs">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}