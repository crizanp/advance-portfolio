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
      <div className="flex items-center justify-center min-h-screen bg-purple-50">
        <PuffLoader color="#6D28D9" size={150} />
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
    <main className="p-4 sm:p-6 lg:p-10 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      <nav className="mb-6">
        <ul className="flex flex-wrap text-purple-700 text-sm space-x-2">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              <Link href={item.href} className="hover:underline">
                {item.name}
              </Link>
              {index < breadcrumbItems.length - 1 && (
                <span className="mx-2 text-purple-400">/</span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <section className="mb-10 text-center px-2 sm:px-4 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
            <p className="bg-white p-6 rounded-xl shadow-sm border border-purple-50 hover:shadow-md transition-shadow">
              Studying isn't just about reading through the notes. Sure, these
              resources will give you a strong foundation, but remember, a strong
              foundation is just the beginning of building a great skyscraper of
              knowledge.
            </p>

          </div>
        </motion.div>
      </section>

      <h2 className="text-3xl sm:text-4xl font-bold text-purple-700 text-center mb-10">
        Notes for {subjectNameStr}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              href={`/notes/${semesterNameStr}/subject/${subjectNameStr}/post/${post.slug}`}
              key={post._id}
            >
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-purple-50 cursor-pointer transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-700 mb-4">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      {stripHtml(post.excerpt || post.content.slice(0, 100)) +
                        "..."}
                    </p>
                  </div>
                  <div className="text-sm text-purple-600 font-semibold flex items-center justify-between">
                    <span>Read More</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
          <p className="text-center text-purple-700 col-span-full py-8">
            No posts available for this subject
          </p>
        )}
      </div>
    </main>
  );
}