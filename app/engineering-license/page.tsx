"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import PuffLoader from "react-spinners/PuffLoader";
import { QuizModal } from "../components/QuizModal";
import { CpuChipIcon, CommandLineIcon, BookOpenIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { LicenseQuizModal } from "../components/LicenseExamModal";
import { ClipboardListIcon } from "lucide-react";

const engineeringSubjects = [
  {
    name: "Basic Electrical",
    icon: "⚡",
    description: "Fundamentals of circuit theory and electronics",
    color: "bg-blue-100"
  },
  {
    name: "Electronics",
    icon: "⚡",
    description: "Fundamentals of AC Amplifier and semiconductors",
    color: "bg-pink-100"
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

        {/* Hero Section */}
        <section className="py-8 xs:py-12 sm:py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700">
          <div className="max-w-7xl mx-auto text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 xs:mb-6 leading-snug xs:leading-tight"
            >
              <span className="text-gray-700">NEC License Exam Preparation</span><br />
              <span className="text-purple-600 text-xl xs:text-2xl sm:text-3xl md:text-4xl">Computer Engineering</span>
            </motion.h1>
            <p className="text-xs xs:text-sm sm:text-base text-gray-700 max-w-2xl mx-auto mb-6 xs:mb-8">
              Trusted by 85% of top engineering firms for licensure preparation. Access 15 specialized modules with adaptive practice tests and real-time performance tracking.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-8 xs:mt-12">
              {[
                ["95% Pass Rate", "First-time test takers"],
                ["2000+ Problems", "With industry-standard solutions"],
                ["NEC Aligned", "Updated 2024 exam specifications"]
              ].map(([title, subtitle], idx) => (
                <div key={idx} className="bg-white p-4 xs:p-6 rounded-xl shadow-md border border-gray-100">
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-1 xs:mb-2 text-gray-700">{title}</h3>
                  <p className="text-xs xs:text-sm text-gray-600">{subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subject Categories */}
        <section className="py-12 xs:py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* <h2 className="text-2xl xs:text-3xl font-bold text-center text-blue-900 mb-8 xs:mb-12">
              Exam Subject Domains
            </h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4">
              {engineeringSubjects.map((subject) => (
                <motion.div
                  key={subject.name}
                  whileHover={{ scale: 1.02 }}
                  className={`${subject.color} p-4 xs:p-6 rounded-xl shadow-md transition-all cursor-pointer hover:shadow-lg`}
                  onClick={() => setSelectedTopic(subject.name)}
                >
                  <div className="text-2xl xs:text-3xl mb-2 xs:mb-3">{subject.icon}</div>
                  <h3 className="text-base xs:text-lg font-bold text-gray-900 mb-1 xs:mb-2">{subject.name}</h3>
                  <p className="text-xs xs:text-sm text-gray-600">{subject.description}</p>
                  <div className="mt-2 xs:mt-3 text-blue-600 hover:text-blue-800 text-xs xs:text-sm flex items-center gap-1">
                    Start Practice
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 xs:h-4 xs:w-4"
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
        {/* <section className="py-12 xs:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl xs:text-3xl font-bold text-center text-blue-900 mb-8 xs:mb-12">
              Exam Blueprint
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xs:gap-6">
              {examStructure.map((section, idx) => (
                <div key={idx} className="bg-blue-50 p-4 xs:p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 xs:gap-3 mb-3 xs:mb-4">
                    <CpuChipIcon className="w-6 h-6 xs:w-8 xs:h-8 text-blue-700" />
                    <h3 className="text-lg xs:text-xl font-bold text-blue-900">
                      {section.section}
                    </h3>
                  </div>
                  <div className="space-y-2 xs:space-y-3">
                    <div className="flex justify-between items-center bg-white p-2 xs:p-3 rounded-lg">
                      <span className="text-xs xs:text-sm text-gray-600">Questions</span>
                      <span className="font-bold text-blue-700 text-sm xs:text-base">{section.questions}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-2 xs:p-3 rounded-lg">
                      <span className="text-xs xs:text-sm text-gray-600">Duration</span>
                      <span className="font-bold text-blue-700 text-sm xs:text-base">{section.time}</span>
                    </div>
                    <div className="mt-3 xs:mt-4">
                      <p className="text-xs xs:text-sm font-semibold text-gray-600 mb-1 xs:mb-2">Key Topics:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs xs:text-sm text-gray-700">
                        {section.topics.map((topic, tIdx) => (
                          <li key={tIdx} className="pl-1 xs:pl-2">{topic}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Additional Resources */}
        <section className="py-12 xs:py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl xs:text-3xl font-bold text-blue-900 mb-6 xs:mb-8">
              Enhanced Preparation Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xs:gap-6">
              {[
                {
                  icon: <BookOpenIcon className="w-8 h-8 xs:w-12 xs:h-12 text-blue-600 mx-auto mb-3 xs:mb-4" />,
                  title: "NEC Computer Syllabus",
                  text: "Comprehensive coverage of topics with structured modules",
                  buttonText: "View Syllabus →"
                },
                {
                  icon: <ClipboardListIcon className="w-8 h-8 xs:w-12 xs:h-12 text-blue-600 mx-auto mb-3 xs:mb-4" />,
                  title: "Reference Notes",
                  text: "Well-curated notes with key concepts and explanations",
                  buttonText: "Read Notes →"
                },
                {
                  icon: <DocumentTextIcon className="w-8 h-8 xs:w-12 xs:h-12 text-blue-600 mx-auto mb-3 xs:mb-4" />,
                  title: "Past Questions",
                  text: "Practice with real exam questions and solutions",
                  buttonText: "Practice Now →"
                }
              ].map((resource, idx) => (
                <div key={idx} className="bg-white p-4 xs:p-6 rounded-xl shadow-lg">
                  {resource.icon}
                  <h3 className="text-lg xs:text-xl font-bold mb-2 xs:mb-3 text-gray-700">{resource.title}</h3>
                  <p className="text-xs xs:text-sm text-gray-600 mb-3 xs:mb-4">{resource.text}</p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-xs xs:text-sm">
                    {resource.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}