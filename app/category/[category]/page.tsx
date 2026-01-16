"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PuffLoader from "react-spinners/PuffLoader";
import axios from "axios";
import PostModal from "../../components/PostModal";
import { FiArrowLeft, FiTag, FiImage } from "react-icons/fi";

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
          <PuffLoader color="#6366f1" size={150} />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-6 max-w-2xl"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            {`No Posts Found For "${category}"`}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all"
            >
              <FiArrowLeft className="text-xl" />
              Back to Home
            </Link>
            <Link
              href="/category"
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all text-center border border-gray-300"
            >
              Explore Categories
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-200 to-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="relative z-10">
            <Link
              href="/category"
              onClick={() => scrollToHash('category')}
              className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition-colors mb-6"
            >
              <FiArrowLeft className="text-sm" />
              <span className="text-sm font-medium">All Categories</span>
            </Link>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mt-4">
              {category
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-700">
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

      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        {category.toLowerCase() === "reading" && tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 sm:mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <FiTag className="text-xl text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                Filter by Tags:
              </h3>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-3">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  !selectedTag
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedTag === tag
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
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
            {filteredPosts.map((post, index) => {
              const colorClasses = [
                "bg-blue-50 border-blue-200 hover:border-blue-300",
                "bg-purple-50 border-purple-200 hover:border-purple-300",
                "bg-green-50 border-green-200 hover:border-green-300",
                "bg-orange-50 border-orange-200 hover:border-orange-300",
                "bg-pink-50 border-pink-200 hover:border-pink-300",
                "bg-indigo-50 border-indigo-200 hover:border-indigo-300",
              ];
              const cardColor = colorClasses[index % colorClasses.length];
              
              return (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`overflow-hidden rounded-xl transition-all cursor-pointer
                          border-2 shadow-sm hover:shadow-md ${cardColor}`}
                onClick={() => setSelectedPostSlug(post.slug)}
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      <FiImage className="text-gray-300 text-4xl" />
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  {post.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
            })}
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