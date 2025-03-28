"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import PuffLoader from "react-spinners/PuffLoader";

export default function NotesPage() {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loadingSemesters, setLoadingSemesters] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  useEffect(() => {
    async function fetchSemesters() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/semesters`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch semesters");
        const data = await res.json();
        setSemesters(data);
        setSelectedSemester(data[0]?.name);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      } finally {
        setLoadingSemesters(false);
      }
    }
    fetchSemesters();
  }, []);

  useEffect(() => {
    if (!selectedSemester) return;

    async function fetchSubjects() {
      setLoadingSubjects(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/semesters/${selectedSemester}/subjects`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch subjects");
        const data = await res.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoadingSubjects(false);
      }
    }
    fetchSubjects();
  }, [selectedSemester]);

  // Floating Bubbles Component
  const FloatingBubbles = () => {
    const colors = ["#6D28D9", "#9333EA", "#4338CA"];
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1], 
              scale: [0.5, 1, 0.5],
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 1 
            }}
            className="absolute rounded-full blur-xl opacity-10"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: color
            }}
          />
        ))}
      </div>
    );
  };

  if (loadingSemesters) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <PuffLoader color="#6D28D9" size={120} />
      </div>
    );
  }

  return (
    <main className="relative p-3 sm:p-4 lg:p-6 bg-gray-900 min-h-screen overflow-hidden text-gray-100">
      <FloatingBubbles />
      
      {/* Introduction Section */}
      <section className="mb-8 text-center px-2 sm:px-4 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-full mx-auto"
        >
          <div className="space-y-4 text-gray-300 leading-relaxed text-base">
            <p className="bg-gray-800/50 p-4 rounded-xl transition-shadow">
              Computer Engineering combines hardware and software expertise to create 
              innovative solutions. Our curriculum is designed to provide both 
              foundational knowledge and cutting-edge skills.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Semester Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {semesters.length > 0 ? (
            semesters.map((semester) => (
              <button
                key={semester._id}
                onClick={() => setSelectedSemester(semester.name)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  selectedSemester === semester.name
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                }`}
              >
                {semester.name}
              </button>
            ))
          ) : (
            <p className="text-center text-gray-400">No semesters available</p>
          )}
        </div>

        {/* Subject Cards */}
        {loadingSubjects ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <PuffLoader color="#6D28D9" size={80} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <Link
                  key={subject._id}
                  href={`/notes/${selectedSemester}/subject/${subject.name.toLowerCase()}`}
                >
                  <motion.div
                    className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 cursor-pointer transition-all"
                    whileHover={{ 
                      y: -5,
                      scale: 1.02,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-purple-900 rounded-lg flex items-center justify-center">
                        <span className="text-purple-300 font-bold text-lg">
                          {subject.name.charAt(0)}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-100">
                        {subject.name}
                      </h2>
                    </div>
                    <div className="mt-3 flex justify-between items-center text-xs text-purple-300">
                      <span>View Resources</span>
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
                  </motion.div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-400 col-span-full py-6">
                No subjects available for this semester
              </p>
            )}
          </div>
        )}
      </motion.div>
    </main>
  );
}