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
    subTopic: ""  // Changed from number to string to match the backend model
  });

  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [subtopics, setSubtopics] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState(true); // Add this state for loading types
  const [subTopicError, setSubTopicError] = useState(""); // Define the error state

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchQuestionTypes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bct-question-types`);
        const data = await response.json();
        setTypes(data);
  
        if (data.length > 0) {
          const firstType = data[0];
          const firstSubTopic = firstType.subTopics[0]?.name || "";
          
          setSelectedType(firstType);
          setSubtopics(firstType.subTopics);
          setFormData(prev => ({
            ...prev,
            questionType: firstType.name,
            subTopic: firstSubTopic
          }));
        }
      } catch (error) {
        console.error("Error fetching question types:", error);
      } finally {
        setLoadingTypes(false);
      }
    };
  
    fetchQuestionTypes();
  }, []);
  const handleQuestionTypeChange = (typeName) => {
    const newSelectedType = types.find((type) => type.name === typeName);
    if (newSelectedType) {
      const firstSubTopic = newSelectedType.subTopics[0]?.name || "";
      
      setSelectedType(newSelectedType);
      setSubtopics(newSelectedType.subTopics);
      setFormData(prev => ({
        ...prev,
        questionType: typeName,
        subTopic: firstSubTopic
      }));
    }
  };
 // Update the quiz effect to properly set initial values
useEffect(() => {
  if (quiz && types.length > 0) {
    const quizQuestionTypeName = quiz.questionType?.name;
    const matchingType = types.find((type) => type.name === quizQuestionTypeName) || types[0];
    
    setSelectedType(matchingType);
    setSubtopics(matchingType.subTopics);
    
    // If there's no existing subTopic, use the first one from the matching type
    const subTopicToUse = quiz.subTopic || matchingType.subTopics[0]?.name || "";
    
    setFormData({
      questionType: quizQuestionTypeName || types[0]?.name,
      questionText: quiz.questionText,
      options: quiz.options.map((option) => option.text),
      correctAnswers: quiz.correctAnswers || [],
      explanation: quiz.explanation,
      subTopic: subTopicToUse
    });
  }
}, [quiz, types]);
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

  const handlesubTopicChange = (e) => {
    const value = Number(e.target.value);
    if (value < 1 || value > 5) {
      setsubTopicError("subTopic must be between 1 and 5.");
    } else {
      setsubTopicError("");
    }
    setFormData({ ...formData, subTopic: value });
  };

  const handleSave = () => {
    const selectedSubTopic = selectedType.subTopics.find(
      (sub) => sub.name === formData.subTopic
    );
  
    const updatedData = {
      ...formData,
      subTopic: formData.subTopic, // Send the actual name instead of a number
      options: formData.options.map((text) => ({ text })),
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
         {/* Question Type Select */}
<div>
  <label className="block mb-2 text-lg">Question Type</label>
  <select
    value={formData.questionType}
    onChange={(e) => handleQuestionTypeChange(e.target.value)}
    className="w-full p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
    disabled={loadingTypes}
  >
    {loadingTypes ? (
      <option>Loading...</option>
    ) : (
      types.map((type) => (
        <option key={type._id} value={type.name}>
          {type.name}
        </option>
      ))
    )}
  </select>
</div>

{/* Subtopic Select */}
<div>
  <label className="block mb-2 text-lg">Subtopic</label>
  <select
    value={formData.subTopic}
    onChange={(e) => setFormData(prev => ({ ...prev, subTopic: e.target.value }))}
    className="w-full p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
  >
    {subtopics.map((subtopic) => (
      <option key={subtopic._id} value={subtopic.name}>
        {subtopic.name}
      </option>
    ))}
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
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              disabled={subTopicError}
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