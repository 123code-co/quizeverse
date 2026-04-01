"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { DemoQuiz } from "@/lib/sample-quizzes";

function normalizeAnswer(value: string) {
  return value.trim().toLowerCase();
}

export function useQuiz(quiz: DemoQuiz) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const totalQuestions = quiz.questions.length;
  const maxScore = useMemo(
    () => quiz.questions.reduce((sum, question) => sum + question.points, 0),
    [quiz.questions],
  );
  const currentQuestion = quiz.questions[Math.min(currentIndex, totalQuestions - 1)];
  const progress = Math.round(((completed ? totalQuestions : currentIndex) / totalQuestions) * 100);

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setRevealed(false);
    setWasCorrect(false);
    setLastAnswer(null);
    setCompleted(false);
  }, []);

  useEffect(() => {
    restart();
  }, [quiz.id, restart]);

  const submitAnswer = useCallback(
    (answer: string) => {
      if (revealed || completed) return;

      const isCorrect = normalizeAnswer(answer) === normalizeAnswer(currentQuestion.answer);
      setLastAnswer(answer);
      setWasCorrect(isCorrect);
      setRevealed(true);

      if (isCorrect) {
        setScore((current) => current + currentQuestion.points);
      }
    },
    [completed, currentQuestion.answer, currentQuestion.points, revealed],
  );

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= totalQuestions) {
      setCompleted(true);
      setRevealed(false);
      return;
    }

    setCurrentIndex((current) => current + 1);
    setRevealed(false);
    setWasCorrect(false);
    setLastAnswer(null);
  }, [currentIndex, totalQuestions]);

  return {
    currentQuestion,
    currentIndex,
    totalQuestions,
    score,
    maxScore,
    progress,
    revealed,
    wasCorrect,
    lastAnswer,
    completed,
    submitAnswer,
    nextQuestion,
    restart,
  };
}