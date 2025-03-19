"use client"

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
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <PuffLoader color="#A78BFA" size={150} />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 px-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-6 max-w-2xl"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-100">
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
    <main className="relative min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-white to-purple-100 text-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="relative z-10">
            <Link
              href="/#category"
              onClick={() => scrollToHash('category')}
              className="inline-flex items-center gap-2 text-gray/80 hover:text-black transition-colors mb-6"
            >
              <FiArrowLeft className="text-sm" />
              <span className="text-sm font-medium">All Categories</span>
            </Link>
            
            <h1 className="text-4xl sm:text-5xl text-gray-800 md:text-6xl font-bold mt-4">
              {category
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h1>
            <p className="mt-4 text-lg text-gray/80">
              Explore my collection of articles and insights on {category}
            </p>
          </div>
          
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 25px 25px, white 1%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)",
              backgroundSize: "100px 100px"
            }}/>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {category.toLowerCase() === "reading" && tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 sm:mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <FiTag className="text-xl text-purple-400" />
              <h3 className="text-lg font-semibold text-gray-200">
                Filter by Tags:
              </h3>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-3">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  !selectedTag
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    selectedTag === tag
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 sm:p-6 bg-gray-800 rounded-xl transition-all cursor-pointer
                          border-2 border-gray-700 hover:border-purple-700
                          shadow-purple-900/40 hover:shadow-purple-700/20"
                onClick={() => setSelectedPostSlug(post.slug)}
              >
                <h2 className="text-lg sm:text-xl font-bold text-gray-100 mb-2">
                  {post.title}
                </h2>
                {post.tags && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium bg-gray-700 text-purple-300 rounded-full"
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