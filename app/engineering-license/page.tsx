'use client';

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import PuffLoader from "react-spinners/PuffLoader";
import { LicenseQuizModal } from "../components/LicenseExamModal";
import { BookOpenIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { ClipboardListIcon } from "lucide-react";

const engineeringSubjects = [
  {
    name: "Basic Electrical",
    icon: "⚡",
    description: "Fundamentals of circuit theory and electronics",
    color: "bg-gray-800 hover:bg-gray-700"
  },
  {
    name: "Electronics",
    icon: "⚡",
    description: "Fundamentals of AC Amplifier and semiconductors",
    color: "bg-gray-800 hover:bg-gray-700"
  },
  {
    name: "Digital Logic",
    icon: "🖥️",
    description: "Boolean algebra, combinational and sequential circuits",
    color: "bg-gray-800 hover:bg-gray-700"
  },
  {
    name: "Microprocessor",
    icon: "💻",
    description: "Architecture and programming of microprocessor systems",
    color: "bg-gray-800 hover:bg-gray-700"
  },
  {
    name: "C Programming",
    icon: "📟",
    description: "Structured programming and low-level memory management",
    color: "bg-gray-800 hover:bg-gray-700"
  },
  {
    name: "Object Oriented Programming",
    icon: "🎯",
    description: "Encapsulation, inheritance, polymorphism, and design patterns",
    color: "bg-gray-800 hover:bg-gray-700"
  },
  {
    name: "Computer Organization",
    icon: "🧩",
    description: "CPU design, memory hierarchy, and I/O systems",
    color: "bg-gray-800 hover:bg-gray-700"
  },
  {
    name: "Operating Systems",
    icon: "🖲️",
    description: "Process management, memory allocation, and file systems",
    color: "bg-gray-800 hover:bg-gray-700"
  },
  {
    name: "Data Structures & Algorithms",
    icon: "📊",
    description: "Efficient data organization and computational methods",
    color: "bg-gray-800 hover:bg-gray-700"
  },
  {
    name: "Database Systems",
    icon: "🗃️",
    description: "Relational models, SQL, and transaction management",
    color: "bg-gray-800 hover:bg-gray-700"
  },
  {
    name: "Computer Networks",
    icon: "🌐",
    description: "Network protocols and architecture (OSI/TCP-IP models)",
    color: "bg-gray-800 hover:bg-gray-700"
  },
  {
    name: "Software Engineering",
    icon: "🛠️",
    description: "SDLC models, requirements analysis, and testing",
    color: "bg-gray-800 hover:bg-gray-700"
  },
  {
    name: "Artificial Intelligence",
    icon: "🧠",
    description: "Machine learning algorithms and neural networks",
    color: "bg-gray-800 hover:bg-gray-700"
  },
  {
    name: "Embedded Systems",
    icon: "🔌",
    description: "Real-time systems and hardware-software integration",
    color: "bg-gray-800 hover:bg-gray-700"
  },
];

export default function EngineeringLicensePage() {
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <PuffLoader color="#7C3AED" size={150} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Professional Engineering License Prep - Complete Computer Engineering Resource</title>
        <meta name="description" content="Comprehensive preparation for Computer Engineering licensure exam with 2000+ practice problems, detailed solutions, and performance analytics" />
      </Head>

      <main className="min-h-screen bg-gray-900 text-gray-100">
        {/* Hero Section */}
        <section className="py-8 xs:py-12 sm:py-16 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100">
          <div className="max-w-7xl mx-auto text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 xs:mb-6 leading-snug xs:leading-tight"
            >
              <p className="text-gray-300 text-2xl xs:text-2xl sm:text-3xl md:text-4xl mb-2">Computer Engineering License Exam Preparation</p>
            </motion.h1>
            <p className="text-xs xs:text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-6 xs:mb-8">
              Trusted by 85% of top engineering firms for licensure preparation. Access 15 specialized modules with adaptive practice tests and real-time performance tracking.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-8 xs:mt-12">
              {[
                ["95% Pass Rate", "First-time test takers"],
                ["2000+ Problems", "With industry-standard solutions"],
                ["NEC Aligned", "Updated 2024 exam specifications"]
              ].map(([title, subtitle], idx) => (
                <div key={idx} className="bg-gray-800 p-4 xs:p-6 rounded-xl shadow-lg border border-gray-700">
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-1 xs:mb-2 text-gray-200">{title}</h3>
                  <p className="text-xs xs:text-sm text-gray-400">{subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subject Categories */}
        <section className="py-12 xs:py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4">
              {engineeringSubjects.map((subject) => (
                <motion.div
                  key={subject.name}
                  whileHover={{ scale: 1.05 }}
                  className={`${subject.color} p-4 xs:p-6 rounded-xl shadow-md transition-all cursor-pointer text-gray-100`}
                  onClick={() => setSelectedTopic(subject.name)}
                >
                  <div className="text-2xl xs:text-3xl mb-2 xs:mb-3">{subject.icon}</div>
                  <h3 className="text-base xs:text-lg font-bold text-gray-400 mb-1 xs:mb-2">{subject.name}</h3>
                  <p className="text-xs xs:text-sm text-gray-400">{subject.description}</p>
                  <div className="mt-2 xs:mt-3 text-gray-300 hover:text-gray-200 text-xs xs:text-sm flex items-center gap-1">
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

        {/* Additional Resources */}
        <section className="py-12 xs:py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl xs:text-3xl font-bold text-gray-400 mb-6 xs:mb-8">
              Enhanced Preparation Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xs:gap-6">
              {[
                {
                  icon: <BookOpenIcon className="w-8 h-8 xs:w-12 xs:h-12 text-gray-500 mx-auto mb-3 xs:mb-4" />,
                  title: "NEC Computer Syllabus",
                  text: "Comprehensive coverage of topics with structured modules",
                  buttonText: "View Syllabus →",
                  href: "/nec-license-exam-computer-engineering-syllabus.pdf" 
                },
                {
                  icon: <ClipboardListIcon className="w-8 h-8 xs:w-12 xs:h-12 text-gray-500 mx-auto mb-3 xs:mb-4" />,
                  title: "Reference Notes",
                  text: "Well-curated notes with key concepts and explanations",
                  buttonText: "Read Notes →",
                  href: "/reference-notes" 
                },
                {
                  icon: <DocumentTextIcon className="w-8 h-8 xs:w-12 xs:h-12 text-gray-500 mx-auto mb-3 xs:mb-4" />,
                  title: "Past Questions",
                  text: "Practice with real exam questions and solutions",
                  buttonText: "Practice Now →",
                  href: "#" 
                }
              ].map((resource, idx) => (
                <div key={idx} className="bg-gray-900 p-4 xs:p-6 rounded-xl shadow-lg">
                  {resource.icon}
                  <h3 className="text-lg xs:text-xl font-bold mb-2 xs:mb-3 text-gray-400">{resource.title}</h3>
                  <p className="text-xs xs:text-sm text-gray-400 mb-3 xs:mb-4">{resource.text}</p>
                  <Link
                    href={resource.href}
                    className="text-gray-500 hover:text-gray-300 font-medium text-xs xs:text-sm"
                  >
                    {resource.buttonText}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}