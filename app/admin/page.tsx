"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    posts: 0,
    quizzes: 0,
    semesters: 0,
  });
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Retrieve the token from cookies
  const token = Cookies.get("token");

  useEffect(() => {
    if (hasLoaded) return; // Prevent refetching if already loaded

    async function fetchStats() {
      try {
        const [categoriesRes, postsRes, quizzesRes, semestersRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/semesters`),
        ]);

        const categories = categoriesRes.ok ? (await categoriesRes.json()).length : 0;
        const posts = postsRes.ok ? (await postsRes.json()).length : 0;
        const quizzes = quizzesRes.ok ? (await quizzesRes.json()).length : 0;
        const semesters = semestersRes.ok ? (await semestersRes.json()).length : 0;

        setStats({ categories, posts, quizzes, semesters });
        setHasLoaded(true);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [token, hasLoaded]);

  const dashboardItems = [
    {
      title: "Posts",
      description: "Manage blog posts",
      count: stats.posts,
      links: [
        { href: "/admin/add-post", label: "Add New Post" },
        { href: "/admin/posts", label: "View All Posts" },
      ],
      icon: "📝",
    },
    {
      title: "Categories",
      description: "Organize content categories",
      count: stats.categories,
      links: [
        { href: "/admin/add-category", label: "Add New Category" },
        { href: "/admin/category", label: "View All Categories" },
      ],
      icon: "📂",
    },
    {
      title: "Quizzes",
      description: "Create and manage quizzes",
      count: stats.quizzes,
      links: [
        { href: "/admin/quiz", label: "Add New Quiz" },
        { href: "/admin/quiz/ViewAllQuizzes", label: "View All Quizzes" },
      ],
      icon: "🧠",
    },
    {
      title: "BCT Quizzes",
      description: "Specialized BCT quizzes",
      count: null,
      links: [
        { href: "/admin/BCTQuiz", label: "Add BCT Quiz" },
        { href: "/admin/BCTQuiz/ViewAllQuizzes", label: "View BCT Quizzes" },
      ],
      icon: "🎓",
    },
    {
      title: "Engineering Notes",
      description: "Manage semesters and subjects",
      count: stats.semesters,
      links: [
        { href: "/admin/engineering-notes", label: "Manage Notes" },
      ],
      icon: "📚",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-12">
       

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {dashboardItems.map((item, index) => (
              <div key={index} className="bg-blue-50 border border-blue-300  transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>

                    {item.count !== null && (
                      <div className="text-3xl font-bold text-blue-600">{item.count}</div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="space-y-2">
                    {item.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.href}
                        className="block w-full text-center bg-blue-300 text-black py-2 px-4 rounded-lg hover:bg-blue-700 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-blue-50  border border-blue-300 p-6">
          <h2 className="text-3xl text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/add-post"
              className="flex items-center justify-center bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <span className="mr-2">➕</span> New Post
            </Link>
            <Link
              href="/admin/add-category"
              className="flex items-center justify-center bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <span className="mr-2">📁</span> New Category
            </Link>
            <Link
              href="/admin/quiz"
              className="flex items-center justify-center bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors duration-200"
            >
              <span className="mr-2">❓</span> New Quiz
            </Link>
            <Link
              href="/admin/BCTQuiz"
              className="flex items-center justify-center bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <span className="mr-2">🎯</span> New BCT Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
