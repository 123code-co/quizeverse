"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock3, Flame, RotateCcw, ShieldCheck, Zap } from "lucide-react";
import { useQuiz } from "@/hooks/useQuiz";
import { useTimer } from "@/hooks/useTimer";
import { demoQuizzes, getDemoQuizById } from "@/lib/sample-quizzes";

type QuizArenaProps = {
  initialQuizId?: string;
  title?: string;
  subtitle?: string;
};

export function QuizArena({
  initialQuizId,
  title = "Interactive Game Modes",
  subtitle = "Switch between quiz types and play them live from this mission console.",
}: QuizArenaProps) {
  const [selectedQuizId, setSelectedQuizId] = useState(initialQuizId ?? demoQuizzes[0].id);
  const [typedAnswer, setTypedAnswer] = useState("");

  const selectedQuiz = useMemo(() => getDemoQuizById(selectedQuizId), [selectedQuizId]);
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    score,
    maxScore,
    progress,
    completed,
    revealed,
    wasCorrect,
    lastAnswer,
    submitAnswer,
    nextQuestion,
    restart,
  } = useQuiz(selectedQuiz);
  const { timeLeft, reset: resetTimer } = useTimer(selectedQuiz.timeLimitSec, { autoStart: true });

  useEffect(() => {
    resetTimer(selectedQuiz.timeLimitSec);
  }, [selectedQuiz.timeLimitSec, resetTimer]);

  const performance = maxScore === 0 ? 0 : Math.round((score / maxScore) * 100);

  function handleModeChange(quizId: string) {
    setTypedAnswer("");
    setSelectedQuizId(quizId);
  }

  function handleFillSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!typedAnswer.trim()) return;
    submitAnswer(typedAnswer.trim());
  }

  return (
    <section className="space-y-5 rounded-[28px] border border-slate-800 bg-slate-900/75 p-5 shadow-2xl backdrop-blur">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Quiz Arena</p>
          <h2 className="mt-2 text-2xl font-black text-white">{title}</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">{subtitle}</p>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
            <p className="text-xs text-slate-400">Score</p>
            <p className="text-lg font-bold text-cyan-200">{score} / {maxScore}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
            <p className="text-xs text-slate-400">Timer</p>
            <p className="text-lg font-bold text-amber-200">{timeLeft}s</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
            <p className="text-xs text-slate-400">Progress</p>
            <p className="text-lg font-bold text-emerald-200">{progress}%</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {demoQuizzes.map((quiz) => {
          const isActive = quiz.id === selectedQuiz.id;
          return (
            <button
              key={quiz.id}
              type="button"
              onClick={() => handleModeChange(quiz.id)}
              className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-200"
                  : "border-slate-700 bg-slate-950/70 text-slate-300 hover:border-cyan-400/30"
              }`}
            >
              {quiz.title}
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(2,6,23,0.95))] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{selectedQuiz.modeLabel}</p>
            <h3 className="mt-2 text-xl font-bold">{selectedQuiz.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{selectedQuiz.description}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-sm text-slate-300">
            {selectedQuiz.category} • {selectedQuiz.difficulty}
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${progress}%` }} />
        </div>

        {completed ? (
          <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm text-emerald-100">
            <div className="flex items-center gap-2 text-emerald-200">
              <ShieldCheck className="h-5 w-5" />
              <p className="font-semibold">Run complete</p>
            </div>
            <p className="mt-3 text-lg font-bold">You finished with {performance}% accuracy.</p>
            <p className="mt-2 text-emerald-50/90">
              Final score: <span className="font-semibold">{score}</span> / {maxScore}
            </p>
            <button
              type="button"
              onClick={restart}
              className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-emerald-300 px-4 py-2 font-semibold text-slate-950 transition hover:bg-emerald-200"
            >
              <RotateCcw className="h-4 w-4" />
              Play Again
            </button>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <span className="rounded-full bg-slate-800 px-3 py-1">Question {currentIndex + 1} / {totalQuestions}</span>
              <span className="rounded-full bg-slate-800 px-3 py-1">Worth {currentQuestion.points} pts</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-amber-200"><Clock3 className="h-3.5 w-3.5" /> Live timer active</span>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white">{currentQuestion.prompt}</h4>
            </div>

            {currentQuestion.type === "FILL_IN_BLANK" ? (
              <form onSubmit={handleFillSubmit} className="space-y-3">
                <input
                  value={typedAnswer}
                  onChange={(event) => setTypedAnswer(event.target.value)}
                  disabled={revealed}
                  placeholder={currentQuestion.placeholder ?? "Type your answer"}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
                />
                <button
                  type="submit"
                  disabled={revealed}
                  className="rounded-2xl bg-cyan-400 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
                >
                  Submit Answer
                </button>
              </form>
            ) : (
              <div className="grid gap-3">
                {currentQuestion.options?.map((option) => {
                  const isSelected = lastAnswer === option;
                  const isCorrectOption = option === currentQuestion.answer;

                  let classes = "border-slate-700 bg-slate-950/75 text-slate-200 hover:border-cyan-400/30";
                  if (revealed && isCorrectOption) {
                    classes = "border-emerald-500/40 bg-emerald-500/10 text-emerald-100";
                  } else if (revealed && isSelected && !isCorrectOption) {
                    classes = "border-rose-500/40 bg-rose-500/10 text-rose-100";
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={revealed}
                      onClick={() => submitAnswer(option)}
                      className={`rounded-2xl border px-4 py-3 text-left transition ${classes}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            )}

            {revealed && (
              <div className={`rounded-2xl border p-4 text-sm ${wasCorrect ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100" : "border-rose-500/30 bg-rose-500/10 text-rose-100"}`}>
                <div className="flex items-center gap-2 font-semibold">
                  {wasCorrect ? <CheckCircle2 className="h-4 w-4" /> : <Flame className="h-4 w-4" />}
                  {wasCorrect ? "Correct answer" : "Not quite this time"}
                </div>
                <p className="mt-2">{currentQuestion.explanation}</p>
                {!wasCorrect && (
                  <p className="mt-1 text-slate-200">Correct answer: <span className="font-semibold">{currentQuestion.answer}</span></p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setTypedAnswer("");
                    nextQuestion();
                  }}
                  className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-slate-950/80 px-4 py-2 font-semibold text-cyan-200 transition hover:bg-slate-950"
                >
                  <Zap className="h-4 w-4" />
                  {currentIndex + 1 === totalQuestions ? "Finish Run" : "Next Question"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
