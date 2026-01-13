"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "katex/dist/katex.min.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const toolbarOptions = [
  [{ header: "1" }, { header: "2" }, { font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  [{ align: [] }],
  ["link", "blockquote", "code-block"],
  [{ script: "sub" }, { script: "super" }],
  [{ color: [] }, { background: [] }],
  ["clean"],
];

const Modal = ({ isOpen, closeModal, quiz, updateQuiz }) => {
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchQuestionTypes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/question-types`);
        const data = await response.json();
        setTypes(data.map((type) => type.name));
      } catch (error) {
        console.error("Error fetching question types:", error);
      } finally {
        setLoadingTypes(false);
      }
    };

    fetchQuestionTypes();
  }, []);

  useEffect(() => {
    if (quiz) {
      setFormData({
        questionType: quiz.questionType,
        questionText: quiz.questionText,
        options: quiz.options.map((option) => option.text),
        correctAnswers: quiz.correctAnswers || [],
        explanation: quiz.explanation,
        difficulty: quiz.difficulty,
      });
    }
  }, [quiz]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const toggleCorrectAnswer = (index) => {
    const selectedOption = formData.options[index];
    const updatedAnswers = formData.correctAnswers.includes(selectedOption)
      ? formData.correctAnswers.filter((ans) => ans !== selectedOption)
      : [...formData.correctAnswers, selectedOption];
    
    setFormData({ ...formData, correctAnswers: updatedAnswers });
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ""] });
  };

  const removeOption = (index) => {
    const updatedOptions = formData.options.filter((_, i) => i !== index);
    const updatedAnswers = formData.correctAnswers.filter(
      (ans) => ans !== formData.options[index]
    );
    
    setFormData({
      ...formData,
      options: updatedOptions,
      correctAnswers: updatedAnswers,
    });
  };

  const handleEditorChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleSave = () => {
    if (formData.difficulty < 1 || formData.difficulty > 5) {
      setDifficultyError("Difficulty must be between 1 and 5.");
      return;
    }

    const updatedData = {
      ...formData,
      options: formData.options.map((text) => ({ text })),
      difficulty: Number(formData.difficulty),
    };

    updateQuiz(quiz._id, updatedData);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-lg overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-600">Edit Quiz Question</h2>

        <form className="space-y-6">
          {/* Difficulty Level */}
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

          {/* Question Type */}
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
                types.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Question Text Editor */}
          <div>
            <label className="block mb-2 text-lg">Question Text</label>
            <div className="resize-y overflow-auto" style={{ minHeight: "150px" }}>
              {isClient && (
                <ReactQuill
                  value={formData.questionText}
                  onChange={(value) => handleEditorChange("questionText", value)}
                  modules={{ toolbar: toolbarOptions }}
                  className="bg-white rounded-lg"
                  theme="snow"
                />
              )}
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block mb-2 text-lg">Options</label>
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                  placeholder={`Option ${index + 1}`}
                />
                <input
                  type="checkbox"
                  checked={formData.correctAnswers.includes(option)}
                  onChange={() => toggleCorrectAnswer(index)}
                  className="w-5 h-5"
                />
                {formData.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✖
                  </button>
                )}
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

          {/* Explanation Editor */}
          <div>
            <label className="block mb-2 text-lg">Explanation</label>
            <div className="resize-y overflow-auto" style={{ minHeight: "150px" }}>
              {isClient && (
                <ReactQuill
                  value={formData.explanation}
                  onChange={(value) => handleEditorChange("explanation", value)}
                  modules={{ toolbar: toolbarOptions }}
                  className="bg-white rounded-lg"
                  theme="snow"
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              disabled={difficultyError}
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Modal;