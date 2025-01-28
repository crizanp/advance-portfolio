"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PuffLoader from "react-spinners/PuffLoader";
import axios from "axios";
import PostModal from "../../components/PostModal";
import { FiArrowLeft, FiTag } from "react-icons/fi";

const FloatingBubbles = () => {
  const colors = ["#6366f1", "#10b981", "#8b5cf6", "#3b82f6"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-lg"
          style={{
            backgroundColor: colors[index % colors.length],
            width: `${Math.random() * 100 + 20}px`,
            height: `${Math.random() * 100 + 20}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.15,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [0, 1.2, 0],
            transition: {
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      ))}
    </div>
  );
};

interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
}

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const stripHtmlTags = (html: string) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const encodedCategory = encodeURIComponent(category);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${encodedCategory}/titles`
        );
        const data: Post[] = response.data;
        setPosts(data);

        const allTags = data.reduce((acc: string[], post: Post) => {
          if (post.tags) {
            acc.push(...post.tags);
          }
          return acc;
        }, []);
        setTags([...new Set(allTags)]);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching posts."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [category]);

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags?.includes(selectedTag))
    : posts;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <PuffLoader color="#7c3aed" size={150} />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white">
            {`No Posts Found For "${category}"`}
          </h2>
          <div className="flex gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              <FiArrowLeft className="text-xl" />
              Back to Home
            </Link>
            <Link
              href="/category"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              Explore Categories
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-600 text-white px-4 py-8 sm:p-8 md:p-12">
      <FloatingBubbles />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center mb-12">
            <Link
              href="/category"
              className="flex items-center gap-2 text-indigo-300 hover:text-indigo-400 transition-colors z-10"
            >
              <FiArrowLeft className="text-xl" />
              <span className="text-lg font-medium">All Categories</span>
            </Link>
            <div className="flex-grow flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <h1 className="relative text-5xl font-bold bg-clip-text text-white bg-gradient-to-r from-blue-400 to-white">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h1>
              </div>
            </div>
          </div>

          {category.toLowerCase() === "reading" && tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <FiTag className="text-2xl text-white" />
                <h3 className="text-xl font-semibold text-gray-300">
                  Filter by Tags:
                </h3>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-gray-900">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTag(null)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${!selectedTag
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  All
                </motion.button>
                {tags.map((tag) => (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${selectedTag === tag
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (

              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer"
                onClick={() => setSelectedPostSlug(post.slug)} // Open the modal
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div
                  className={`relative h-96 rounded-2xl p-6 overflow-hidden transition-transform duration-300 ${post.imageUrl ? "bg-cover bg-center" : "bg-gray-800"
                    }`}
                  style={{
                    backgroundImage: post.imageUrl
                      ? `linear-gradient(rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.9)), url(${post.imageUrl})`
                      : "",
                  }}
                >
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-white bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                        {post.title}
                      </h2>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs font-medium bg-purple-900/50 text-white rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-auto">
                      <button className="flex items-center gap-2 text-white hover:text-white transition-colors">
                        <span className="font-medium">Read More</span>
                        <svg
                          className="w-4 h-4"
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
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </AnimatePresence>
      </div>

      <PostModal
        slug={selectedPostSlug}
        isOpen={!!selectedPostSlug}
        onClose={() => setSelectedPostSlug(null)}
      />
    </main>
  );
}