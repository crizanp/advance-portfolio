"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "katex/dist/katex.min.css"; 
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import katex from "katex";
if (typeof window !== "undefined") {
  window.katex = katex;
}
const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ script: "sub" }, { script: "super" }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ align: [] }],
  [{ color: [] }, { background: [] }],
  ["blockquote", "code-block"],
  ["formula"],
  ["clean"],
];
export default function QuizModal({ onClose, onSubmit, quizData }) {
  const [formData, setFormData] = useState({
    questionType: "",
    questionText: "",
    options: ["", ""],
    correctAnswers: [],
    explanation: "",
    difficulty: 3,
  });
  const [types, setTypes] = useState([]); 
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [difficultyError, setDifficultyError] = useState("");
  useEffect(() => {
    const fetchQuestionTypes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/question-types`);
        const data = await response.json();
        const formattedTypes = data.map((type) => type.name);
        setTypes(formattedTypes);
        setFormData((prev) => ({ ...prev, questionType: formattedTypes[0] || "" }));
      } catch (error) {
        console.error("Error fetching question types:", error);
      } finally {
        setLoadingTypes(false);
      }
    };
    fetchQuestionTypes();
  }, []);
  useEffect(() => {
    if (quizData) {
      setFormData(quizData);
    }
  }, [quizData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.difficulty < 1 || formData.difficulty > 5) {
      setDifficultyError("Difficulty must be between 1 and 5.");
      return;
    }
    onSubmit(formData);
    onClose();
  };
  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };
  const toggleCorrectAnswer = (index) => {
    const selectedOption = formData.options[index];
    const updatedCorrectAnswers = formData.correctAnswers.includes(selectedOption)
      ? formData.correctAnswers.filter((ans) => ans !== selectedOption)
      : [...formData.correctAnswers, selectedOption];
    setFormData({ ...formData, correctAnswers: updatedCorrectAnswers });
  };
  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ""] });
  };
  const handleDifficultyChange = (e) => {
    const value = Number(e.target.value);
    if (value < 1 || value > 5) {
      setDifficultyError("Difficulty must be between 1 and 5.");
    } else {
      setDifficultyError("");
    }
    setFormData({ ...formData, difficulty: value });
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-6 w-full max-w-3xl overflow-auto shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-600">
          {quizData ? "Edit Quiz Question" : "Add New Quiz Question"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto">
          {}
          <div>
            <label className="block mb-2 text-lg">Question Type</label>
            <select
              value={formData.questionType}
              onChange={(e) => setFormData({ ...formData, questionType: e.target.value })}
              className="w-full p-3 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
              disabled={loadingTypes}
            >
              {loadingTypes ? (
                <option>Loading...</option>
              ) : (
                types.map((type, index) => <option key={index} value={type}>{type}</option>)
              )}
            </select>
          </div>
          {}
          <div>
            <label className="block mb-2 text-lg">Question Text</label>
            <ReactQuill
              value={formData.questionText}
              onChange={(value) => setFormData({ ...formData, questionText: value })}
              className="bg-white rounded-lg"
              modules={{ toolbar: toolbarOptions }}
              required
            />
          </div>
          {}
          <div className="my-9">
            <label className="block mb-2 text-lg">Options</label>
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                  required
                />
                <input
                  type="checkbox"
                  checked={formData.correctAnswers.includes(option)} 
                  onChange={() => toggleCorrectAnswer(index)}
                  className="w-5 h-5"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Option
            </button>
          </div>
          {}
          <div>
            <label className="block mb-2 text-lg">Explanation</label>
            <ReactQuill
              value={formData.explanation}
              onChange={(value) => setFormData({ ...formData, explanation: value })}
              className="bg-white rounded-lg"
              modules={{ toolbar: toolbarOptions }}
              required
            />
          </div>
          {}
          <div>
            <label className="block mb-2 text-lg">Difficulty (1-5)</label>
            <input
              type="number"
              value={formData.difficulty}
              onChange={handleDifficultyChange}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
              min="1"
              max="5"
              required
            />
            {difficultyError && <p className="text-red-500 text-sm mt-1">{difficultyError}</p>}
          </div>
          {}
          <div className="flex justify-end gap-6">
            <button type="button" onClick={onClose} className="px-6 py-3 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors" disabled={difficultyError}>
              Save Question
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}