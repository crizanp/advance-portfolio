"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  BookOpenIcon,
  CodeBracketIcon,
  RectangleGroupIcon,
  DocumentTextIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import AboutMe from "./aboutme";
import AnimatedDotted from "./AnimatedDotted";
import ToolsSection from "./ToolsSection";
import TitleSection from "./HeroSection";

const quickLinks = [
  {
    title: "GRE Practice",
    description: "Prepare for your GRE exam with curated resources",
    icon: AcademicCapIcon,
    link: "/gre-exam",
    color: "from-indigo-100 to-cyan-100",
  },
  {
    title: "Computer ER Notes",
    description: "Engineering notes and study materials",
    icon: DocumentTextIcon,
    link: "/notes",
    color: "from-violet-100 to-fuchsia-100",
  },
  {
    title: "Browse Categories",
    description: "Explore all content categories",
    icon: RectangleGroupIcon,
    link: "/category",
    color: "from-emerald-100 to-teal-100",
  },
  {
    title: "Open Source Projects",
    description: "Check out my contributions on GitHub",
    icon: CodeBracketIcon,
    link: "/projects",
    color: "from-rose-100 to-orange-100",
  },
  {
    title: "ER License Preparation",
    description: "Resources for engineering license exam",
    icon: SparklesIcon,
    link: "/engineering-license",
    color: "from-purple-100 to-indigo-100",
  },
  {
    title: "My Reads",
    description: "Books I have read and recommend",
    icon: BookOpenIcon,
    link: "/category/reading",
    color: "from-pink-100 to-rose-100",
  },
];

const scrollToHash = (hash: string) => {
  const element = document.getElementById(hash);
  if (element) {
    element.scrollIntoView({ behavior: "auto", block: "start" });
  }
};

export default function HomePageClient() {
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      scrollToHash(hash);
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="relative">
        <TitleSection />
      </div>

      <AboutMe />
      <ToolsSection />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-12 text-left text-4xl text-gray-900 sm:text-5xl">Quick Links</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;

              return (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <Link href={link.link}>
                    <div
                      className={`group relative overflow-hidden border border-gray-200 bg-gradient-to-br ${link.color} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 transition-opacity duration-300 group-hover:opacity-35`}
                      />
                      <div className="relative z-10">
                        <Icon className="mb-4 h-7 w-7 text-gray-900/80" aria-hidden="true" />
                        <h3 className="mb-2 text-xl text-gray-900 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text group-hover:text-transparent">
                          {link.title}
                        </h3>
                        <p className="text-sm text-gray-700">{link.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <AnimatedDotted />
    </main>
  );
}
