"use client";

import { useState } from "react";
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

  // ✅ Your site link — change this to your actual domain
  const siteLink = "http://localhost:3001";

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

  const handleCopy = () => {
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

          <div
            style={{
              width: "64px",
              height: "64px",
              background: "#6aaa64",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "32px",
            }}
          >
            ⭐
          </div>

          <h2
            style={{
              fontSize: "1.9rem",
              fontWeight: 900,
              margin: "0 0 12px",
              letterSpacing: "-0.5px",
              color: "#111",
            }}
          >
            {won ? "Congratulations!" : "Thanks for playing today!"}
          </h2>

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
              marginBottom: "20px",
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

          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "0 0 16px" }} />

          <p style={{ fontSize: "0.8rem", color: "#aaa", margin: 0 }}>
            ⚽ FIFA Wordle — A new player every day
          </p>
        </div>
      </div>
    </>
  );
}
