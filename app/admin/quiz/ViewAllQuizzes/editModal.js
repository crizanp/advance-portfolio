"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import 'katex/dist/katex.min.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { Quill } from 'react-quill';
import katex from 'katex';

// Enable LaTeX support
window.katex = katex;

// Define Quill toolbar options
const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ script: 'sub' }, { script: 'super' }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ align: [] }],
  [{ color: [] }, { background: [] }],
  ['blockquote', 'code-block'],
  ['formula'],
  ['clean'],
];

const Modal = ({ isOpen, closeModal, quiz, updateQuiz }) => {
  const [formData, setFormData] = useState({
    questionType: '',
    questionText: '',
    options: ['', ''],
    correctAnswer: '',
    explanation: '',
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
    if (quiz) {
      setFormData({
        questionType: quiz.questionType,
        questionText: quiz.questionText,
        options: quiz.options.map((option) => option.text),
        correctAnswer: quiz.correctAnswer,
        explanation: quiz.explanation,
        difficulty: quiz.difficulty,
      });
    }
  }, [quiz]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('option')) {
      const index = name.split('-')[1];
      const updatedOptions = [...formData.options];
      updatedOptions[index] = value;
      setFormData({ ...formData, options: updatedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditorChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addOption = () => {
    setFormData(prev => ({ ...prev, options: [...prev.options, ''] }));
  };

  const removeOption = (index) => {
    const updatedOptions = formData.options.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, options: updatedOptions }));
  };

  const handleSave = () => {
    if (formData.difficulty < 1 || formData.difficulty > 5) {
      setDifficultyError('Difficulty must be between 1 and 5.');
      return;
    }
    
    const updatedData = {
      ...formData,
      options: formData.options.map(text => ({ text })),
      difficulty: Number(formData.difficulty)
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
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">Edit Quiz Question</h2>
        
        <form className="space-y-6">
          {/* Difficulty Level */}
          <div>
            <label className="block mb-2 text-lg">Difficulty (1-5)</label>
            <input
              type="number"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
              name="questionType"
              value={formData.questionType}
              onChange={handleChange}
              className="w-full p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              disabled={loadingTypes}
            >
              {loadingTypes ? (
                <option>Loading...</option>
              ) : (
                types.map((type, index) => <option key={index} value={type}>{type}</option>)
              )}
            </select>
          </div>


          {/* Question Text Editor */}
          <div>
            <label className="block mb-2 text-lg">Question Text</label>
            <div className="resize-y overflow-auto" style={{ minHeight: '150px' }}>
              <ReactQuill
                value={formData.questionText}
                onChange={(value) => handleEditorChange('questionText', value)}
                modules={{ toolbar: toolbarOptions }}
                className="bg-white rounded-lg"
                theme="snow"
              />
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block mb-2 text-lg">Options</label>
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  name={`option-${index}`}
                  value={option}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder={`Option ${index + 1}`}
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

          {/* Correct Answer */}
          <div>
            <label className="block mb-2 text-lg">Correct Answer</label>
            <input
              type="text"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>

          {/* Explanation Editor */}
          <div>
            <label className="block mb-2 text-lg">Explanation</label>
            <div className="resize-y overflow-auto" style={{ minHeight: '150px' }}>
              <ReactQuill
                value={formData.explanation}
                onChange={(value) => handleEditorChange('explanation', value)}
                modules={{ toolbar: toolbarOptions }}
                className="bg-white rounded-lg"
                theme="snow"
              />
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
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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