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
import Image from "next/image"; // Import the Image component

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
      <div className="flex items-center justify-center min-h-screen bg-white">
        <PuffLoader color="purple" size={150} />
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
      <main className=" pb-8  bg-gradient-to-br from-white to-purple-50 min-h-screen relative overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/bg6.jpg"
              alt="Tech Background"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="opacity-700"
            />
            <div className="absolute inset-0 bg-black/30"></div> {/* Dark overlay */}
          </div>

          {/* Hero Section */}
          <TitleSection />

          {/* Category Section */}
          <section className="py-16 md:py-15 relative z-10" id="category">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    className="bg-gray-300 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-purple-200 hover:border-purple-100 cursor-pointer flex flex-col items-center text-center"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="text-4xl mb-4 text-purple-600">{category.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-purple-700 transition-colors">
                      {category.name}
                    </h3>
                    <Link href={category.link} className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-2 transition-colors">
                      Explore
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <section className="py-16 md:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* GRE Preparation Card */}
              <motion.div
                className="relative p-8 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-purple-700 
        transition-all"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-200/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-200/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center">
                    <RiPagesLine className="w-12 h-12 text-white/90" />
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent">
                    GRE Mastery Hub
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Conquer the GRE with comprehensive prep—practice tests, study guides, and progress tracking to boost your success!
                  </p>
                  <Link
                    href="/gre-exam"
                    className="inline-flex items-center gap-3 group font-semibold text-blue-700 hover:text-blue-900 transition-colors"
                  >
                    <span>Start Your Journey</span>
                    <div className="relative w-6 h-6">
                      <div className="absolute inset-0 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                      <svg
                        className="relative w-6 h-6 animate-pulse-horizontal"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </motion.div>

              {/* Computer Engineering License Preparation Card */}
              <motion.div
                className="relative p-8 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-purple-700 
        transition-all"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute -top-16 -left-16 w-48 h-48 bg-emerald-200/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-cyan-200/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-cyan-700 rounded-2xl flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/10 rounded-full animate-ping" />
                      <svg
                        className="w-12 h-12 text-white/90"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM15 9l-6 6m0-6l6 6"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-800 to-cyan-900 bg-clip-text text-transparent">
                    Engineering License
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Prepare for your computer engineering license with mock tests and practice exams designed to boost your confidence and performance.
                  </p>
                  <Link
                    href="/computer-engineering-license-preparation"
                    className="inline-flex items-center gap-3 group font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
                  >
                    <span>Start Your Preparation</span>
                    <div className="relative w-6 h-6">
                      <div className="absolute inset-0 bg-emerald-600 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                      <svg
                        className="relative w-6 h-6 animate-bounce-horizontal"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-300/30 rounded-full"
                  initial={{
                    scale: 0,
                    x: Math.random() * 100 + '%',
                    y: Math.random() * 100 + '%'
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
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
