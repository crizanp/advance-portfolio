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
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Electronics",
    icon: "⚡",
    description: "Fundamentals of AC Amplifier and semiconductors",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Digital Logic",
    icon: "🖥️",
    description: "Boolean algebra, combinational and sequential circuits",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Microprocessor",
    icon: "💻",
    description: "Architecture and programming of microprocessor systems",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "C Programming",
    icon: "📟",
    description: "Structured programming and low-level memory management",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Object Oriented Programming",
    icon: "🎯",
    description: "Encapsulation, inheritance, polymorphism, and design patterns",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Computer Organization",
    icon: "🧩",
    description: "CPU design, memory hierarchy, and I/O systems",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Operating Systems",
    icon: "🖲️",
    description: "Process management, memory allocation, and file systems",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Data Structures & Algorithms",
    icon: "📊",
    description: "Efficient data organization and computational methods",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Database Systems",
    icon: "🗃️",
    description: "Relational models, SQL, and transaction management",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Computer Networks",
    icon: "🌐",
    description: "Network protocols and architecture (OSI/TCP-IP models)",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Software Engineering",
    icon: "🛠️",
    description: "SDLC models, requirements analysis, and testing",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Artificial Intelligence",
    icon: "🧠",
    description: "Machine learning algorithms and neural networks",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Embedded Systems",
    icon: "🔌",
    description: "Real-time systems and hardware-software integration",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
];

export default function EngineeringLicensePage() {
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <PuffLoader color="#3b82f6" size={80} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Computer Engineering License Exam Preparation | Srijan Pokhrel</title>
        <meta name="description" content="Prepare for Computer Engineering License Exam with 15 specialized modules, adaptive practice tests, and real-time performance tracking. Trusted by top engineering firms." />
        <meta name="keywords" content="Computer Engineering License Exam, NEC License, Engineering Preparation, Computer Engineering Syllabus, Practice Tests, License Exam Nepal" />
        <meta name="author" content="Srijan Pokhrel" />
        <meta property="og:title" content="Computer Engineering License Exam Preparation" />
        <meta property="og:description" content="Comprehensive preparation tools for Computer Engineering License Exam with structured modules and practice tests." />
        <meta property="og:image" content="https://srijanpokhrel.com.np/images/engineering-license.jpg" />
        <meta property="og:url" content="https://srijanpokhrel.com.np/engineering-license" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Computer Engineering License Exam Preparation" />
        <meta name="twitter:description" content="Prepare for Computer Engineering License Exam with expert modules and practice tests." />
        <meta name="twitter:image" content="https://srijanpokhrel.com.np/images/engineering-license.jpg" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://srijanpokhrel.com.np/engineering-license" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Computer Engineering License Exam Preparation",
              "description": "Prepare for Computer Engineering License Exam with 15 specialized modules, adaptive practice tests, and real-time performance tracking.",
              "url": "https://srijanpokhrel.com.np/engineering-license",
              "publisher": {
                "@type": "Person",
                "name": "Srijan Pokhrel"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl text-gray-900 mb-6"
            >
              Computer Engineering License Exam Preparation
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto"
            >
              Trusted by 85% of top engineering firms for licensure preparation. Access 15 specialized modules with adaptive practice tests and real-time performance tracking.
            </motion.p>

           
          </div>
        </div>

        {/* Subject Categories */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl text-black text-center mb-12">
            Choose Your Study Module
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engineeringSubjects.map((subject) => (
              <motion.div
                key={subject.name}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`${subject.color} p-6 cursor-pointer transition-all `}
                onClick={() => setSelectedTopic(subject.name)}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {subject.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {subject.description}
                </p>
                <button className="bg-white hover:bg-blue-100 border border-blue-700 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Start Practice
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {selectedTopic && (
          <LicenseQuizModal
            topic={selectedTopic}
            onClose={() => setSelectedTopic(null)}
          />
        )}

        {/* Additional Resources */}
        {/* <div className="bg-gray-50 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Enhanced Preparation Tools
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BookOpenIcon className="w-12 h-12 text-blue-600" />,
                  title: "NEC Computer Syllabus",
                  text: "Comprehensive coverage of topics with structured modules",
                  buttonText: "View Syllabus →",
                  href: "/nec-license-exam-computer-engineering-syllabus.pdf"
                },
                {
                  icon: <DocumentTextIcon className="w-12 h-12 text-blue-600" />,
                  title: "Reference Notes",
                  text: "Well-curated notes with key concepts and explanations",
                  buttonText: "Read Notes →",
                  href: "/reference-notes"
                },
                {
                  icon: <ClipboardListIcon className="w-12 h-12 text-blue-600" />,
                  title: "Past Questions",
                  text: "Practice with real exam questions and solutions",
                  buttonText: "Practice Now →",
                  href: "#"
                }
              ].map((resource, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-md border-2 border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">{resource.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{resource.text}</p>
                  <Link
                    href={resource.href}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    {resource.buttonText}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}