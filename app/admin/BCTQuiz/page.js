"use client";

import { useState, useEffect } from "react";
import AdminBCTQuizModal from "../../components/AdminBCTQuizModal";
import Link from "next/link";
import BCTQuestionTypeModal from "../../components/BCTQuestionTypeModal";

export default function AdminPage() {
  const [showModal, setShowModal] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [quizCounts, setQuizCounts] = useState({
    total: 0,
    byType: {},
    byTypeAndDifficulty: {},
  });

  useEffect(() => {
    const quizForEditing = JSON.parse(localStorage.getItem("quizForEditing"));
    if (quizForEditing) {
      setQuizData(quizForEditing);
      localStorage.removeItem("quizForEditing");
      setShowModal(true);
    }

    fetchQuizCounts();
  }, []);

  const fetchQuizCounts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/count`);
      if (!response.ok) {
        throw new Error("Failed to fetch quiz counts");
      }
      const data = await response.json();
      console.log("Fetched Quiz Counts:", data);
      setQuizCounts(data);
    } catch (error) {
      console.error("Error fetching quiz counts:", error);
    }
  };

  useEffect(() => {
    console.log("Updated Quiz Counts State:", quizCounts);
  }, [quizCounts]);

  
  const handleSubmit = async (quizData) => {
    try {
      // First, fetch the question type ID
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bct-question-types`);
      const types = await response.json();
      
      const selectedType = types.find(type => type.name === quizData.questionType);
      
      if (!selectedType) {
        throw new Error('Question type not found');
      }
  
      const transformedData = {
        ...quizData,
        questionType: selectedType._id, // Use the ObjectId instead of the name
        subTopic: quizData.subTopic,
        options: quizData.options.filter(option => option.trim() !== '').map(option => ({ text: option })),
        correctAnswers: quizData.correctAnswers.filter(answer => answer.trim() !== '')
      };
  
      const url = `${process.env.NEXT_PUBLIC_API_URL}/bct-quizzes${quizData.id ? `/${quizData.id}` : ''}`;
      
      const response2 = await fetch(url, {
        method: quizData.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transformedData),
      });
  
      if (!response2.ok) {
        const errorData = await response2.json();
        throw new Error(errorData.message || "Failed to create/edit quiz");
      }
  
      const result = await response2.json();
      console.log("Quiz created/edited:", result);
      setShowModal(false);
      fetchQuizCounts();
    } catch (error) {
      console.error("Error creating/editing quiz:", error);
      // Optionally show error to user via toast/alert
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-700">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Add New Question
        </button>
        <Link href="/admin/BCTQuiz/ViewAllQuizzes">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
            View All Quizzes
          </button>
        </Link>
        <button
          onClick={() => setShowTypeModal(true)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Manage Question Types
        </button>
      </div>

      {/* Quiz Counts Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quiz Counts</h2>

        {/* Total Quizzes */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Quizzes</h3>
          <p className="text-3xl font-bold text-purple-600">{quizCounts.total}</p>
        </div>

        {/* By Question Type */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">By Question Type</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(quizCounts.byType).map(([type, count]) => (
              <li
                key={type}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-lg font-medium text-gray-700">{type}</span>
                <span className="block text-2xl font-bold text-purple-600">{count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* By Question Type and Difficulty */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            By Question Type and Difficulty
          </h3>
          {Object.entries(quizCounts.byTypeAndDifficulty).length === 0 ? (
            <p className="text-gray-500">No data available for By Question Type and Difficulty</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(quizCounts.byTypeAndDifficulty).map(([key, count]) => (
                <li
                  key={key}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-lg font-medium text-gray-700">
                    {key.replace("_", " + Difficulty ")}
                  </span>
                  <span className="block text-2xl font-bold text-purple-600">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <AdminBCTQuizModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          quizData={quizData}
        />
      )}
      {showTypeModal && (
        <BCTQuestionTypeModal onClose={() => setShowTypeModal(false)} />
      )}
    </div>
  );
}