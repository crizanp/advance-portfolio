"use client";
import { useState, useEffect } from "react";
import DynamicHead from "./components/DynamicHead";
import Link from "next/link";
import { posts } from "../lib/data";
import { motion } from "framer-motion";
import PuffLoader from "react-spinners/PuffLoader";
import { FaLinkedin, FaGithub, FaBookOpen } from "react-icons/fa";
import Modal from "./components/Model";
import CVTemplate from "./components/CVTemplate";
import { RiPagesLine } from "react-icons/ri";
import TitleSection from "./components/HeroSection";
import Image from "next/image";
import ScrollWordAnimation from "./components/ScrollWidthAnimation";

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
  const [showCV, setShowCV] = useState(false);
  const pageTitle = "Crijan Pokhrel - Developer, Blockchain Enthusiast & Tech Blogger";
  const pageDescription = "Explore my portfolio, projects, and technical blogs. I specialize in blockchain development, software engineering, and Web3 technologies.";
  const canonicalUrl = "https://srijanpokhrel.com.np";
  const ogImageUrl = "https://srijanpokhrel.com.np/images/image.png";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Crijan Pokhrel",
    url: canonicalUrl,
    jobTitle: "Developer, Blockchain Enthusiast, Tech Blogger",
    sameAs: [
      "https://linkedin.com/in/srijanpokhrel",
      "https://github.com/crizanp",
    ],
  };
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      scrollToHash(hash);
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLatestPosts(getLatestPosts());
    }, 2000);
  }, []);
 
  return (
    <>
      <DynamicHead
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        ogImageUrl={ogImageUrl}
        schemaMarkup={schemaMarkup}
      />
      <main className=" pb-8  bg-gradient-to-br from-white to-gray-50 min-h-screen relative overflow-hidden">
        <div className="relative">
         
          { }
          <TitleSection />
          { }
        </div>

        <section className="py-16 md:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Nepali Unicode Converter Feature */}
              <motion.div
                className="relative p-8 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-pink-50/80 to-gray-50/80 border border-gray-700 transition-all"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-pink-200/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-gray-200/10 rounded-full blur-3xl"></div>
                <div className="relative z-10 space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-gray-700 rounded-2xl flex items-center justify-center">
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
                        d="M9 5h6m-3 0v14m-4-4h8"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-800 to-gray-900 bg-clip-text text-transparent">
                    Nepali Unicode Converter
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Easily convert Romanized Nepali text to Nepali script. Type in English and get accurate Nepali text instantly!
                  </p>
                  <Link
                    href="/translation"
                    className="inline-flex items-center gap-3 group font-semibold text-pink-700 hover:text-pink-900 transition-colors"
                  >
                    <span>Try Now</span>
                    <div className="relative w-6 h-6">
                      <div className="absolute inset-0 bg-pink-600 rounded-full scale-0 group-hover:scale-100 transition-transform" />
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
              {/* Engineering License Feature */}
              <motion.div
                className="relative p-8 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-gray-700 transition-all"
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
                    href="/engineering-license"
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

            { }
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

      </main>
    </>
  );
}