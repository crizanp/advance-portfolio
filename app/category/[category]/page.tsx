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
const scrollToHash = (hash) => {
  const element = document.getElementById(hash);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
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
      <div className="flex items-center justify-center min-h-screen bg-white">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <PuffLoader color="#8B5CF6" size={150} /> {/* Changed to purple-500 */}
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 px-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-6 max-w-2xl"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
            {`No Posts Found For "${category}"`}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
            >
              <FiArrowLeft className="text-xl" />
              Back to Home
            </Link>
            <Link
              href="/category"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all text-center"
            >
              Explore Categories
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-white text-gray-900 px-4 py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center relative mb-8">
            <Link
              href="/#category"
              onClick={() => scrollToHash('category')}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors sm:absolute sm:left-0 mb-4 sm:mb-0"
            >
              <FiArrowLeft className="text-sm" />
              <span className="text-sm font-medium">All Categories</span>
            </Link>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-800 text-center">
              {category
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h1>
          </div>

          {category.toLowerCase() === "reading" && tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 sm:mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <FiTag className="text-xl text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-700">
                  Filter by Tags:
                </h3>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-3">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${!selectedTag
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  All
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${selectedTag === tag
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer
                          border-2 border-purple-100 hover:border-purple-200  /* Added purple borders */
                          shadow-purple-200/40 hover:shadow-purple-300/50"  /* Added purple shadows */
                onClick={() => setSelectedPostSlug(post.slug)}
              >
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h2>
                {post.tags && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full"
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