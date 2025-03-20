"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { FiBook, FiCode, FiCloud, FiDatabase, FiLayers, FiRss, FiServer, FiTag, FiChevronDown, FiChevronUp } from "react-icons/fi";
const Skeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-xl p-6 h-32"></div>
        ))}
      </div>
      <div className="mt-8">
        <div className="bg-gray-800 h-10 w-48 rounded-lg mb-6"></div>
        <div className="flex flex-wrap gap-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-800 h-10 w-20 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
const CategoryCard = ({ href, icon: Icon, title, description }) => (
  <Link href={href}>
    <motion.div
      className="group bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-purple-600 transition-all relative overflow-hidden h-32"
      whileHover={{ y: -4 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-purple-900/30 transition-colors">
          <Icon className="w-5 h-5 text-purple-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-200 group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  </Link>
);
const TagPill = ({ tag }) => (
  <Link href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
    <motion.span
      className="px-3 py-1.5 bg-gray-800 text-purple-400 rounded-full text-sm hover:bg-gray-700 transition-all cursor-pointer border border-gray-700 hover:border-purple-500"
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
  const [showAllTags, setShowAllTags] = useState(false);
  const tagsToShowInitially = 10;
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
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchData();
  }, []);
  const maxTagsHeight = categories.length * 66; 
  const visibleTags = showAllTags ? tags : tags.slice(0, tagsToShowInitially);
  return (
    <main className="min-h-screen bg-gray-900 text-gray-300">
      {}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>
      {}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-16 px-4 border-b border-gray-800">
        <div className="absolute inset-0 bg-purple-900 opacity-5 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-200"
          >
            Find Your Tech Topic!
          </motion.h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore coding, software, and tech with simple and clear explanations.
          </p>
        </div>
      </div>
      {}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {loading ? (
          <Skeleton />
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-200 mb-6 flex items-center">
                <FiBook className="mr-2" />
                Featured Categories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            {}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-gray-800 p-5 rounded-xl border border-gray-700">
                <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center">
                  <FiTag className="mr-2" />
                  Trending Topics
                </h3>
                <div 
                  className="flex flex-wrap gap-2" 
                  style={{ 
                    maxHeight: showAllTags ? `${maxTagsHeight}px` : '250px', 
                    overflowY: showAllTags ? 'auto' : 'hidden',
                    transition: 'max-height 0.3s ease'
                  }}
                >
                  {visibleTags.map((tag, index) => (
                    <TagPill key={index} tag={tag} />
                  ))}
                </div>
                {tags.length > tagsToShowInitially && (
                  <button 
                    className="mt-4 w-full py-2 flex items-center justify-center text-purple-400 hover:text-purple-300 bg-gray-700 rounded-lg border border-gray-600 transition-colors"
                    onClick={() => setShowAllTags(!showAllTags)}
                  >
                    {showAllTags ? (
                      <>
                        <FiChevronUp className="mr-1" /> Show Less
                      </>
                    ) : (
                      <>
                        <FiChevronDown className="mr-1" /> Show More
                      </>
                    )}
                  </button>
                )}
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