"use client";
import { useState, useEffect, useCallback } from "react";
import ShareModal from "./share";
import NextPuzzleTimer from "./timers";
import { players } from "./players";

/** Optional display metadata when the playable 5-letter token is an abbreviation. */
export type PlayerNameMeta = { shortened: true; fullName: string };
const PRIZES_NOTICE = "You can win prizes in upcoming Wordle games.";
type PlayerHint = {
  age: number;
  club: string;
  country: string;
  position: string;
  trivia: string;
};

type PlayerRow = {
  name: string;
  meta?: { shortened?: boolean; fullName?: string };
  hint: PlayerHint;
};

const HINT_LABELS = ["Age", "Club", "Country", "Position", "Trivia"] as const;

function hintForWrongGuess(h: PlayerHint, wrongGuessCount: number): { label: string; text: string } {
  const tier = Math.min(Math.max(wrongGuessCount - 1, 0), HINT_LABELS.length - 1);
  const label = HINT_LABELS[tier];
  const values: [string, string, string, string, string] = [
    String(h.age),
    h.club,
    h.country,
    h.position,
    h.trivia,
  ];
  return { label, text: values[tier] };
}

const VALID_GUESSES = players.map((p: PlayerRow) => p.name.toLowerCase());

function resolvePlayerByName(token: string): PlayerRow {
  const normalized = token.trim().toLowerCase();
  const row = players.find((p) => p.name.toLowerCase() === normalized);
  if (!row) {
    throw new Error(
      `games.tsx: PLAYER_TO_GUESS "${token}" must match a name in players.ts`
    );
  }
  return row as PlayerRow;
}

/**
 * Player users must guess — set this to the five-letter `name` from `players.ts` (any case).
 */
const PLAYER_TO_GUESS = "MESSI";

const targetPlayer = resolvePlayerByName(PLAYER_TO_GUESS);
const answer = targetPlayer.name.toLowerCase();
const nameNotice =
  targetPlayer.meta?.shortened === true && targetPlayer.meta.fullName
    ? targetPlayer.meta.fullName
    : null;

const MAX_GUESSES  = 6;
const WORD_LENGTH  = 5;
const FLIP_DURATION = 400;
const FLIP_STAGGER  = 100;

const STATUS_PRIORITY: Record<string, number> = { correct: 3, present: 2, absent: 1 };
const STATUS_COLOR: Record<string, string> = {
  correct: "#6aaa64",
  present: "#c9b458",
  absent:  "#787c7e",
};

function getLetterStatuses(guess: string, answer: string): string[] {
  const result    = Array(WORD_LENGTH).fill("absent");
  const answerArr = answer.split("");
  const guessArr  = guess.split("");
  const used      = Array(WORD_LENGTH).fill(false);

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessArr[i] === answerArr[i]) { result[i] = "correct"; used[i] = true; }
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (!used[j] && guessArr[i] === answerArr[j]) {
        result[i] = "present"; used[j] = true; break;
      }
    }
  }
  return result;
}

const LS_GUESS_KEY = "guess";
const LS_USER_HAS_PLAYED_KEY = "userHasPlayed";
const LS_USER_HAS_PLAYED_VALUE = "yes";
const LS_PUZZLE_ID_KEY = "puzzleId";

function parseGuessObject(raw: string, targetAnswer: string): { guesses: string[]; statuses: string[][] } | null {
  const obj = JSON.parse(raw) as Record<string, string>;
  const keys = Object.keys(obj)
    .map(Number)
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b);
  if (keys.length === 0) return null;
  const guesses: string[] = [];
  const statuses: string[][] = [];
  for (const k of keys) {
    const g = obj[String(k)];
    if (typeof g !== "string" || g.length !== WORD_LENGTH) continue;
    guesses.push(g);
    statuses.push(getLetterStatuses(g, targetAnswer));
  }
  if (guesses.length === 0) return null;
  return { guesses, statuses };
}

/**
 * Restore when `userHasPlayed` is "yes".
 * `puzzleId` is only written after the game ends (win or 6 guesses); until then it is absent and we still restore in-progress boards.
 * If `puzzleId` is present, it must match `PLAYER_TO_GUESS` (finished game for this puzzle).
 */
function readStoredGuesses(puzzleId: string, targetAnswer: string): { guesses: string[]; statuses: string[][] } | null {
  if (typeof window === "undefined") return null;
  try {
    if (localStorage.getItem(LS_USER_HAS_PLAYED_KEY) !== "no") return null;
    const storedPuzzleId = localStorage.getItem(LS_PUZZLE_ID_KEY);
    if (storedPuzzleId != null && storedPuzzleId !== "") {
      if (storedPuzzleId !== puzzleId) return null;
    }
    const raw = localStorage.getItem(LS_GUESS_KEY);
    if (!raw) return null;
    return parseGuessObject(raw, targetAnswer);
  } catch {
    return null;
  }
}

/**
 * Saves guess rows and marks the session as played.
 * `puzzleId` is stored only when the game is finished (correct answer or all 6 guesses used).
 */
function persistGuess(
  puzzleId: string,
  guessIndex1Based: number,
  word: string,
  targetAnswer: string,
) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_USER_HAS_PLAYED_KEY, LS_USER_HAS_PLAYED_VALUE);
    const prevPuzzle = localStorage.getItem(LS_PUZZLE_ID_KEY);
    const prevEmpty = prevPuzzle === null || prevPuzzle === "";
    const shouldMerge = prevEmpty || prevPuzzle === puzzleId;
    let obj: Record<string, string> = {};
    if (shouldMerge) {
      const existing = localStorage.getItem(LS_GUESS_KEY);
      if (existing) obj = { ...JSON.parse(existing) as Record<string, string> };
    }
    obj[String(guessIndex1Based)] = word;
    localStorage.setItem(LS_GUESS_KEY, JSON.stringify(obj));
    const won = word === targetAnswer;
    const gameOver = won || guessIndex1Based === MAX_GUESSES;
    if (gameOver) {
      localStorage.setItem(LS_PUZZLE_ID_KEY, puzzleId);
    }
  } catch {
    /* quota / private mode */
  }
}

function letterStatusFromRows(guessRows: string[], statusRows: string[][]): Record<string, string> {
  const next: Record<string, string> = {};
  for (let r = 0; r < guessRows.length; r++) {
    const row = guessRows[r];
    const rowStats = statusRows[r];
    if (!rowStats) continue;
    row.split("").forEach((letter, i) => {
      const s = rowStats[i];
      if (!next[letter] || STATUS_PRIORITY[s] > STATUS_PRIORITY[next[letter]]) {
        next[letter] = s;
      }
    });
  }
  return next;
}

export default function Game() {
  const [currentInput,  setCurrentInput]  = useState("");
  const [guesses,       setGuesses]       = useState<string[]>([]);
  const [statuses,      setStatuses]      = useState<string[][]>([]);
  const [letterStatus,  setLetterStatus]  = useState<Record<string, string>>({});
  const [shaking,       setShaking]       = useState(false);
  const [message,       setMessage]       = useState("");
  const [showModal,     setShowModal]     = useState(false);
  const [shareDismissed, setShareDismissed] = useState(false);

  // Animation state
  const [flippingRow,      setFlippingRow]      = useState<number | null>(null);
  const [flippingGuess,    setFlippingGuess]    = useState("");
  const [flippingStatuses, setFlippingStatuses] = useState<string[]>([]);
  const [currentFlipCol,   setCurrentFlipCol]   = useState(-1);
  const [doneFlipCols,     setDoneFlipCols]     = useState<Set<number>>(new Set());

  const isAnimating = flippingRow !== null;
  const won      = guesses.length > 0 && guesses[guesses.length - 1] === answer;
  const lost     = !won && guesses.length === MAX_GUESSES;
  const gameOver = won || lost;

  const wrongGuessCount = guesses.filter((g) => g !== answer).length;
  /** One hint at a time; each new wrong guess replaces the previous (age → club → country → position → trivia). */
  const currentHint = hintForWrongGuess(targetPlayer.hint, wrongGuessCount);
  const showProgressiveHints =
    wrongGuessCount >= 1 && !won && !lost && !(gameOver && shareDismissed);
  /** After a loss, reveal the player in the hint card (not above the grid). */
  const showAnswerReveal =
    lost && !isAnimating && !(gameOver && shareDismissed);
  const displayRevealName =
    nameNotice ??
    `${answer.charAt(0).toUpperCase()}${answer.slice(1).toLowerCase()}`;

  // Restore when userHasPlayed is "yes" (puzzleId only exists after game ends)
  useEffect(() => {
    const loaded = readStoredGuesses(PLAYER_TO_GUESS, answer);
    if (!loaded) return;
    queueMicrotask(() => {
      setGuesses(loaded.guesses);
      setStatuses(loaded.statuses);
      setLetterStatus(letterStatusFromRows(loaded.guesses, loaded.statuses));
    });
  }, []);

  // Per-tile flip sequencer
  useEffect(() => {
    if (currentFlipCol < 0 || flippingRow === null) return;

    const timer = setTimeout(() => {
      setDoneFlipCols(prev => new Set([...prev, currentFlipCol]));

      if (currentFlipCol < WORD_LENGTH - 1) {
        setCurrentFlipCol(currentFlipCol + 1);
      } else {
        const guess    = flippingGuess;
        const rowStats = flippingStatuses;
        persistGuess(PLAYER_TO_GUESS, (flippingRow ?? 0) + 1, guess, answer);

        setGuesses(prev => [...prev, guess]);
        setStatuses(prev => [...prev, rowStats]);
        setLetterStatus(prev => {
          const next = { ...prev };
          guess.split("").forEach((letter, i) => {
            const s = rowStats[i];
            if (!next[letter] || STATUS_PRIORITY[s] > STATUS_PRIORITY[next[letter]]) {
              next[letter] = s;
            }
          });
          return next;
        });

        setFlippingRow(null);
        setFlippingGuess("");
        setFlippingStatuses([]);
        setCurrentFlipCol(-1);
        setDoneFlipCols(new Set());
      }
    }, FLIP_DURATION + FLIP_STAGGER);

    return () => clearTimeout(timer);
  }, [currentFlipCol, flippingRow, flippingGuess, flippingStatuses]);

  // Show modal after game ends (slight delay so last flip finishes)
  useEffect(() => {
    if (gameOver) {
      const t = setTimeout(() => setShowModal(true), 1800);
      return () => clearTimeout(t);
    }
  }, [gameOver]);

  const handleKey = useCallback((key: string) => {
    if (isAnimating || gameOver) return;

    if (key === "Enter") {
      if (currentInput.length !== WORD_LENGTH) {
        setMessage("Not enough letters");
        setShaking(true);
        setTimeout(() => { setShaking(false); setMessage(""); }, 600);
        return;
      }
      if (currentInput !== answer && !VALID_GUESSES.includes(currentInput)) {
        setMessage("Not a valid player name");
        setShaking(true);
        setTimeout(() => { setShaking(false); setMessage(""); }, 600);
        return;
      }

      const rowStatuses = getLetterStatuses(currentInput, answer);
      const rowIndex    = guesses.length;

      setFlippingRow(rowIndex);
      setFlippingGuess(currentInput);
      setFlippingStatuses(rowStatuses);
      setDoneFlipCols(new Set());
      setCurrentFlipCol(0);
      setCurrentInput("");

    } else if (key === "Backspace") {
      setCurrentInput(prev => prev.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key)) {
      setCurrentInput(prev => prev.length < WORD_LENGTH ? prev + key.toLowerCase() : prev);
    }
  }, [currentInput, guesses, isAnimating, gameOver]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if      (e.key === "Enter")     handleKey("Enter");
      else if (e.key === "Backspace") handleKey("Backspace");
      else                            handleKey(e.key);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [handleKey]);

  return (
    <>
      <div className="game-shell">

        <p className="game-subtitle">Guess the player</p>
        <p className="game-prizes-notice">{PRIZES_NOTICE}</p>

        {gameOver && shareDismissed ? <NextPuzzleTimer /> : null}

        {/* Validation only — positioned out of flow so the grid does not jump */}
        <div className="game-validation-layer" aria-live="polite">
          {(message || (won && !shareDismissed)) && (
            <div
              className={`game-validation-toast${won && !shareDismissed ? " game-validation-toast--celebration" : ""}`}
            >
              {won && !shareDismissed ? "🎉 Brilliant!" : message}
            </div>
          )}
        </div>

        {/* GRID */}
        <div className="game-grid">
          {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
            const isCommitted    = rowIndex < guesses.length;
            const isCurrent      = !isAnimating && rowIndex === guesses.length;
            const isThisFlipping = flippingRow === rowIndex;

            return (
              <div
                key={rowIndex}
                className={`game-grid-row${shaking && isCurrent ? " shake" : ""}`}
              >
                {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                  let letter      = "";
                  let bgColor     = "#fff";
                  let borderColor = "#d3d6da";
                  let textColor   = "#000";
                  let tileClass   = "tile game-tile";

                  if (isCommitted) {
                    letter      = guesses[rowIndex][colIndex];
                    bgColor     = STATUS_COLOR[statuses[rowIndex][colIndex]];
                    borderColor = bgColor;
                    textColor   = "#fff";

                  } else if (isThisFlipping) {
                    letter = flippingGuess[colIndex] || "";

                    if (doneFlipCols.has(colIndex)) {
                      bgColor     = STATUS_COLOR[flippingStatuses[colIndex]];
                      borderColor = bgColor;
                      textColor   = "#fff";
                    } else if (colIndex === currentFlipCol) {
                      tileClass   = "tile game-tile flipping";
                      borderColor = "#888";
                    } else {
                      borderColor = "#888";
                    }

                  } else if (isCurrent) {
                    letter      = currentInput[colIndex] || "";
                    borderColor = letter ? "#888" : "#d3d6da";
                    const isJustTyped = colIndex === currentInput.length - 1;
                    if (letter && isJustTyped) tileClass = "tile game-tile pop";
                  }

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}-${doneFlipCols.has(colIndex) && isThisFlipping ? "done" : "anim"}`}
                      className={tileClass}
                      style={{
                        borderColor,
                        backgroundColor: bgColor,
                        color: textColor,
                        "--tile-bg":     isThisFlipping && flippingStatuses[colIndex]
                                           ? STATUS_COLOR[flippingStatuses[colIndex]] : "#fff",
                        "--tile-border": isThisFlipping && flippingStatuses[colIndex]
                                           ? STATUS_COLOR[flippingStatuses[colIndex]] : "#888",
                      } as React.CSSProperties & Record<string, string>}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {(showProgressiveHints || showAnswerReveal) && (
          <div
            className={`game-hint-card${showAnswerReveal ? " game-hint-card--reveal" : ""}`}
            role="status"
          >
            {showAnswerReveal ? (
              <>
                <p className="game-hint-card__label">Answer</p>
                <p className="game-hint-card__text">{displayRevealName}</p>
              </>
            ) : (
              <>
                <p className="game-hint-card__label">{currentHint.label}</p>
                <p className="game-hint-card__text">{currentHint.text}</p>
              </>
            )}
          </div>
        )}

        {/* KEYBOARD */}
        <div className="game-keyboard">
          {["qwertyuiop","asdfghjkl","zxcvbnm"].map((row, i) => (
            <div key={i} className="game-keyboard-row">
              {i === 2 && (
                <button type="button" className="game-key-wide" onClick={() => handleKey("Enter")}>
                  ENTER
                </button>
              )}
              {row.split("").map(l => {
                const s  = letterStatus[l];
                const bg = s === "correct" ? "#6aaa64" : s === "present" ? "#c9b458" : s === "absent" ? "#787c7e" : "#d3d6da";
                return (
                  <button
                    key={l}
                    type="button"
                    className="game-key"
                    onClick={() => handleKey(l)}
                    style={{ background: bg, color: s ? "#fff" : "#000" }}
                  >
                    {l.toUpperCase()}
                  </button>
                );
              })}
              {i === 2 && (
                <button type="button" className="game-key-wide" onClick={() => handleKey("Backspace")}>
                  ⌫
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="game-keyboard-footnote" role="note">
          <p className="game-keyboard-footnote__general">
            Some player names are shortened to fit five letters.
          </p>
          {targetPlayer.meta?.shortened === true ? (
            <p className="game-keyboard-footnote__today">
              <span className="game-keyboard-footnote__full">
                Example: a five-letter answer may be a shortened surname (e.g. &quot;RONAL&quot; for a longer spelling).
              </span>
            </p>
          ) : null}
        </div>

        {/* Manual share button after game ends (before modal auto-opens) */}
        {gameOver && !showModal && (
          <button
            onClick={() => setShowModal(true)}
            style={{
              marginTop: "20px",
              padding: "12px 32px",
              background: "#538d4e",
              color: "#fff",
              border: "none",
              borderRadius: "32px",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Share ↗
          </button>
        )}
      </div>

      {/* Share modal */}
      {showModal && (
        <ShareModal
          won={won}
          answer={answer}
          guessCount={guesses.length}
          statuses={statuses}
          onClose={() => {
            setShowModal(false);
            setShareDismissed(true);
          }}
        />
      )}
    </>
  );
}
