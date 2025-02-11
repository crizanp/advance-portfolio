"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { FiBook, FiCode, FiCloud, FiDatabase, FiLayers, FiRss, FiServer, FiTag } from "react-icons/fi";

const CategoryCard = ({ href, icon: Icon, title, description }) => (
  <Link href={href}>
    <motion.div
      className="group bg-gradient-to-br from-white to-purple-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-purple-100 hover:border-purple-200 relative overflow-hidden"
      whileHover={{ y: -8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start space-x-4">
        <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  </Link>
);

const TagPill = ({ tag }) => (
  <Link href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
    <motion.span
      className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 rounded-full text-sm hover:from-purple-200 hover:to-blue-200 transition-all cursor-pointer shadow-sm hover:shadow-md"
      whileHover={{ scale: 1.05 }}
    >
      #{tag}
    </motion.span>
  </Link>
);

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 to-blue-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl text-white md:text-6xl font-bold mb-6"
          >
            Explore Technical Resources
          </motion.h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
          Explore about coding, software, and tech with simple and clear explanations.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Spinner loading={loading} />

        {!loading && (
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Featured Categories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category, index) => (
                  <CategoryCard
                    key={index}
                    href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                    icon={getCategoryIcon(category.name)}
                    title={category.name}
                    description={category.description}
                  />
                ))}
                <CategoryCard
                  href="/notes"
                  icon={FiBook}
                  title="Engineering Resources"
                  description="Semester-wise notes and study materials"
                />
              </div>
            </div>

            {/* Tags Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FiTag className="mr-2 text-purple-600" />
                  Trending Topics
                </h3>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag, index) => (
                    <TagPill key={index} tag={tag} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const getCategoryIcon = (categoryName) => {
  const icons = {
    'Web Development': FiCode,
    'Cloud Computing': FiCloud,
    'Database': FiDatabase,
    'System Design': FiLayers,
    'API Development': FiRss,
    'DevOps': FiServer,
  };
  return icons[categoryName] || FiBook;
};