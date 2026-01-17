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
import AboutMe from "./components/aboutme";
import AnimatedDotted from "./components/AnimatedDotted";
import ToolsSection from "./components/ToolsSection";
import { 
  AcademicCapIcon, 
  BookOpenIcon, 
  CodeBracketIcon, 
  RectangleGroupIcon,
  DocumentTextIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

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

const quickLinks = [
  {
    title: "GRE Practice",
    description: "Prepare for your GRE exam with curated resources",
    icon: AcademicCapIcon,
    link: "/gre-exam",
    color: "from-blue-100 to-cyan-200"
  },
  {
    title: "Computer ER Notes",
    description: "Engineering notes and study materials",
    icon: DocumentTextIcon,
    link: "/notes",
    color: "from-purple-100 to-pink-100"
  },
  {
    title: "Browse Categories",
    description: "Explore all content categories",
    icon: RectangleGroupIcon,
    link: "/category",
    color: "from-green-100 to-emerald-100"
  },
  {
    title: "Open Source Projects",
    description: "Check out my contributions on GitHub",
    icon: CodeBracketIcon,
    link: "/projects",
    color: "from-orange-100 to-red-100"
  },
  {
    title: "ER License Preparation",
    description: "Resources for engineering license exam",
    icon: SparklesIcon,
    link: "/engineering-license",
    color: "from-indigo-100 to-purple-100"
  },
  {
    title: "My Reads",
    description: "Books I've read and recommend",
    icon: BookOpenIcon,
    link: "/category/reading",
    color: "from-pink-100 to-rose-100"
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
      <main className="bg-white min-h-screen relative overflow-hidden">
        <div className="relative">
          <TitleSection />
        </div>
        <AboutMe />
        <ToolsSection />
        
        {/* Quick Links Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-4 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl text-gray-900 text-left mb-12">
              Quick Links
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={link.link}>
                    <div className={`group relative bg-gradient-to-br ${link.color}  p-6 transition-all duration-300 border border-gray-200 overflow-hidden cursor-pointer`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      <div className="relative z-10">
                       
                        <h3 className="text-xl text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                          {link.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        
        <AnimatedDotted />
      </main>
    </>
  );
}