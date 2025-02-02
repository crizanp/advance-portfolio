"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PuffLoader from "react-spinners/PuffLoader";
import axios from "axios";
import PostModal from "../../components/PostModal";
import { FiArrowLeft, FiTag } from "react-icons/fi";

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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <PuffLoader color="#6366f1" size={150} />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl font-bold text-gray-800">
            {`No Posts Found For "${category}"`}
          </h2>
          <div className="flex gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              <FiArrowLeft className="text-xl" />
              Back to Home
            </Link>
            <Link
              href="/category"
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              Explore Categories
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-gray-100 text-gray-900 px-4 py-8 sm:p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center relative mb-12">
            {/* Back to All Categories - Left Aligned */}
            <Link
              href="/category"
              className="flex items-center gap-2 text-indigo-500 hover:text-indigo-600 transition-colors sm:absolute sm:left-0"
            >
              <FiArrowLeft className="text-xl" />
              <span className="text-lg font-medium">All Categories</span>
            </Link>

            {/* Category Title - Centered */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-700 text-center mt-4 sm:mt-0">
              {category
                .split("-") // Split by hyphens
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                .join(" ")} {/* Join back with spaces */}
            </h1>

          </div>


          {category.toLowerCase() === "reading" && tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <FiTag className="text-2xl text-gray-700" />
                <h3 className="text-xl font-semibold text-gray-600">
                  Filter by Tags:
                </h3>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-4">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${!selectedTag
                      ? "bg-purple-500 text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    }`}
                >
                  All
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${selectedTag === tag
                        ? "bg-purple-500 text-white"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                  >
                    {tag}
                  </button>
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
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer" // Added cursor-pointer
                onClick={() => setSelectedPostSlug(post.slug)}
              >
                <h2 className="text-2xl font-bold text-gray-900">{post.title}</h2>
                {post.tags && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
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
