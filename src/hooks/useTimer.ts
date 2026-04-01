"use client";

import { useCallback, useEffect, useState } from "react";

type UseTimerOptions = {
  autoStart?: boolean;
};

export function useTimer(initialSeconds: number, options: UseTimerOptions = {}) {
  const { autoStart = true } = options;
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = window.setInterval(() => {
      setTimeLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning, timeLeft]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(
    (nextSeconds = initialSeconds) => {
      setTimeLeft(nextSeconds);
      setIsRunning(autoStart);
    },
    [autoStart, initialSeconds],
  );

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
  };
}