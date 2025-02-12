"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import PuffLoader from "react-spinners/PuffLoader";
import { QuizModal } from "../components/QuizModal";
import { CpuChipIcon, CommandLineIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { LicenseQuizModal } from "../components/LicenseExamModal";

const engineeringSubjects = [
  {
    name: "Basic Electrical",
    icon: "⚡",
    description: "Fundamentals of circuit theory and electronics",
    color: "bg-blue-100"
  },
  {
    name: "Digital Logic",
    icon: "🖥️",
    description: "Boolean algebra, combinational and sequential circuits",
    color: "bg-green-100"
  },
  {
    name: "Microprocessor",
    icon: "💻",
    description: "Architecture and programming of microprocessor systems",
    color: "bg-yellow-100"
  },
  {
    name: "C Programming",
    icon: "📟",
    description: "Structured programming and low-level memory management",
    color: "bg-red-100"
  },
  {
    name: "Computer Organization",
    icon: "🧩",
    description: "CPU design, memory hierarchy, and I/O systems",
    color: "bg-purple-100"
  },
  {
    name: "Operating Systems",
    icon: "🖲️",
    description: "Process management, memory allocation, and file systems",
    color: "bg-pink-100"
  },
  {
    name: "Data Structures & Algorithms",
    icon: "📊",
    description: "Efficient data organization and computational methods",
    color: "bg-indigo-100"
  },
  {
    name: "Database Systems",
    icon: "🗃️",
    description: "Relational models, SQL, and transaction management",
    color: "bg-orange-100"
  },
  {
    name: "Computer Networks",
    icon: "🌐",
    description: "Network protocols and architecture (OSI/TCP-IP models)",
    color: "bg-teal-100"
  },
  {
    name: "Software Engineering",
    icon: "🛠️",
    description: "SDLC models, requirements analysis, and testing",
    color: "bg-cyan-100"
  },
  {
    name: "Artificial Intelligence",
    icon: "🧠",
    description: "Machine learning algorithms and neural networks",
    color: "bg-fuchsia-100"
  },
  {
    name: "Embedded Systems",
    icon: "🔌",
    description: "Real-time systems and hardware-software integration",
    color: "bg-amber-100"
  }
];

const examStructure = [
  { 
    section: "Core Subjects", 
    topics: ["Digital Logic", "Computer Organization", "Operating Systems"],
    questions: 100,
    time: "120 min" 
  },
  { 
    section: "Advanced Topics", 
    topics: ["AI/ML", "Computer Networks", "Embedded Systems"],
    questions: 80,
    time: "90 min" 
  },
  { 
    section: "Professional Practice", 
    topics: ["Software Engineering", "System Design", "Project Management"],
    questions: 60,
    time: "90 min" 
  }
];

export default function EngineeringLicensePage() {
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <PuffLoader color="#3B82F6" size={150} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Professional Engineering License Prep - Complete Computer Engineering Resource</title>
        <meta name="description" content="Comprehensive preparation for Computer Engineering licensure exam with 2000+ practice problems, detailed solutions, and performance analytics" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-white to-blue-50">

        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800">
          <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              NEC License Exam Preperation<br />
              <span className="text-blue-600">Computer Engineering</span>
            </motion.h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 max-w-2xl mx-auto mb-8">
              Trusted by 85% of top engineering firms for licensure preparation. Access 15 specialized modules with adaptive practice tests and real-time performance tracking.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-12">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">95% Pass Rate</h3>
                <p className="text-sm sm:text-base text-gray-600">First-time test takers</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">2000+ Problems</h3>
                <p className="text-sm sm:text-base text-gray-600">With industry-standard solutions</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">NEC Aligned</h3>
                <p className="text-sm sm:text-base text-gray-600">Updated 2024 exam specifications</p>
              </div>
            </div>
          </div>
        </section>

        {/* Subject Categories */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
              Exam Subject Domains
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {engineeringSubjects.map((subject) => (
                <motion.div
                  key={subject.name}
                  whileHover={{ scale: 1.02 }}
                  className={`${subject.color} p-6 rounded-xl shadow-md transition-all cursor-pointer hover:shadow-lg`}
                  onClick={() => setSelectedTopic(subject.name)}
                >
                  <div className="text-3xl mb-3">{subject.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.description}</p>
                  <div className="mt-3 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                    Start Practice
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </motion.div>
              ))}
              {selectedTopic && (
                <LicenseQuizModal
                  topic={selectedTopic}
                  onClose={() => setSelectedTopic(null)}
                />
              )}
            </div>
          </div>
        </section>

        {/* Exam Structure */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
              Exam Blueprint
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {examStructure.map((section, idx) => (
                <div key={idx} className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <CpuChipIcon className="w-8 h-8 text-blue-700" />
                    <h3 className="text-xl font-bold text-blue-900">
                      {section.section}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                      <span className="text-gray-600">Questions</span>
                      <span className="font-bold text-blue-700">{section.questions}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-bold text-blue-700">{section.time}</span>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Key Topics:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {section.topics.map((topic, tIdx) => (
                          <li key={tIdx} className="pl-2">{topic}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-8">
              Enhanced Preparation Tools
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <CommandLineIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Code Simulation</h3>
                <p className="text-gray-600 mb-4">Interactive coding environment with compiler integration</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Try Sandbox →
                </button>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <BookOpenIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Reference Library</h3>
                <p className="text-gray-600 mb-4">Access to 50+ technical manuals and standards</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Explore Resources →
                </button>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-blue-600 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-xl font-bold mb-3">Performance Analytics</h3>
                <p className="text-gray-600 mb-4">Detailed competency matrix and progress tracking</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View Dashboard →
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}