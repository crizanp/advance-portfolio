"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import PuffLoader from "react-spinners/PuffLoader";
import { QuizModal } from "../components/QuizModal";
import { BookOpenIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const greTopics = [
  
  {
    name: "Verbal Basic",
    icon: "📖",
    description: "Build foundational vocabulary & reading skills",
    link: "/verbal-basic",
    color: "bg-blue-100"
  },
  {
    name: "Verbal Advanced",
    icon: "📚",
    description: "Tackle complex texts & advanced vocabulary",
    link: "/verbal-advanced",
    color: "bg-pink-100"
  },
  {
    name: "Quantitative",
    icon: "🧮",
    description: "Master algebra, geometry, and data analysis",
    link: "/math",
    color: "bg-purple-100"
  }
];

const examStructure = [
  { section: "Verbal Reasoning", questions: 40, time: "60 min" },
  { section: "Quantitative", questions: 40, time: "70 min" },
  { section: "Analytical Writing", tasks: 2, time: "60 min" }
];

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <PuffLoader color="purple" size={150} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>GRE Master - Your Complete Preparation Hub</title>
        <meta name="description" content="Comprehensive GRE preparation resources with practice tests, study guides, and progress tracking" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-white to-purple-50">

        <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-blue-50 text-gray-800">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
  >
    Conquer the GRE <br />
    <span className="text-purple-600">Smart Preparation System</span>
  </motion.h1>
  <p className="text-xs sm:text-sm md:text-base text-gray-700 max-w-2xl mx-auto mb-8">
    Join over 250,000 students who boosted their GRE scores with our advanced platform. Challenge yourself with timed exercises and get instant feedback to track your progress across all sections.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-12">
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">325+ Average Score</h3>
      <p className="text-sm sm:text-base text-gray-600">Top 5% of test takers</p>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">10,000+ Questions</h3>
      <p className="text-sm sm:text-base text-gray-600">With detailed explanations</p>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">Adaptive Learning</h3>
      <p className="text-sm sm:text-base text-gray-600">Personalized difficulty adjustment</p>
    </div>
  </div>
</div>

        </section>


        {/* Study Categories */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {greTopics.map((topic) => (
                <motion.div
                  key={topic.name}
                  whileHover={{ scale: 1.05 }}
                  className={`${topic.color} p-8 rounded-2xl shadow-lg transition-all cursor-pointer`}
                  onClick={() => setSelectedTopic(topic.name)}
                >
                  <div className="text-4xl mb-4">{topic.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.name}</h3>
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  <div className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-2">
                    Take Test
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </motion.div>
              ))}{selectedTopic && (
                <QuizModal
                  topic={selectedTopic}
                  onClose={() => setSelectedTopic(null)}
                />
              )}
            </div>
          </div>
        </section>


        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
              GRE Exam Structure
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {examStructure.map((section, idx) => (
                <div key={idx} className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">
                    {section.section}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Questions</span>
                      <span className="font-semibold text-gray-600">{section.questions || section.tasks}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Time</span>
                      <span className="font-semibold text-gray-600">{section.time}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-purple-600">
                    {section.section === 'Analytical Writing' ? (
                      'Evaluate arguments and articulate complex ideas'
                    ) : (
                      'Multiple-choice questions with adaptive difficulty'
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}