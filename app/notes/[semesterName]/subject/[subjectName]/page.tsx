"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import PuffLoader from "react-spinners/PuffLoader";

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const safeParamToString = (param) => {
  const paramString = Array.isArray(param) ? param.join("") : param;
  return decodeURIComponent(paramString || "");
};

export default function NotesDetailPage() {
  const { subjectName, semesterName } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const subjectNameStr = safeParamToString(subjectName);
  const semesterNameStr = safeParamToString(semesterName);

  useEffect(() => {
    if (!subjectNameStr || !semesterNameStr) return;

    async function fetchPosts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/semesters/${semesterNameStr}/subjects/${subjectNameStr}/posts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [subjectNameStr, semesterNameStr]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <PuffLoader color="#6D28D9" size={120} />
      </div>
    );
  }

  // Breadcrumb navigation
  const breadcrumbItems = [
    { name: "Engineering Notes", href: "/notes" },
    { name: semesterNameStr, href: `/notes` },
    { name: subjectNameStr, href: `/notes/${semesterNameStr}/subject/${subjectNameStr}` },
  ];

  return (
    <main className="p-3 sm:p-4 lg:p-6 bg-gray-900 text-gray-100 min-h-screen">
      <nav className="mb-4 sm:mb-6">
        <ul className="flex flex-wrap text-purple-300 text-xs sm:text-sm space-x-1 sm:space-x-2">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              <Link href={item.href} className="hover:text-purple-200 transition-colors">
                {item.name}
              </Link>
              {index < breadcrumbItems.length - 1 && (
                <span className="mx-1 sm:mx-2 text-gray-600">/</span>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <h2 className="text-2xl sm:text-3xl font-bold text-purple-300 text-center mb-6">
        Notes for {subjectNameStr}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              href={`/notes/${semesterNameStr}/subject/${subjectNameStr}/post/${post.slug}`}
              key={post._id}
            >
              <motion.div
                className="bg-gray-800 p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-700 hover:border-purple-800 cursor-pointer transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-purple-300 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-4">
                      {stripHtml(post.excerpt || post.content.slice(0, 100)) +
                        "..."}
                    </p>
                  </div>
                  <div className="text-xs sm:text-sm text-purple-400 font-semibold flex items-center justify-between">
                    <span>Read More</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-4 sm:w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        ) : (
          <p className="text-center text-purple-300 col-span-full py-6">
            No posts available for this subject
          </p>
        )}
      </div>
    </main>
  );
}