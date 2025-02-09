"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "./editModal"; // Import the Modal component

export default function ViewAllQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("none"); // State for sorting
  const router = useRouter();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`);
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Handle sorting logic
  const sortedQuizzes = () => {
    let sorted = [...quizzes];

    if (sortBy === "type") {
      sorted.sort((a, b) => a.questionType.localeCompare(b.questionType));
    } else if (sortBy === "type+difficulty") {
      sorted.sort((a, b) => {
        if (a.questionType === b.questionType) {
          return a.difficulty - b.difficulty;
        }
        return a.questionType.localeCompare(b.questionType);
      });
    }

    return sorted;
  };

  const handleEdit = (quiz) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true); // Open modal for editing
  };

  const handleDelete = async (quizId) => {
    const confirmed = window.confirm("Are you sure you want to delete this quiz?");
    if (confirmed) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete quiz");
        }

        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
        alert("Quiz deleted successfully");
      } catch (error) {
        console.error("Error deleting quiz:", error.message);
      }
    }
  };

  const updateQuiz = async (quizId, updatedData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update quiz");
      }

      const updatedQuizzes = quizzes.map((quiz) =>
        quiz._id === quizId ? { ...quiz, ...updatedData } : quiz
      );
      setQuizzes(updatedQuizzes);
      alert("Quiz updated successfully");
    } catch (error) {
      console.error("Error updating quiz:", error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">All Quizzes</h1>

      {/* Sorting Controls */}
      <div className="mb-6 flex space-x-4">
        <label className="flex items-center space-x-2">
          <span className="text-gray-700">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="none">None</option>
            <option value="type">Question Type</option>
            <option value="type+difficulty">Question Type + Difficulty</option>
          </select>
        </label>
      </div>

      {/* Quiz List */}
      <ul className="space-y-4">
        {sortedQuizzes().map((quiz) => (
          <li key={quiz._id} className="p-4 border-b-2 flex justify-between items-center">
            <div>
              <p className="font-semibold">{quiz.questionText}</p>
              <p className="text-sm text-gray-600">
                Type: {quiz.questionType} -- Difficulty: {quiz.difficulty}
              </p>
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
      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        quiz={selectedQuiz}
        updateQuiz={updateQuiz}
      />
    </div>
  );
}