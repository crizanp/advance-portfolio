"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotesPage() {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loadingSemesters, setLoadingSemesters] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  const colorClasses = [
    "bg-blue-100",
    "bg-pink-100", 
    "bg-gray-100",
    "bg-green-100",
    "bg-purple-100",
    "bg-yellow-100"
  ];

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
        const encodedSemester = encodeURIComponent(selectedSemester);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/semesters/${encodedSemester}/subjects`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch subjects");
        const data = await res.json();
        setSubjects(data.subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoadingSubjects(false);
      }
    }
    fetchSubjects();
  }, [selectedSemester]);

  const Skeleton = () => {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl p-6 h-32"></div>
          ))}
        </div>
      </div>
    );
  };

 if (loadingSemesters) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-gray-700 font-medium"
        >
          Loading Resources...
        </motion.p>
      </div>
    );
  }

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
            Engineering Resources
          </motion.h1>
          <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto mb-8">
            Computer Engineering combines hardware and software expertise to create 
            innovative solutions. Our curriculum is designed to provide both 
            foundational knowledge and cutting-edge skills.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Semester Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h2 className="text-3xl text-gray-900 mb-6">Select Semester</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {semesters.length > 0 ? (
              semesters.map((semester) => (
                <button
                  key={semester._id}
                  onClick={() => setSelectedSemester(semester.name)}
                  className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
                    selectedSemester === semester.name
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {semester.name}
                </button>
              ))
            ) : (
              <p className="text-center text-gray-600">No semesters available</p>
            )}
          </div>

          {/* Subject Cards */}
          {loadingSubjects ? (
            <Skeleton />
          ) : (
            <div>
              <h3 className="text-2xl text-gray-900 mb-6">Available Subjects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.length > 0 ? (
                  subjects.map((subject, index) => (
                    <Link
                      key={subject._id}
                      href={`/notes/${selectedSemester}/subject/${subject.name.toLowerCase()}`}
                    >
                      <motion.div
                        className={`${colorClasses[index % colorClasses.length]} p-8 transition-all cursor-pointer`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <h3 className="text-xl text-gray-900 mb-2">{subject.name}</h3>
                        <p className="text-gray-600 mb-4">
                          Explore study materials and resources
                        </p>
                      </motion.div>
                    </Link>
                  ))
                ) : (
                  <p className="text-center text-gray-600 col-span-full py-6">
                    No subjects available for this semester
                  </p>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}