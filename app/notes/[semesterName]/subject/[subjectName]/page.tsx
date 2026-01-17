"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiClock, FiChevronRight } from "react-icons/fi";

// Enhanced HTML stripping function that preserves some formatting
const stripHtml = (html) => {
  if (!html) return "";
  // Replace common HTML elements with text equivalents
  const stripped = html
    .replace(/<\/p>/g, ' ')
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<[^>]*>/g, '')
    .trim();

  // Make sure we're dealing with string length properly
  const htmlLength = typeof stripped === 'string' ? stripped.length : 0;
  return stripped.substring(0, 150) + (htmlLength > 150 ? '...' : '');
};

const safeParamToString = (param) => {
  const paramString = Array.isArray(param) ? param.join("") : param;
  return decodeURIComponent(paramString || "");
};

export default function NotesDetailPage() {
  const { subjectName, semesterName } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("oldest");

  const subjectNameStr = safeParamToString(subjectName);
  const semesterNameStr = safeParamToString(semesterName);

  const colorClasses = [
    "bg-blue-100",
    "bg-pink-100", 
    "bg-gray-100",
    "bg-green-100",
    "bg-purple-100",
    "bg-yellow-100"
  ];

  useEffect(() => {
    if (!subjectNameStr || !semesterNameStr) return;

    async function fetchPosts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/semesters/${semesterNameStr}/subjects/${subjectNameStr}/posts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [subjectNameStr, semesterNameStr]);

  // Sort and filter posts
  const filteredPosts = posts
    .filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stripHtml(post.content).toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt || Date.now()).getTime() - new Date(a.createdAt || Date.now()).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt || Date.now()).getTime() - new Date(b.createdAt || Date.now()).getTime();
      } else if (sortBy === "alphabetical") {
        return (a.title || "").localeCompare(b.title || "");
      }
      return 0;
    });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Breadcrumb navigation
  const breadcrumbItems = [
    { name: "Engineering Notes", href: "/notes" },
    { name: semesterNameStr, href: `/notes` },
    { name: subjectNameStr, href: `/notes/${semesterNameStr}/subject/${subjectNameStr}` },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-gray-700 font-medium"
        >
          Loading {subjectNameStr} notes...
        </motion.p>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-br from-white to-gray-50 text-gray-900 min-h-screen">
      {/* Hero section */}
      <section className="py-12 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 px-4"
          >
            <ul className="flex flex-wrap text-gray-600 text-xs sm:text-sm">
              {breadcrumbItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Link
                    href={item.href}
                    className="hover:text-gray-900 transition-colors duration-300"
                  >
                    {item.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Link>
                  {index < breadcrumbItems.length - 1 && (
                    <FiChevronRight className="mx-2 text-gray-400" />
                  )}
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {subjectNameStr.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h1>
            <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto">
              Comprehensive study materials, lecture notes, and resources for {subjectNameStr} in {semesterNameStr}.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and filter controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 shadow-sm"
              />
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {/* <div className="flex gap-2 items-center w-full sm:w-auto">
              <label className="text-sm text-gray-700 font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 shadow-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div> */}
          </div>
        </motion.div>
      </div>

      {/* Notes grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <AnimatePresence>
          {filteredPosts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  variants={itemVariants}
                  layout
                  className="h-full"
                >
                  <Link
                    href={`/notes/${semesterNameStr}/subject/${subjectNameStr}/post/${post.slug}`}
                    className="block h-full"
                  >
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className={`${colorClasses[index % colorClasses.length]} p-6 rounded-xl cursor-pointer transition-all duration-300 h-full group border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md`}
                    >
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-center mb-4">
                            <div className="bg-white/70 p-2 rounded-lg mr-3 shadow-sm">
                              <FiBookOpen className="text-gray-700 text-lg" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                              {post.title}
                            </h3>
                          </div>
                          {/* <div className="mb-4 bg-white/60 p-3 rounded-lg border-l-2 border-gray-400">
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {stripHtml(post.excerpt || post.content)}
                            </p>
                          </div> */}
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-300">
                          <div className="flex items-center text-xs text-gray-600">
                            <FiClock className="mr-1" />
                            <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'No date'}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex items-center gap-1 transition-all duration-300">
                            Read More
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-12 px-4"
            >
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Notes Found</h3>
              <p className="text-center text-gray-600 max-w-md">
                {searchTerm
                  ? `No notes matching "${searchTerm}" were found. Try a different search term.`
                  : `No notes are available for ${subjectNameStr} at this time. Check back later.`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}