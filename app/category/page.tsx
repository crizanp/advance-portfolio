"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

const engineeringNotes = {
  category: "Computer Engineering Notes",
  subcategories: Array.from({ length: 8 }, (_, i) => `${i + 1}st Sem`),
};

const readingList = [
  { title: "It Ends With Us", slug: "powerful-quotes-from-it-ends-with-us-by-colleen-hoover" },
  { title: "It Starts With Us", slug: "60-powerful-quotes-from-it-starts-with-us-by-colleen-hoover" },
  { title: "I Too Had a Love Story", slug: "i-too-had-a-love-story" },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAd, setShowAd] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/tags`),
        ]);

        setCategories(categoriesRes.data);
        setTags(tagsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const timer = setTimeout(() => setShowAd(false), 60000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Advertising Banner */}
      {showAd && (
        <motion.div
          className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg mb-10 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <button
            onClick={() => setShowAd(false)}
            className="absolute top-2 right-2 text-white text-xl font-bold hover:text-gray-300"
          >
            &times;
          </button>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold">Lets Collab!</h2>
            <p className="text-lg mt-2">
              Transform your digital presence with our expert services: Next-gen Web Development, Smart Automation Tools, AI-Powered Bots/Chatbots, Cross-Platform Mobile Apps, Professional Graphics Design, and Robust Web Infrastructure Solutions.

            </p>
            <Link href="https://ighdigital.ae/marketing-solutions/web-development/" className="inline-block mt-4 bg-white text-black font-semibold py-2 px-4 rounded-full hover:bg-gray-200">
              Learn More
            </Link>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Spinner loading={loading} />

        {!loading && (
          <>
            {/* Categories Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Explore Categories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                  <Link
                    href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                    key={index}
                  >
                    <motion.div
                      className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200 hover:border-purple-200"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-lg">
                            {category.name[0]}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {category.name}
                        </h3>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Tags & Reading List Section */}
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Tags Section */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                        className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reading List Section */}
              <div className="lg:col-span-3">
                <section className="bg-purple-50 p-8 rounded-xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Reading List</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {readingList.map((book, index) => (
                      <motion.div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h3 className="font-semibold text-lg mb-2 text-gray-800">{book.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Explore key insights from this popular read
                        </p>
                        <Link
                          href={`/blog/${book.slug}`}
                          className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                        >
                          Read Summary →
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}