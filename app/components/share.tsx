"use client";

import { useState } from "react";
import NextPuzzleTimer from "./timers";
const PRIZES_NOTICE = "You can win prizes in upcoming Wordle games.";

const STATUS_EMOJI: Record<string, string> = {
  correct: "🟩",
  present: "🟨",
  absent: "⬜",
};

type Props = {
  won: boolean;
  answer: string;
  guessCount: number;
  statuses: string[][];
  onClose: () => void;
};

export default function ShareModal({ won, answer, guessCount, statuses, onClose }: Props) {
  void answer;
  const [copied, setCopied] = useState(false);

  // Only include rows the user actually played
  const emojiGrid = statuses
    .slice(0, guessCount)
    .map(row => row.map(s => STATUS_EMOJI[s]).join(""))
    .join("\n");

  const handleCopy = () => {
    const siteLink = window.location.href;

    const shareText = [
      "⚽ FIFA Wordle",
      won ? `${guessCount}/6` : "X/6",
      "",
      emojiGrid,
      "",
      siteLink,
      "",
      PRIZES_NOTICE,
    ].join("\n");

    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <div
        className="share-modal-backdrop"
        onClick={onClose}
        role="presentation"
      >
        <div
          className="share-modal-card"
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <button type="button" className="share-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>

          {/* ── Header ── */}
          <div className="share-modal-header">
            <div className="share-star-icon-outer">
              <div className="share-star-icon-inner">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="#fff"
                  aria-hidden="true"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>

            <h2 className="share-modal-title">
              {won ? "Congratulations!" : "Thanks for playing today!"}
            </h2>
          </div>

          {/* ── Main ── */}
          <div className="share-modal-main">
            <div style={{ marginBottom: "16px" }}>
              <NextPuzzleTimer />
            </div>

            <p
              style={{
                fontSize: "1.05rem",
                color: "#444",
                margin: "0 0 24px",
                lineHeight: 1.5,
              }}
            >
              {won
                ? `You got it in ${guessCount}/6 — share your result!`
                : "Better luck tomorrow! Share your result anyway."}
            </p>

            <p className="share-modal-prizes-notice">{PRIZES_NOTICE}</p>

            <div className="share-modal-emoji-preview">{emojiGrid}</div>

            <button
              type="button"
              onClick={handleCopy}
              style={{
                width: "100%",
                padding: "16px",
                background: copied ? "#6aaa64" : "#538d4e",
                color: "#fff",
                border: "none",
                borderRadius: "32px",
                fontSize: "1.05rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "background 0.2s",
              }}
            >
              {copied ? (
                "Copied! Challenge your friends 👀"
              ) : (
                <>
                  Share
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* ── Footer ── */}
          <div className="share-modal-footer">
            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "0 0 16px" }} />
            <p style={{ fontSize: "0.8rem", color: "#aaa", margin: 0 }}>
              ⚽ FIFA Wordle — A new player every day
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
