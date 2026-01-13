//frontend 
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

type Question = {
    _id: string;
    questionText: string;
    options: { text: string }[];
    correctAnswers: string[];
    explanation: string;
    subtopic: string;
};

type SubTopic = {
    name: string;
};

type QuizModalProps = {
    topic: string;
    onClose: () => void;
};

export function LicenseQuizModal({ topic, onClose }: QuizModalProps) {
    const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
    const [subtopics, setSubtopics] = useState<SubTopic[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showWarning, setShowWarning] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number>(600);
    const [expandedExplanations, setExpandedExplanations] = useState<Set<number>>(new Set());
    const [allSelections, setAllSelections] = useState<{ [key: string]: string[] }>({});
    const [subtopicsLoading, setSubtopicsLoading] = useState(true);

    const toggleExplanation = (index: number) => {
        const newSet = new Set(expandedExplanations);
        newSet.has(index) ? newSet.delete(index) : newSet.add(index);
        setExpandedExplanations(newSet);
    };

    useEffect(() => {
        const fetchSubtopics = async () => {
            setSubtopicsLoading(true);
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/bct-question-types/${topic}`
                );
                const data = await response.json();
                setSubtopics(data.subTopics || []);
            } catch (error) {
                console.error("Error fetching subtopics:", error);
            } finally {
                setSubtopicsLoading(false); // Set loading to false after fetch completes
            }
        };
        fetchSubtopics();
    }, [topic]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (selectedSubtopic !== null && questions.length > 0 && !showResults) {
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
    }, [selectedSubtopic, questions, showResults]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const isValidBase64Image = (str: string): boolean => {
        try {
            return str.startsWith('data:image') && str.includes('base64');
        } catch {
            return false;
        }
    };

    const processExplanationHtml = (html: string): string => {
        if (typeof html !== 'string') return '';
        let processed = html
            .replace(/&quot;/g, '"')
            .replace(/&#34;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/&#38;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&#60;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#62;/g, '>');

        processed = processed.replace(
            /<img[^>]*src=\\?"([^"\\]*)\\?"[^>]*>/gi,
            (match, src) => {
                const cleanSrc = src.replace(/\\/g, '');
                if (isValidBase64Image(cleanSrc)) {
                    return `<img src="${cleanSrc}" style="max-width: 100%; height: auto; margin: 10px 0;" />`;
                }
                return match;
            }
        );
        return processed;
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/bct-quizzes/type?questionType=${topic}&subTopic=${selectedSubtopic}`
                );
                const data = await response.json();
                const cleanedData = data.map((question: Question) => ({
                    ...question,
                    questionText: cleanHtml(question.questionText),
                    options: question.options.map(option => ({
                        text: cleanHtml(option.text)
                    })),
                    correctAnswers: question.correctAnswers.map(ca => cleanHtml(ca)),
                    explanation: processExplanationHtml(question.explanation)
                }));
                setQuestions(cleanedData.slice(0, 10));
            } catch (error) {
                console.error("Error fetching questions:", error);
            } finally {
                setLoading(false);
            }
        };

        if (topic && selectedSubtopic !== null) {
            fetchQuestions();
        }
    }, [topic, selectedSubtopic]);

    const handleAnswerSelect = (answer: string) => {
        if (!showResults && questions[currentQuestion]) {
            const isMultipleSelect = questions[currentQuestion].correctAnswers.length > 1;
            setSelectedAnswers(prev => {
                const newAnswers = isMultipleSelect
                    ? (prev.includes(answer)
                        ? prev.filter(a => a !== answer)
                        : [...prev, answer])
                    : (prev.includes(answer) ? [] : [answer]);
                return newAnswers;
            });
        }
    };

    const handleClose = () => {
        if (!showResults && currentQuestion < questions.length) {
            setShowWarning(true);
        } else {
            onClose();
        }
    };

    const handleSkipQuestion = () => {
        setSelectedAnswers([]);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleNextQuestion = () => {
        if (questions[currentQuestion]) {
            const currentQuestionData = questions[currentQuestion];
            const sortedCorrectAnswers = [...currentQuestionData.correctAnswers].sort();
            const sortedSelectedAnswers = [...selectedAnswers].sort();
            const isCorrect =
                sortedCorrectAnswers.length === sortedSelectedAnswers.length &&
                sortedCorrectAnswers.every((answer, index) =>
                    answer === sortedSelectedAnswers[index]
                );
            if (isCorrect) {
                setScore(score + 1);
            }
            setAllSelections(prev => ({
                ...prev,
                [currentQuestionData._id]: selectedAnswers
            }));
        }
        setSelectedAnswers([]);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const cleanHtml = (html: string) => {
        let processed = html.replace(/\*+([^*]+)\*+/g, '<strong>$1</strong>');
        processed = processed.replace(/<(?!\/?(br|strong|em|ul|ol|li|h[1-6]|code|pre|blockquote)\b)[^>]+>/gi, '');
        const txt = document.createElement("textarea");
        txt.innerHTML = processed;
        return txt.value;
    };

    if (!selectedSubtopic) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999]">
                <div className="bg-white rounded-lg p-6 mx-4 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-5 text-gray-500 hover:text-gray-700"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Select Subtopic</h3>
                    {subtopicsLoading ? (
                        <div className="text-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {subtopics.map((subtopic) => (
                                <button
                                    key={subtopic.name}
                                    onClick={() => setSelectedSubtopic(subtopic.name)}
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 p-2 rounded-md transition-colors text-sm sm:text-base"
                                >
                                    {subtopic.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-[999]">
            <div className="bg-white rounded-xl p-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal content */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg sm:text-xl font-bold mx-auto text-gray-900 truncate">
                        {topic}
                    </h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                </div>
                {showWarning && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-600 mb-3">
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
                                    className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 text-sm"
                                >
                                    Proceed Anyway
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    </div>
                ) : showResults ? (
                    <div className="space-y-4">
                        <div className="bg-gray-100 p-4 rounded-lg text-center">
                            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                                {timeLeft === 0 ? "Time's Up! " : ""}Quiz Complete!
                            </h4>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                                {score}/{questions.length}
                            </p>
                        </div>
                        <div className="space-y-4">
                            {questions.map((question, index) => (
                                <div key={question._id} className="border-b pb-4">
                                    <p className="text-sm sm:text-base font-medium mb-2 mt-3 text-gray-800">
                                        <span className="font-semibold">{index + 1}.</span>
                                        <span dangerouslySetInnerHTML={{
                                            __html: cleanHtml(question.questionText).replace(/\*(.*?)\*/g, "<b>$1</b>")
                                        }}></span>
                                    </p>
                                    <div className="grid gap-1 sm:gap-2">
                                        {question.options.map((option) => (
                                            <div
                                                key={option.text}
                                                className={`p-3 rounded-lg ${question.correctAnswers.includes(option.text)
                                                    ? "bg-green-100 text-gray-700 border border-green-500"
                                                    : allSelections[question._id]?.includes(option.text)
                                                        ? "bg-red-100 text-gray-700 border border-red-500"
                                                        : "bg-gray-50 text-gray-700 border border-gray-300"
                                                    }`}
                                            >
                                                {option.text}
                                                {allSelections[question._id]?.includes(option.text) && (
                                                    <span className={`ml-2 ${question.correctAnswers.includes(option.text)
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                        }`}>
                                                        {question.correctAnswers.includes(option.text)
                                                            ? "✓"
                                                            : "✗"}
                                                    </span>
                                                )}
                                                {question.correctAnswers.includes(option.text) &&
                                                    !allSelections[question._id]?.includes(option.text) && (
                                                        <span className="text-green-600 ml-2">✓</span>
                                                    )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-6 px-1">
                                        <button
                                            onClick={() => toggleExplanation(index)}
                                            className="flex items-center gap-1 bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded-lg transition-colors"
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
                                                    className="text-gray-600 pl-2 pt-3 quiz-explanation"
                                                    dangerouslySetInnerHTML={{
                                                        __html: question.explanation
                                                    }}
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
                        <div className="py-4 bg-gray-100 sm:p-6 p-2">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                                    {selectedSubtopic}
                                </h3>

                            </div>
                            <div className="flex justify-between items-center mb-3 bg-gray-100">
                                <div className="text-xs sm:text-sm text-gray-600">
                                    Time: <span className="font-semibold">{formatTime(timeLeft)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1">
                                <span>Q{currentQuestion + 1}/{questions.length}</span>
                                <span>{selectedSubtopic}</span>
                            </div>
                            <div className="h-1.5 bg-whote border border-gray-500 rounded-full">
                                <motion.div
                                    className="h-1.5 bg-gray-600 rounded-full"
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
                                <p className="text-base sm:text-lg font-medium my-4 pl-3 text-gray-800">
                                    <span dangerouslySetInnerHTML={{ __html: cleanHtml(questions[currentQuestion].questionText) }}></span>
                                </p>
                                <div className="grid gap-2">
                                    {questions[currentQuestion].options.map((option) => {
                                        const isSelected = selectedAnswers.includes(option.text);
                                        return (
                                            <button
                                                key={option.text}
                                                onClick={() => handleAnswerSelect(option.text)}
                                                className={`p-3 text-left rounded-lg transition-all ${isSelected
                                                    ? "bg-gray-600 text-white"
                                                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                <span className="text-sm sm:text-base-sm font-medium mb-3 "> {option.text}</span>
                                            </button>
                                        );
                                    })}
                                    {questions[currentQuestion].correctAnswers.length > 1 && (
                                        <div className="text-xs sm:text-sm text-gray-600">Select all correct answers</div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="mt-4 flex flex-col sm:flex-row gap-2">
                            <button
                                onClick={handleNextQuestion}
                                disabled={selectedAnswers.length === 0}
                                className="w-full bg-gray-600 text-white p-2 sm:p-3 rounded-md hover:bg-gray-700 disabled:bg-gray-300 text-sm sm:text-base"
                            >
                                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                            </button>
                            {!showResults && (
                                <button
                                    onClick={handleSkipQuestion}
                                    className="w-full bg-gray-200 text-gray-700 p-2 sm:p-3 rounded-md hover:bg-gray-300 text-sm sm:text-base"
                                >
                                    Skip
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4 text-sm sm:text-base text-gray-600">
                        No questions available
                    </div>
                )}
            </div>
        </div>
    );
}