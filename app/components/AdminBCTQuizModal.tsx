"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "katex/dist/katex.min.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import katex from "katex";

// Properly declare katex on window
declare global {
  interface Window {
    katex: typeof katex;
  }
}

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

type QuestionType = {
  name: string;
  subTopics: { name: string }[];
};

type QuizData = {
  questionType: string;
  subTopic: string;
  questionText: string;
  options: string[];
  correctAnswers: string[];
  explanation: string;
};

type AdminBCTQuizModalProps = {
  onClose: () => void;
  onSubmit: (data: QuizData) => void;
  quizData?: QuizData;
};

export default function AdminBCTQuizModal({ onClose, onSubmit, quizData }: AdminBCTQuizModalProps) {
  const [formData, setFormData] = useState<QuizData>({
    questionType: "",
    subTopic: "",
    questionText: "",
    options: ["", ""],
    correctAnswers: [],
    explanation: "",
  });

  const [types, setTypes] = useState<QuestionType[]>([]);
  const [subtopics, setSubtopics] = useState<string[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  useEffect(() => {
    const fetchQuestionTypes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bct-question-types`);
        const data = await response.json();
        setTypes(data);
        if (data.length > 0) {
          const firstType = data[0];
          setFormData((prev) => ({
            ...prev,
            questionType: firstType.name,
            subtopic: firstType.subTopics[0]?.name || "",
          }));
          setSubtopics(firstType.subTopics.map((st) => st.name));
        }
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

  useEffect(() => {
    const selectedType = types.find((type) => type.name === formData.questionType);
    if (selectedType) {
      setSubtopics(selectedType.subTopics.map((st) => st.name));
      if (!selectedType.subTopics.some((st) => st.name === formData.subTopic)) {
        setFormData((prev) => ({
          ...prev,
          subtopic: selectedType.subTopics[0]?.name || "",
        }));
      }
    }
  }, [formData.questionType, types]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.questionType || !formData.subTopic || !formData.questionText) {
      alert("Please fill in all required fields");
      return;
    }
  
    // Validate options
    if (formData.options.filter(opt => opt.trim() !== '').length < 2) {
      alert("Please provide at least 2 valid options");
      return;
    }
  
    // Validate correct answers
    if (formData.correctAnswers.length === 0) {
      alert("Please select at least one correct answer");
      return;
    }
  
    onSubmit(formData);
    onClose();
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const toggleCorrectAnswer = (index: number) => {
    const selectedOption = formData.options[index];
    const updatedCorrectAnswers = formData.correctAnswers.includes(selectedOption)
      ? formData.correctAnswers.filter((ans) => ans !== selectedOption)
      : [...formData.correctAnswers, selectedOption];
    setFormData({ ...formData, correctAnswers: updatedCorrectAnswers });
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ""] });
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
                  <option key={index} value={type.name}>
                    {type.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-lg">Subtopic</label>
            <select
              value={formData.subTopic}
              onChange={(e) => setFormData({ ...formData, subTopic: e.target.value })}
              className="w-full p-3 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
            >
              {subtopics.map((subtopic, index) => (
                <option key={index} value={subtopic}>
                  {subtopic}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-lg">Question Text</label>
            <ReactQuill
              value={formData.questionText}
              onChange={(value) => setFormData({ ...formData, questionText: value })}
              className="bg-white rounded-lg"
              modules={{ toolbar: toolbarOptions }}
            />
          </div>

          <div className="my-9">
            <label className="block mb-2 text-lg">Options</label>
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
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

          <div>
            <label className="block mb-2 text-lg">Explanation</label>
            <ReactQuill
              value={formData.explanation}
              onChange={(value) => setFormData({ ...formData, explanation: value })}
              className="bg-white rounded-lg"
              modules={{ toolbar: toolbarOptions }}
            />
          </div>

          <div className="flex justify-end gap-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Save Question
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}