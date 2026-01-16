"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

const Skeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-xl p-6 h-32"></div>
        ))}
      </div>
      <div className="mt-8">
        <div className="bg-gray-200 h-10 w-48 rounded-lg mb-6"></div>
        <div className="flex flex-wrap gap-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-10 w-20 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ href, title, description, color }) => (
  <Link href={href}>
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${color} p-8  transition-all cursor-pointer`}
    >
      <h3 className="text-xl text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {/* <div className="text-gray-600 hover:text-gray-800 font-medium flex items-center gap-2">
        Explore
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div> */}
    </motion.div>
  </Link>
);

const TagPill = ({ tag }) => (
  <Link href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
    <motion.span
      className="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm hover:bg-gray-50 transition-all cursor-pointer border border-gray-200 hover:border-gray-300"
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

  const colorClasses = [
    "bg-blue-100",
    "bg-pink-100", 
    "bg-gray-100",
    "bg-green-100",
    "bg-purple-100",
    "bg-yellow-100"
  ];

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

  const visibleTags = showAllTags ? tags : tags.slice(0, tagsToShowInitially);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-800">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-4xl md:text-5xl mb-6 text-gray-900"
          >
            Find Your Tech Topic
          </motion.h1>
          <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto mb-8">
            Explore coding, software, and tech with simple and clear explanations. Dive into comprehensive resources across various technology domains.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {loading ? (
          <Skeleton />
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Section */}
            <div className="lg:col-span-3">
              <h2 className="text-3xl text-gray-900 mb-8">
                Featured Categories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category, index) => (
                  <CategoryCard
                    key={index}
                    href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                    title={category.name}
                    description={category.description}
                    color={colorClasses[index % colorClasses.length]}
                  />
                ))}
                <CategoryCard
                  href="/notes"
                  title="Engineering Resources"
                  description="Semester-wise notes and study materials"
                  color="bg-indigo-100"
                />
              </div>
            </div>

            {/* Tags Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Trending Topics
                </h3>
                <div 
                  className="flex flex-wrap gap-2" 
                  style={{ 
                    maxHeight: showAllTags ? '500px' : '250px', 
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
                    className="mt-4 w-full py-2 flex items-center justify-center text-gray-700 hover:text-gray-900 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors font-medium"
                    onClick={() => setShowAllTags(!showAllTags)}
                  >
                    {showAllTags ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        Show Less
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        Show More
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