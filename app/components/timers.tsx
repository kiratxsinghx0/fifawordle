"use client";

import { useState, useEffect } from "react";

function getNextPuzzleTime(): Date {
  const now = new Date();
  const next = new Date();
  next.setHours(10, 0, 0, 0); // 10:00 AM
  // If it's already past 10 AM today, next puzzle is tomorrow at 10 AM
  if (now >= next) {
    next.setDate(next.getDate() + 1);
  }

  return next;
}

function formatTime(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map(n => String(n).padStart(2, "0")).join(":");
}

export default function NextPuzzleTimer() {
  const [timeLeft, setTimeLeft] = useState(() =>
    getNextPuzzleTime().getTime() - Date.now()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getNextPuzzleTime().getTime() - Date.now();
      setTimeLeft(remaining);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="next-puzzle-timer-card">
      <p className="next-puzzle-timer-card__label">Next puzzle in</p>
      <div className="next-puzzle-timer-card__time">{formatTime(timeLeft)}</div>
    </div>
  );
}
