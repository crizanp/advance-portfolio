"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { posts } from "../lib/data";
import { motion } from "framer-motion";
import PuffLoader from "react-spinners/PuffLoader";
import { FaLinkedin, FaGithub, FaBookOpen } from "react-icons/fa";
import Modal from "./components/Model";
import CVTemplate from "./components/CVTemplate";
import { RiPagesLine } from "react-icons/ri";
import TitleSection from "./components/HeroSection";

const getLatestPosts = () => posts.slice(0, 2);
const books = [
  {
    title: "It Ends With Us - Colleen Hoover",
    description: "A poignant tale of love, resilience, and the complexities of relationships that will stay with you.",
    link: "/blog/powerful-quotes-from-it-ends-with-us-by-colleen-hoover"
  },
  {
    title: "I Too Had a Love Story - Ravinder Singh",
    description: "A touching story capturing the innocence of first love and the pain of loss.",
    link: "/blog/i-too-had-a-love-story"
  },
  {
    title: "Verity - Colleen Hoover",
    description: "A psychological thriller exploring blurred lines between truth and fiction.",
    link: "/blog/verity"
  },
  {
    title: "It Starts With Us - Colleen Hoover",
    description: "Continues Lily Bloom's emotional journey after her difficult decision to leave Ryle.",
    link: "/blog/60-powerful-quotes-from-it-starts-with-us-by-colleen-hoover"
  }
];
const categories = [
  { name: "Web Development", icon: "💻", link: "/category/web-development" },
  { name: "Telegram Bots", icon: "🤖", link: "/category/telegram-api" },
  { name: "Reading", icon: "📚", link: "/category/reading" },
  { name: "Research", icon: "🎨", link: "/category/research" },

];
const projects = [
  {
    title: "NDSNEPAL",
    description: "A social media marketing company providing services for Facebook, Instagram, TikTok, Telegram, YouTube, and more.",
    image: "/images/1.png",
    link: "/projects"
  },
  {
    title: "Creative Science Project",
    description: "Guiding and helping you understand science practical lessons from junior classes. DIY your projects and toys while learning the science behind them.",
    image: "/images/2.png",
    link: "/projects"
  }
];
const scrollToHash = (hash: string) => {
  const element = document.getElementById(hash);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCV, setShowCV] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      scrollToHash(hash);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLatestPosts(getLatestPosts());
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <PuffLoader color="#36D7B7" size={150} />
      </div>
    );
  }

  const metaTitle = "Welcome to My Space - Portfolio, Blog, and Projects";
  const metaDescription =
    "Explore projects, blogs, and insights shared by a passionate developer. Discover tutorials, latest projects, and more.";
  const metaUrl = "https://yourwebsite.com"; // Replace with your site URL
  const metaImage = "https://yourwebsite.com/images/og-image.png"; // Replace with your OG image URL

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:image" content={metaImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
        <link rel="canonical" href={metaUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "My Portfolio",
            url: metaUrl,
          })}
        </script>
      </Head>
      <main className="p-2 pb-8 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 bg-gradient-to-br from-white to-purple-50 min-h-screen relative overflow-hidden">
        {/* Floating Decorations */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-100 rounded-full opacity-40 mix-blend-multiply blur-xl"></div>
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-purple-200 rounded-full opacity-30 mix-blend-multiply blur-lg"></div>        {/* Hero Section */}

        {/* Hero Secton */}
        <TitleSection/>
        <section className="py-16 md:py-20" id="category">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all
                   border border-purple-50 hover:border-purple-100 cursor-pointer
                   flex flex-col items-center text-center"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-4 text-purple-600">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-purple-700 transition-colors">
                    {category.name}
                  </h3>
                  <Link
                    href={category.link}
                    className="text-purple-600 hover:text-purple-800 font-medium
                      flex items-center gap-2 transition-colors"
                  >
                    Explore
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Latest Blog */}
        <section className="py-16 md:py-20 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 md:mb-16 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Latest Blog Posts
              </h2>
              <div className="w-20 h-1 bg-purple-600 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {latestPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all
                   cursor-pointer
                   flex flex-col justify-between"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-5 text-sm md:text-base leading-relaxed">
                      {post.content.slice(0, 100)}...
                    </p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-purple-600 hover:text-purple-800 font-medium
                      flex items-center gap-2 transition-colors"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Work */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 md:mb-16 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                My Past Work
              </h2>
              <div className="w-20 h-1 bg-purple-600 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all
                    cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="rounded-lg mb-5 w-full h-48 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-5 text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>
                  <Link
                    href={project.link}
                    className="text-purple-600 hover:text-purple-800 font-medium
                      flex items-center gap-2 transition-colors"
                  >
                    View Project
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Reading*/}
        <section className="py-10 md:py-14  relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 md:mb-16 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                My Latest Readings
              </h2>
              <div className="w-20 h-1 bg-purple-600 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {books.map((book, index) => (
                <motion.div
                  key={book.title}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all
                    cursor-pointer
                   relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 mb-5 text-sm md:text-base leading-relaxed">
                    {book.description}
                  </p>
                  <Link
                    href={book.link}
                    className="text-purple-600 hover:text-purple-800 font-medium
                      flex items-center gap-2 transition-colors"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Animated Game-Like Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            className="w-32 h-32 bg-blue-600 rounded-full opacity-20 absolute top-10 left-10"
            animate={{ y: [0, -20, 20], rotate: [0, 360] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="w-24 h-24 bg-green-600 rounded-full opacity-20 absolute bottom-20 right-20"
            animate={{ y: [0, 20, -20], rotate: [360, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="w-40 h-40 bg-red-600 rounded-full opacity-20 absolute top-1/2 left-1/3"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </main>
    </>
  );
}
