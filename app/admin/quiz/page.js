"use client"

import { useState, useEffect } from 'react';
import QuizModal from '../../components/Quiz';
import Link from 'next/link'; // Import Link from Next.js
import QuestionTypeModal from '../../components/QuestionTypeModal';
import dynamic from 'next/dynamic';

export default function AdminPage() {
  const [showModal, setShowModal] = useState(false);
  const [quizData, setQuizData] = useState(null);  // Store the quiz data for editing
  const [showTypeModal, setShowTypeModal] = useState(false);

  useEffect(() => {
    // Check if there's quiz data passed for editing
    const quizForEditing = JSON.parse(localStorage.getItem('quizForEditing'));
    if (quizForEditing) {
      setQuizData(quizForEditing);
      localStorage.removeItem('quizForEditing');  // Clear the localStorage after fetching data
      setShowModal(true);
    }
  }, []);

  const handleSubmit = async (quizData) => {
    try {
      // Transform options array to match server schema
      const transformedData = {
        ...quizData,
        options: quizData.options.map(option => ({ text: option })),
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`, {
        method: quizData.id ? 'PUT' : 'POST', // Use PUT if editing, POST if creating
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create/edit quiz');
      }

      // Handle successful creation or editing
      const result = await response.json();
      console.log('Quiz created/edited:', result);
      setShowModal(false);  // Close modal after submission
    } catch (error) {
      console.error('Error creating/editing quiz:', error.message);
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="bg-purple-600 text-white px-4 py-2 rounded">
        Add New Question
      </button>
      
      {/* Link to the ViewAllQuizzes page */}
      <Link href="/admin/quiz/ViewAllQuizzes" legacyBehavior>
        <button className="bg-purple-600 text-white px-4 mx-4 py-2 rounded">
          View All Quizzes
        </button>
      </Link>
      <button
          onClick={() => setShowTypeModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Manage Question Types
        </button>
      {showModal && (
        <QuizModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          quizData={quizData} // Pass quiz data to the modal for editing
        />
      )}
      {showTypeModal && (
        <QuestionTypeModal onClose={() => setShowTypeModal(false)} />
      )}
    </div>
  );
}
