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

  if (loadingSemesters) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-purple-50">
        <PuffLoader color="#6D28D9" size={150} />
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-6 lg:p-10 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      
      {/* Introduction Section */}
      <section className="mb-12 text-center px-2 sm:px-4 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-full mx-auto"
        >

          <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
            <p className=" p-6 rounded-xl transition-shadow">
              Computer Engineering combines hardware and software expertise to create 
              innovative solutions. Our curriculum is designed to provide both 
              foundational knowledge.
              <div className="grid md:grid-cols-2 gap-6">
            </div>
            </p>
            
          </div>
        </motion.div>
      </section>

      {/* Semester Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {semesters.length > 0 ? (
            semesters.map((semester) => (
              <button
                key={semester._id}
                onClick={() => setSelectedSemester(semester.name)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  selectedSemester === semester.name
                    ? "bg-purple-600 text-white shadow-purple-sm"
                    : "bg-white text-purple-700 shadow-sm hover:shadow-md border border-purple-100"
                }`}
              >
                {semester.name}
              </button>
            ))
          ) : (
            <p className="text-center text-purple-700">No semesters available</p>
          )}
        </div>

        {/* Subject Cards */}
        {loadingSubjects ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <PuffLoader color="#6D28D9" size={100} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <Link
                  key={subject._id}
                  href={`/notes/${selectedSemester}/subject/${subject.name.toLowerCase()}`}
                >
                  <motion.div
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-purple-50 cursor-pointer transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-xl">
                          {subject.name.charAt(0)}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {subject.name}
                      </h2>
                    </div>
                    <div className="mt-4 flex justify-between items-center text-sm text-purple-600">
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
              <p className="text-center text-purple-700 col-span-full py-8">
                No subjects available for this semester
              </p>
            )}
          </div>
        )}
      </motion.div>
    </main>
  );
}