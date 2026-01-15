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
      <main className="bg-gradient-to-br from-white to-gray-50 min-h-screen relative overflow-hidden">
        <div className="relative">
          <TitleSection />
        </div>
        <AboutMe />

        <ToolsSection />
        
        <AnimatedDotted />
      </main>

    </>
  );
}