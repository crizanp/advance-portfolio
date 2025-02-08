import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

type Question = {
    _id: string;
    questionText: string;
    options: { text: string }[];
    correctAnswer: string;
    explanation: string;
    difficulty: number;
};

type QuizModalProps = {
    topic: string;
    onClose: () => void;
};

export function QuizModal({ topic, onClose }: QuizModalProps) {
    const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showWarning, setShowWarning] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [expandedExplanations, setExpandedExplanations] = useState<Set<number>>(new Set());
    const toggleExplanation = (index: number) => {
        const newSet = new Set(expandedExplanations);
        newSet.has(index) ? newSet.delete(index) : newSet.add(index);
        setExpandedExplanations(newSet);
      };
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (selectedDifficulty !== null && questions.length > 0 && !showResults) {
            // Set initial time based on difficulty
            const initialTime = selectedDifficulty <= 3 ? 600 : 900; // 10 or 15 minutes in seconds
            setTimeLeft(initialTime);

            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setShowResults(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [selectedDifficulty, questions, showResults]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/type?questionType=${topic}&difficulty=${selectedDifficulty}`
                );
                const data = await response.json();
                setQuestions(data.slice(0, 10));
            } catch (error) {
                console.error("Error fetching questions:", error);
            } finally {
                setLoading(false);
            }
        };

        if (topic && selectedDifficulty !== null) {
            fetchQuestions();
        }
    }, [topic, selectedDifficulty]);

    const handleAnswerSelect = (answer: string) => {
        if (!showResults) {
            setSelectedAnswer(answer); // Allow changing the selected answer
        }
    };

    const handleClose = () => {
        if (!showResults && currentQuestion < questions.length) {
            setShowWarning(true); // Show warning if the quiz is ongoing
        } else {
            onClose(); // Close the modal if quiz is complete
        }
    };

    const handleSkipQuestion = () => {
        setSelectedAnswer(null); // Reset any selected answer
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1); // Skip to next question
        } else {
            setShowResults(true); // If it's the last question, show the results
        }
    };

    const handleNextQuestion = () => {
        if (selectedAnswer !== null) {
            if (selectedAnswer === questions[currentQuestion].correctAnswer) {
                setScore(score + 1); // Increment score if correct
            }
        }
        setSelectedAnswer(null); // Reset selected answer for next question
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1); // Move to the next question
        } else {
            setShowResults(true); // If it's the last question, show the results
        }
    };

    const cleanHtml = (html: string) => html.replace(/<\/?p>/g, ""); // Removes <p> tags

    if (!selectedDifficulty) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                    <h3 className="text-2xl font-bold text-purple-900 mb-6">Select Difficulty</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((level) => (
                            <button
                                key={level}
                                onClick={() => setSelectedDifficulty(level)}
                                className="w-full bg-purple-100 hover:bg-purple-200 text-purple-900 p-3 rounded-lg transition-colors flex items-center gap-3"
                            >
                                <span className="text-lg">
                                    {["🌱", "📘", "📚", "🔥", "⚡"][level - 1]}
                                </span>
                                <div className="text-left">
                                    <p className="font-semibold">Level {level}</p>
                                    <p className="text-sm opacity-75">
                                        {["Basic", "Easy", "Intermediate", "Hard", "Advanced"][level - 1]}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-purple-900">{topic} Quiz</h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-600">
                        Time Remaining: <span className="font-semibold">{formatTime(timeLeft)}</span>
                    </div>
                </div>
                {showWarning && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
                            <h3 className="text-lg font-semibold text-purple-600 mb-3">
                                Changes will not be saved. Proceed anyway?
                            </h3>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => setShowWarning(false)}
                                    className="bg-gray-200 mx-4 text-gray-700 p-2 rounded-md hover:bg-gray-300 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        setShowWarning(false);
                                        onClose();
                                    }}
                                    className="bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 text-sm"
                                >
                                    Proceed Anyway
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900 mx-auto"></div>
                    </div>
                ) : showResults ? (
                    <div className="space-y-6">
                        <div className="bg-purple-100 p-6 rounded-xl text-center">
                            <h4 className="text-xl font-bold text-purple-900 mb-2">
                                {timeLeft === 0 ? "Time's Up! " : ""}Quiz Complete!
                            </h4>
                            <p className="text-3xl font-bold text-purple-900">
                                Score: {score}/{questions.length}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {questions.map((question, index) => (
                                <div key={question._id} className="border-b pb-6">
                                    <p className="font-medium mb-4 text-gray-800">
                                        <span className="font-semibold">{index + 1}.</span>
                                        <span dangerouslySetInnerHTML={{ __html: cleanHtml(question.questionText) }}></span>
                                    </p>
                                    <div className="grid gap-2">
                                        {question.options.map((option) => (
                                            <div
                                                key={option.text}
                                                className={`p-3 rounded-lg ${option.text === question.correctAnswer
                                                    ? "bg-green-100 text-gray-700 border border-green-500"
                                                    : option.text === selectedAnswer
                                                        ? "bg-red-100 text-gray-700 border border-red-500"
                                                        : "bg-gray-50 text-gray-700 border border-gray-300"
                                                    }`}
                                            >
                                                {option.text}
                                                {option.text === question.correctAnswer && (
                                                    <span className="text-green-600 ml-2">✓ Correct</span>
                                                )}
                                                {option.text === selectedAnswer &&
                                                    option.text !== question.correctAnswer && (
                                                        <span className="text-red-600 ml-2">✗ Your Answer</span>
                                                    )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-6 px-1 ">
  <button
    onClick={() => toggleExplanation(index)}
    className="flex items-center gap-1 bg-gray-600  hover:bg-gray-500 px-3 py-1 rounded-lg transition-colors"
  >
    <span className="text-white font-bold">Explanation</span>
    <motion.span
      animate={{ rotate: expandedExplanations.has(index) ? 180 : 0 }}
      className="inline-block"
    >
      ▼
    </motion.span>
  </button>
  <AnimatePresence>
    {expandedExplanations.has(index) && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="text-gray-600 pl-2 pt-3"
        dangerouslySetInnerHTML={{ __html: cleanHtml(question.explanation) }}
      />
    )}
  </AnimatePresence>
</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : questions.length > 0 ? (
                    <>
                        <div className="mb-6">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Question {currentQuestion + 1} of {questions.length}</span>
                                <span>Difficulty: {selectedDifficulty}</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full">
                                <motion.div
                                    className="h-2 bg-purple-600 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${((currentQuestion + 1) / questions.length) * 100}%`
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.2 }}
                            >
                                <p className="text-lg font-medium mb-6 text-gray-800">
                                    {/* <span className="font-semibold">{currentQuestion + 1}. </span> */}
                                    <span className="inline" dangerouslySetInnerHTML={{ __html: cleanHtml(questions[currentQuestion].questionText) }}></span>
                                </p>
                                <div className="grid gap-3">
                                    {questions[currentQuestion].options.map((option) => {
                                        const isSelected = selectedAnswer === option.text;
                                        const isCorrect = option.text === questions[currentQuestion].correctAnswer;

                                        return (
                                            <button
                                                key={option.text}
                                                onClick={() => handleAnswerSelect(option.text)}
                                                className={`p-3 text-left rounded-lg transition-all ${isSelected
                                                    ? "bg-purple-600 text-white"
                                                    : "bg-gray-500 hover:bg-gray-400"
                                                    }`}
                                            >
                                                {option.text}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-6 flex space-x-4">
                            <button
                                onClick={handleNextQuestion}
                                disabled={selectedAnswer === null}
                                className="w-full sm:w-auto bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 transition-colors"
                            >
                                {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                            </button>

                            {!showResults && (
                                <button
                                    onClick={handleSkipQuestion}
                                    className="w-full sm:w-auto bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors"
                                >
                                    Skip Question
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8 text-gray-600">
                        No questions available for this difficulty level
                    </div>
                )}
            </div>
        </div>
    );
}