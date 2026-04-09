'use client';
import { useState, useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ──────────────────────────────────────────────────────────────────
type Question = {
  _id: string;
  questionText: string;
  options: { text: string }[];
  correctAnswers: string[];
  explanation: string;
  subtopic: string;
};

type SubTopic = { name: string };

type QuizModalProps = {
  topic: string;
  onClose: () => void;
};

// ── LocalStorage helpers ───────────────────────────────────────────────────
const LS_KEY = (topic: string, subtopic: string) =>
  `quiz_stats__${topic}__${subtopic}`;

interface SubtopicStats {
  totalAttempted: number;  // questions ever answered (not skipped)
  totalCorrect: number;
  totalSkipped: number;
  points: number;          // +3 correct, -1 wrong, 0 skipped
  sessions: number;        // how many quiz rounds completed
  seenIds: string[];       // ids already shown — for no-repeat logic
}

function loadStats(topic: string, subtopic: string): SubtopicStats {
  try {
    const raw = localStorage.getItem(LS_KEY(topic, subtopic));
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { totalAttempted: 0, totalCorrect: 0, totalSkipped: 0, points: 0, sessions: 0, seenIds: [] };
}

function saveStats(topic: string, subtopic: string, stats: SubtopicStats) {
  try {
    localStorage.setItem(LS_KEY(topic, subtopic), JSON.stringify(stats));
  } catch { /* ignore */ }
}

// ── Constants ──────────────────────────────────────────────────────────────
const POINTS_CORRECT = 3;
const POINTS_WRONG   = -1;
const QUIZ_TIME      = 600; // 10 min

// ── Main Component ─────────────────────────────────────────────────────────
export function LicenseQuizModal({ topic, onClose }: QuizModalProps) {
  const [phase, setPhase]     = useState<"subtopic" | "stats" | "quiz" | "results">("subtopic");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [subtopics, setSubtopics]               = useState<SubTopic[]>([]);
  const [subtopicsLoading, setSubtopicsLoading] = useState(true);

  // quiz session state
  const [questions, setQuestions]           = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [allSelections, setAllSelections]   = useState<Record<string, string[]>>({});
  const [sessionCorrect, setSessionCorrect]   = useState(0);
  const [sessionSkipped, setSessionSkipped]   = useState(0);
  const [sessionPoints, setSessionPoints]     = useState(0);
  const [loading, setLoading]               = useState(false);
  const [showWarning, setShowWarning]       = useState(false);
  const [timeLeft, setTimeLeft]             = useState(QUIZ_TIME);
  const [expandedExplanations, setExpandedExplanations] = useState<Set<number>>(new Set());

  // persisted stats for selected subtopic
  const [persistedStats, setPersistedStats] = useState<SubtopicStats | null>(null);

  // fetch subtopics on mount
  useEffect(() => {
    const fetch_ = async () => {
      setSubtopicsLoading(true);
      try {
        const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bct-question-types/${topic}`);
        const d = await r.json();
        setSubtopics(d.subTopics || []);
      } catch (e) {
        console.error(e);
      } finally {
        setSubtopicsLoading(false);
      }
    };
    fetch_();
  }, [topic]);

  // timer
  useEffect(() => {
    if (phase !== "quiz" || questions.length === 0) return;
    const id = setInterval(() => {
      setTimeLeft(p => {
        if (p <= 1) { clearInterval(id); finishSession(); return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase, questions]);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const cleanHtml = (html: string) => {
    let p = html.replace(/\*+([^*]+)\*+/g, '<strong>$1</strong>');
    p = p.replace(/<(?!\/?(br|strong|em|ul|ol|li|h[1-6]|code|pre|blockquote)\b)[^>]+>/gi, '');
    const t = document.createElement("textarea");
    t.innerHTML = p;
    return t.value;
  };

  const processExplanation = (html: string) => {
    if (typeof html !== 'string') return '';
    return html
      .replace(/&quot;/g, '"').replace(/&#34;/g, '"')
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/<img[^>]*src=\\?"([^"\\]*)\\?"[^>]*>/gi, (_, src) => {
        const c = src.replace(/\\/g, '');
        return c.startsWith('data:image') ? `<img src="${c}" style="max-width:100%;height:auto;margin:10px 0"/>` : '';
      });
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const toggleExplanation = (i: number) => {
    const s = new Set(expandedExplanations);
    s.has(i) ? s.delete(i) : s.add(i);
    setExpandedExplanations(s);
  };

  // ── Select subtopic → show stats then start ──────────────────────────────
  const handleSelectSubtopic = (name: string) => {
    const stats = loadStats(topic, name);
    setSelectedSubtopic(name);
    setPersistedStats(stats);
    setPhase("stats");
  };

  const startQuiz = async () => {
    if (!selectedSubtopic) return;
    setLoading(true);
    setPhase("quiz");
    try {
      const r = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bct-quizzes/type?questionType=${encodeURIComponent(topic)}&subTopic=${encodeURIComponent(selectedSubtopic)}`
      );
      const data: Question[] = await r.json();

      const stats = loadStats(topic, selectedSubtopic);

      // filter already seen, then shuffle
      let unseen = data.filter(q => !stats.seenIds.includes(q._id));

      // if all seen → reset pool
      if (unseen.length === 0) {
        unseen = data;
        stats.seenIds = [];
        saveStats(topic, selectedSubtopic, stats);
      }

      const shuffled = shuffleArray(unseen);
      const batch = shuffled.slice(0, 10);

      const cleaned = batch.map(q => ({
        ...q,
        questionText: cleanHtml(q.questionText),
        options: shuffleArray(q.options.map(o => ({ text: cleanHtml(o.text) }))),
        correctAnswers: q.correctAnswers.map(ca => cleanHtml(ca)),
        explanation: processExplanation(q.explanation),
      }));

      setQuestions(cleaned);
      setCurrentQuestion(0);
      setSelectedAnswers([]);
      setAllSelections({});
      setSessionCorrect(0);
      setSessionSkipped(0);
      setSessionPoints(0);
      setTimeLeft(QUIZ_TIME);
      setExpandedExplanations(new Set());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // ── Answer / navigation ──────────────────────────────────────────────────
  const handleAnswerSelect = (answer: string) => {
    const isMulti = questions[currentQuestion]?.correctAnswers.length > 1;
    setSelectedAnswers(prev =>
      isMulti
        ? prev.includes(answer) ? prev.filter(a => a !== answer) : [...prev, answer]
        : prev.includes(answer) ? [] : [answer]
    );
  };

  const commitAnswer = (skipped: boolean) => {
    const q = questions[currentQuestion];
    if (!q) return;

    let pointsDelta = 0;
    let correct = false;

    if (!skipped && selectedAnswers.length > 0) {
      const sorted = (arr: string[]) => [...arr].sort();
      correct = JSON.stringify(sorted(q.correctAnswers)) === JSON.stringify(sorted(selectedAnswers));
      pointsDelta = correct ? POINTS_CORRECT : POINTS_WRONG;
    }

    setAllSelections(prev => ({ ...prev, [q._id]: skipped ? [] : selectedAnswers }));
    if (!skipped) {
      setSessionCorrect(p => p + (correct ? 1 : 0));
      setSessionPoints(p => p + pointsDelta);
    } else {
      setSessionSkipped(p => p + 1);
    }

    setSelectedAnswers([]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(p => p + 1);
    } else {
      finishSession(!skipped ? correct : undefined, pointsDelta);
    }
  };

  // called when last question answered OR timer hits 0
  const finishSession = (lastCorrect?: boolean, lastPoints?: number) => {
    if (!selectedSubtopic) return;

    setPhase("results");

    // persist stats
    const stats = loadStats(topic, selectedSubtopic);
    const answered = questions.length - sessionSkipped - (lastCorrect === undefined ? 1 : 0);
    stats.totalAttempted += answered + (lastCorrect !== undefined ? 1 : 0);
    stats.totalCorrect   += sessionCorrect + (lastCorrect ? 1 : 0);
    stats.totalSkipped   += sessionSkipped + (lastCorrect === undefined ? 1 : 0);
    stats.points         += sessionPoints + (lastPoints ?? 0);
    stats.sessions       += 1;
    stats.seenIds         = [...new Set([...stats.seenIds, ...questions.map(q => q._id)])];
    saveStats(topic, selectedSubtopic, stats);
    setPersistedStats(stats);
  };

  const handleClose = () => {
    if (phase === "quiz" && currentQuestion < questions.length) {
      setShowWarning(true);
    } else {
      onClose();
    }
  };

  const rank = (pts: number) => {
    if (pts >= 300) return { label: "Elite", color: "#f59e0b", icon: "🏆" };
    if (pts >= 150) return { label: "Expert", color: "#6366f1", icon: "💎" };
    if (pts >= 60)  return { label: "Advanced", color: "#10b981", icon: "⭐" };
    if (pts >= 20)  return { label: "Intermediate", color: "#3b82f6", icon: "📚" };
    return { label: "Beginner", color: "#64748b", icon: "🌱" };
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4"
         style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}>

      {/* Warning overlay */}
      <AnimatePresence>
        {showWarning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
              <p className="text-gray-800 font-semibold text-center mb-5">
                Progress won't be saved. Exit anyway?
              </p>
              <div className="flex gap-3">
                <button onClick={() => setShowWarning(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                  Stay
                </button>
                <button onClick={() => { setShowWarning(false); onClose(); }}
                  className="flex-1 text-white py-2 rounded-lg transition-colors text-sm font-medium"
                  style={{ background: "#1e293b" }}>
                  Exit
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl"
        style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

        {/* ── SUBTOPIC SELECTION ── */}
        {phase === "subtopic" && (
          <div>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Module</p>
                <h3 className="text-lg font-bold text-gray-900">{topic}</h3>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-gray-500 mb-4">Choose a subtopic to begin your practice session</p>
              {subtopicsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
                </div>
              ) : (
                <div className="space-y-2">
                  {subtopics.map((st, i) => {
                    const stats = loadStats(topic, st.name);
                    const r = rank(stats.points);
                    return (
                      <motion.button
                        key={st.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => handleSelectSubtopic(st.name)}
                        className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-800">{st.name}</span>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            {stats.sessions > 0 && (
                              <>
                                <span>{r.icon} {r.label}</span>
                                <span className="font-bold" style={{ color: r.color }}>{stats.points}pts</span>
                              </>
                            )}
                            <span className="text-gray-300 group-hover:text-gray-500 transition-colors">›</span>
                          </div>
                        </div>
                        {stats.sessions > 0 && (
                          <div className="mt-1.5 flex gap-3 text-xs text-gray-400">
                            <span>{stats.sessions} {stats.sessions !== 1 ? 's' : ''}</span>
                            <span>·</span>
                            <span>{stats.totalCorrect}/{stats.totalAttempted} correct</span>
                            <span>·</span>
                            <span>{stats.seenIds.length} seen</span>
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── STATS / START SCREEN ── */}
        {phase === "stats" && persistedStats && selectedSubtopic && (
          <div>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">{topic}</p>
                <h3 className="text-lg font-bold text-gray-900">{selectedSubtopic}</h3>
              </div>
              <button onClick={() => setPhase("subtopic")} className="text-gray-400 hover:text-gray-700 transition-colors">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-6">
              {/* Rank badge */}
              {(() => {
                const r = rank(persistedStats.points);
                return (
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-2">{r.icon}</div>
                    <p className="text-2xl font-bold" style={{ color: r.color }}>{r.label}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {persistedStats.sessions === 0 ? "No sessions yet — start your first!" : `${persistedStats.sessions} session${persistedStats.sessions !== 1 ? 's' : ''} completed`}
                    </p>
                  </div>
                );
              })()}

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Total Points", value: persistedStats.points, suffix: "pts", bold: true },
                  { label: "Accuracy", value: persistedStats.totalAttempted > 0 ? Math.round((persistedStats.totalCorrect / persistedStats.totalAttempted) * 100) : 0, suffix: "%" },
                  { label: "Answered", value: persistedStats.totalAttempted },
                  { label: "Correct", value: persistedStats.totalCorrect },
                  { label: "Skipped", value: persistedStats.totalSkipped },
                  { label: "Questions Seen", value: persistedStats.seenIds.length },
                ].map(stat => (
                  <div key={stat.label} className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                    <p className="text-xs text-gray-400 mb-0.5">{stat.label}</p>
                    <p className={`text-xl font-bold ${stat.bold ? "text-indigo-600" : "text-gray-800"}`}>
                      {stat.value}{stat.suffix ?? ""}
                    </p>
                  </div>
                ))}
              </div>

              {/* Points legend */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-6 text-xs text-amber-800">
                <p className="font-semibold mb-1">Scoring system</p>
                <div className="flex gap-4">
                  <span>✓ Correct: <b>+{POINTS_CORRECT} pts</b></span>
                  <span>✗ Wrong: <b>{POINTS_WRONG} pts</b></span>
                  <span>— Skip: <b>0 pts</b></span>
                </div>
              </div>

              <button onClick={startQuiz}
                className="w-full text-white py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)" }}>
                {persistedStats.sessions === 0 ? "Start Quiz →" : "Play Again →"}
              </button>
              {persistedStats.sessions > 0 && (
                <button
                  onClick={() => {
                    if (confirm("Reset all stats for this subtopic?")) {
                      saveStats(topic, selectedSubtopic, { totalAttempted: 0, totalCorrect: 0, totalSkipped: 0, points: 0, sessions: 0, seenIds: [] });
                      setPersistedStats({ totalAttempted: 0, totalCorrect: 0, totalSkipped: 0, points: 0, sessions: 0, seenIds: [] });
                    }
                  }}
                  className="w-full mt-2 text-gray-400 py-2 text-xs hover:text-red-500 transition-colors">
                  Reset stats
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── QUIZ PHASE ── */}
        {phase === "quiz" && (
          <div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
              </div>
            ) : questions.length > 0 ? (
              <>
                {/* Header bar */}
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-400">{topic} · {selectedSubtopic}</p>
                      <p className="text-sm font-semibold text-gray-700">
                        Q {currentQuestion + 1} / {questions.length}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Live points */}
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Session pts</p>
                        <p className={`text-base font-bold ${sessionPoints >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                          {sessionPoints >= 0 ? "+" : ""}{sessionPoints}
                        </p>
                      </div>
                      {/* Timer */}
                      <div className={`text-right px-3 py-1.5 rounded-lg text-sm font-mono font-bold ${timeLeft <= 60 ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-700"}`}>
                        {formatTime(timeLeft)}
                      </div>
                      <button onClick={handleClose} className="text-gray-400 hover:text-gray-700 transition-colors">
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div className="h-1 rounded-full"
                      style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
                      animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.3 }} />
                  </div>
                </div>

                {/* Question */}
                <AnimatePresence mode="wait">
                  <motion.div key={currentQuestion}
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.18 }}
                    className="px-5 py-5">
                    <p className="text-sm sm:text-base font-medium text-gray-800 mb-4 leading-relaxed"
                       dangerouslySetInnerHTML={{ __html: cleanHtml(questions[currentQuestion].questionText) }} />

                    {questions[currentQuestion].correctAnswers.length > 1 && (
                      <p className="text-xs text-indigo-500 mb-3 font-medium">
                        ✦ Select all correct answers
                      </p>
                    )}

                    <div className="space-y-2">
                      {questions[currentQuestion].options.map(opt => {
                        const sel = selectedAnswers.includes(opt.text);
                        return (
                          <button key={opt.text} onClick={() => handleAnswerSelect(opt.text)}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                              sel
                                ? "border-indigo-400 bg-indigo-50 text-indigo-800 font-medium"
                                : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400 hover:bg-white"
                            }`}>
                            <span className={`inline-block w-5 h-5 rounded-full border mr-3 align-middle text-center text-xs leading-5 ${
                              sel ? "bg-indigo-500 border-indigo-500 text-white" : "border-gray-300"
                            }`}>
                              {sel ? "✓" : ""}
                            </span>
                            {opt.text}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Action buttons */}
                <div className="px-5 pb-5 flex gap-2">
                  <button onClick={() => commitAnswer(false)}
                    disabled={selectedAnswers.length === 0}
                    className="flex-1 text-white py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 hover:opacity-90"
                    style={{ background: "linear-gradient(135deg,#1e293b,#334155)" }}>
                    {currentQuestion === questions.length - 1 ? "Finish" : "Next →"}
                  </button>
                  <button onClick={() => commitAnswer(true)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
                    Skip
                  </button>
                </div>
              </>
            ) : (
              <div className="p-10 text-center text-gray-500">No questions available for this subtopic.</div>
            )}
          </div>
        )}

        {/* ── RESULTS PHASE ── */}
        {phase === "results" && persistedStats && selectedSubtopic && (
          <div>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Session Complete!</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-5">
              {/* Session summary */}
              <div className="rounded-2xl p-5 mb-5 text-white text-center"
                   style={{ background: "linear-gradient(135deg,#1e293b 0%,#334155 100%)" }}>
                <p className="text-xs opacity-60 uppercase tracking-widest mb-1">Session Score</p>
                <p className={`text-4xl font-black mb-1 ${sessionPoints >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {sessionPoints >= 0 ? "+" : ""}{sessionPoints} pts
                </p>
                <p className="text-sm opacity-70">
                  {sessionCorrect} correct · {questions.length - sessionCorrect - sessionSkipped} wrong · {sessionSkipped} skipped
                </p>
              </div>

              {/* All-time rank */}
              {(() => {
                const r = rank(persistedStats.points);
                return (
                  <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 mb-5 border border-gray-100">
                    <span className="text-3xl">{r.icon}</span>
                    <div>
                      <p className="text-xs text-gray-400">All-time rank</p>
                      <p className="font-bold" style={{ color: r.color }}>{r.label}</p>
                      <p className="text-xs text-gray-400">{persistedStats.points} total points · {persistedStats.sessions} </p>
                    </div>
                  </div>
                );
              })()}

              {/* Review answers */}
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Answer Review</h4>
              <div className="space-y-5">
                {questions.map((q, idx) => {
                  const userAns = allSelections[q._id] || [];
                  const sortedCA = [...q.correctAnswers].sort();
                  const sortedUA = [...userAns].sort();
                  const wasSkipped = userAns.length === 0;
                  const isCorrect  = !wasSkipped && JSON.stringify(sortedCA) === JSON.stringify(sortedUA);
                  return (
                    <div key={q._id} className="border-b border-gray-100 pb-4">
                      <div className="flex items-start gap-2 mb-2">
                        <span className={`mt-0.5 text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${
                          wasSkipped ? "bg-gray-100 text-gray-500" :
                          isCorrect  ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                        }`}>
                          {wasSkipped ? "Skipped" : isCorrect ? `+${POINTS_CORRECT}` : `${POINTS_WRONG}`}
                        </span>
                        <p className="text-sm text-gray-800 font-medium"
                           dangerouslySetInnerHTML={{ __html: cleanHtml(q.questionText) }} />
                      </div>
                      <div className="grid gap-1 ml-7">
                        {q.options.map(opt => (
                          <div key={opt.text}
                            className={`px-3 py-2 rounded-lg text-xs border ${
                              q.correctAnswers.includes(opt.text)
                                ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                                : userAns.includes(opt.text)
                                  ? "bg-red-50 border-red-300 text-red-700"
                                  : "bg-gray-50 border-gray-200 text-gray-500"
                            }`}>
                            {q.correctAnswers.includes(opt.text) ? "✓ " : userAns.includes(opt.text) ? "✗ " : "  "}
                            {opt.text}
                          </div>
                        ))}
                      </div>
                      {/* Explanation */}
                      <div className="ml-7 mt-2">
                        <button onClick={() => toggleExplanation(idx)}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                          <motion.span animate={{ rotate: expandedExplanations.has(idx) ? 180 : 0 }} className="inline-block">▾</motion.span>
                          Explanation
                        </button>
                        <AnimatePresence>
                          {expandedExplanations.has(idx) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-xs text-gray-600 mt-2 bg-gray-50 rounded-lg p-3 border border-gray-100"
                              dangerouslySetInnerHTML={{ __html: q.explanation }} />
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Play again / back */}
              <div className="flex gap-2 mt-6">
                <button onClick={startQuiz}
                  className="flex-1 text-white py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-all"
                  style={{ background: "linear-gradient(135deg,#1e293b,#334155)" }}>
                  Play Again
                </button>
                <button onClick={() => setPhase("subtopic")}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                  Change Topic
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Fisher-Yates shuffle
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}