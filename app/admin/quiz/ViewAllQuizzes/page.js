"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './editModal'; // Import the Modal component

export default function ViewAllQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // State to check if on client-side
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Mark client-side rendering

    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`);
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isClient) {
      fetchQuizzes();
    }
  }, [isClient]); // Only run this effect on the client

  const handleEdit = (quiz) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const handleDelete = async (quizId) => {
    const confirmed = window.confirm('Are you sure you want to delete this quiz?');
    if (confirmed) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete quiz');
        }

        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
        alert('Quiz deleted successfully');
      } catch (error) {
        console.error('Error deleting quiz:', error.message);
      }
    }
  };

  const updateQuiz = async (quizId, updatedData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update quiz');
      }

      const updatedQuizzes = quizzes.map((quiz) =>
        quiz._id === quizId ? { ...quiz, ...updatedData } : quiz
      );
      setQuizzes(updatedQuizzes);
      alert('Quiz updated successfully');
    } catch (error) {
      console.error('Error updating quiz:', error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">All Quizzes</h1>
      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="p-4 border-b-2 flex justify-between items-center">
            <div>
              <p className="font-semibold">{quiz.questionText}</p>
              <p className="text-sm text-gray-600">Type: {quiz.questionType}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEdit(quiz)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(quiz._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal component */}
      {isClient && (
        <Modal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          quiz={selectedQuiz}
          updateQuiz={updateQuiz}
        />
      )}
    </div>
  );
}
