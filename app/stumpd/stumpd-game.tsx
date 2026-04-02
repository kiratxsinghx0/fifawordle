"use client";
import { useState, useEffect, useCallback, useMemo, useSyncExternalStore } from "react";
import ShareModal from "../components/share";
import HowToPlayModal from "../components/how-to-play-modal";
import StumpdHowToPlay from "./stumpd-how-to-play";
import PageHeader, { OPEN_HOW_TO_PLAY_EVENT, OPEN_HINT_HISTORY_EVENT } from "../components/page-header";
import { dispatchHintCountUpdate } from "../components/hint-history-open";
import { COOKIE_CONSENT_STORAGE_KEY } from "../components/cookie-banner";
import NextPuzzleTimer from "../components/timers";
import { iplPlayers, fetchIplPlayersFromAPI, findHint, collectTrivias } from "./ipl-players";
import type { IplPlayerRow } from "./ipl-players";
import { fetchPuzzleToday, triggerAutoSetPuzzle as triggerAutoSet } from "../services/ipl-api";
import type { PuzzleData } from "../services/ipl-api";

/** Optional display metadata when the playable 5-letter token is an abbreviation. */
export type PlayerNameMeta = { shortened: true; fullName: string };

const MAX_HINT_TOKENS = 4;

const HINT_CATEGORIES = [
  { key: "age", label: "Age" },
  { key: "country", label: "Country" },
  { key: "iplTeam", label: "IPL Team" },
  { key: "role", label: "Role" },
  { key: "teams", label: "Teams" },
  { key: "batting", label: "Batting" },
  { key: "bowling", label: "Bowling" },
  { key: "trivia", label: "Trivia" },
] as const;

const LS_HOW_TO_PLAY_DISMISSED = "stumpdpuzzle_howToPlayDismissed";
const LS_HOW_TO_PLAY_SEEN = "stumpdpuzzle_howToPlaySeen";

function readReturningUserHintEligible(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) !== "accepted") return false;
    if (localStorage.getItem(LS_HOW_TO_PLAY_SEEN) === "true") return true;
    if (localStorage.getItem(LS_HOW_TO_PLAY_DISMISSED) === "1") return true;
    return false;
  } catch {
    return false;
  }
}

type IplHintEntry = Record<string, unknown>;

function resolvePlayerByName(token: string, playerList: IplPlayerRow[]): IplPlayerRow | null {
  const normalized = token.trim().toLowerCase();
  return playerList.find((p) => p.name.toLowerCase() === normalized) ?? null;
}

function isSamePlayer(guess: string, answer: string, playerList: IplPlayerRow[]): boolean {
  if (guess === answer) return true;
  const gp = resolvePlayerByName(guess, playerList);
  const ap = resolvePlayerByName(answer, playerList);
  if (!gp || !ap) return false;
  return !!gp.meta.fullName && gp.meta.fullName === ap.meta.fullName;
}

const MAX_GUESSES  = 6;
const WORD_LENGTH  = 5;

const ENCODE_KEY = "fw26k";

function xorDecode(encoded: string, key: string): string {
  const raw = atob(encoded);
  let result = "";
  for (let i = 0; i < raw.length; i++) {
    result += String.fromCharCode(raw.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

const LS_PUZZLE_CACHE_KEY = "stumpdpuzzle_cache";

/** 6 AM IST = 00:30 UTC */
function isPuzzleBeforeTodayCutoff(setAt: string): boolean {
  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setUTCHours(0, 30, 0, 0);
  if (now < cutoff) {
    cutoff.setUTCDate(cutoff.getUTCDate() - 1);
  }
  return new Date(setAt) < cutoff;
}

function readCachedPuzzle(): PuzzleData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_PUZZLE_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PuzzleData;
  } catch {
    return null;
  }
}

function cachePuzzle(data: PuzzleData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_PUZZLE_CACHE_KEY, JSON.stringify(data));
  } catch { /* quota / private mode */ }
}

async function ensureFreshPuzzle(): Promise<PuzzleData> {
  const cached = readCachedPuzzle();

  if (cached?.setAt && !isPuzzleBeforeTodayCutoff(cached.setAt)) {
    return fetchPuzzleToday();
  }

  let puzzle: PuzzleData;
  try {
    puzzle = await fetchPuzzleToday();
  } catch {
    await triggerAutoSet();
    return fetchPuzzleToday();
  }

  if (puzzle.setAt && isPuzzleBeforeTodayCutoff(puzzle.setAt)) {
    await triggerAutoSet();
    return fetchPuzzleToday();
  }

  return puzzle;
}

const FLIP_DURATION = 340;
const FLIP_STAGGER  = 80;

/** Win row: staggered tile bounce (left → right), then “Genius” toast above the grid */
const WIN_BOUNCE_STAGGER_MS = 100;
const WIN_BOUNCE_DURATION_MS = 450;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

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

const LS_GAME_ID_KEY = "stumpdpuzzle_gameId";

const LS_GUESS_KEY = "stumpdpuzzle_guess";
const LS_USER_HAS_PLAYED_KEY = "stumpdpuzzle_userHasPlayed";
const LS_USER_HAS_PLAYED_VALUE = "yes";
const LS_PUZZLE_ID_KEY = "stumpdpuzzle_puzzleId";
const LS_SHARE_DISMISSED_PUZZLE_KEY = "stumpdpuzzle_shareDismissedPuzzleId";
const LS_UNLOCKED_HINTS_KEY = "stumpdpuzzle_unlockedHints";
const LS_TIMER_ELAPSED_KEY = "stumpdpuzzle_timerElapsed";
const LS_TIMER_STARTED_KEY = "stumpdpuzzle_timerStarted";
const LS_HINT_TOKENS_KEY = "stumpdpuzzle_hintTokensRemaining";
const LS_CHOSEN_HINTS_KEY = "stumpdpuzzle_chosenHints2";
const LS_USED_CATEGORIES_KEY = "stumpdpuzzle_usedCategories";
const LS_USED_TRIVIA_KEY = "stumpdpuzzle_usedTriviaIndices";
const LS_TOKEN_USED_GUESS_KEY = "stumpdpuzzle_tokenUsedForGuess";

const GAME_STORAGE_KEYS = [
  LS_GUESS_KEY,
  LS_USER_HAS_PLAYED_KEY,
  LS_PUZZLE_ID_KEY,
  LS_SHARE_DISMISSED_PUZZLE_KEY,
  LS_UNLOCKED_HINTS_KEY,
  LS_TIMER_ELAPSED_KEY,
  LS_TIMER_STARTED_KEY,
  LS_HINT_TOKENS_KEY,
  LS_CHOSEN_HINTS_KEY,
  LS_USED_CATEGORIES_KEY,
  LS_USED_TRIVIA_KEY,
  LS_TOKEN_USED_GUESS_KEY,
] as const;

/** ── Persistent stats (survive across puzzles) ── */
const LS_STATS_KEY = "stumpdpuzzle_stats";

export type GameStats = {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
};

const DEFAULT_STATS: GameStats = { gamesPlayed: 0, gamesWon: 0, currentStreak: 0, maxStreak: 0 };

function readStats(): GameStats {
  if (typeof window === "undefined") return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(LS_STATS_KEY);
    if (!raw) return DEFAULT_STATS;
    return { ...DEFAULT_STATS, ...(JSON.parse(raw) as Partial<GameStats>) };
  } catch {
    return DEFAULT_STATS;
  }
}

function persistStats(stats: GameStats): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_STATS_KEY, JSON.stringify(stats));
  } catch { /* quota / private mode */ }
}

/** Key that tracks whether stats were already recorded for a given game id. */
const LS_STATS_RECORDED_KEY = "stumpdpuzzle_statsRecordedGameId";

function recordGameResult(won: boolean, gameId: string): GameStats {
  const prev = readStats();
  const alreadyRecorded =
    typeof window !== "undefined" &&
    localStorage.getItem(LS_STATS_RECORDED_KEY) === gameId;
  if (alreadyRecorded) return prev;

  const next: GameStats = {
    gamesPlayed: prev.gamesPlayed + 1,
    gamesWon: prev.gamesWon + (won ? 1 : 0),
    currentStreak: won ? prev.currentStreak + 1 : 0,
    maxStreak: won
      ? Math.max(prev.maxStreak, prev.currentStreak + 1)
      : prev.maxStreak,
  };
  persistStats(next);
  try { localStorage.setItem(LS_STATS_RECORDED_KEY, gameId); } catch { /* */ }
  return next;
}

/**
 * If persisted `gameId` matches `CURRENT_GAME_ID`, keep game data. Otherwise clear game-related keys
 * and persist the new id (new puzzle / first visit).
 */
function syncGameIdStorage(gameId: string): void {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(LS_GAME_ID_KEY);
    if (stored === gameId) return;
    for (const key of GAME_STORAGE_KEYS) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(LS_GAME_ID_KEY, gameId);
  } catch {
    /* quota / private mode */
  }
}

function persistShareDismissed(puzzleId: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_SHARE_DISMISSED_PUZZLE_KEY, puzzleId);
  } catch {
    /* quota / private mode */
  }
}

function readShareDismissedForPuzzle(puzzleId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(LS_SHARE_DISMISSED_PUZZLE_KEY) === puzzleId;
  } catch {
    return false;
  }
}

function parseGuessObject(raw: string, targetAnswer: string, playerList: IplPlayerRow[]): { guesses: string[]; statuses: string[][] } | null {
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
    const isAlias = g !== targetAnswer && isSamePlayer(g, targetAnswer, playerList);
    statuses.push(isAlias ? Array(WORD_LENGTH).fill("correct") : getLetterStatuses(g, targetAnswer));
  }
  if (guesses.length === 0) return null;
  return { guesses, statuses };
}

/**
 * Restore when `userHasPlayed` is "yes".
 * `puzzleId` is only written after the game ends (win or 6 guesses); until then it is absent and we still restore in-progress boards.
 * If `puzzleId` is present, it must match `PLAYER_TO_GUESS` (finished game for this puzzle).
 */
function readStoredGuesses(puzzleId: string, targetAnswer: string, playerList: IplPlayerRow[]): { guesses: string[]; statuses: string[][] } | null {
  if (typeof window === "undefined") return null;
  try {
    if (localStorage.getItem(LS_USER_HAS_PLAYED_KEY) !== "yes") return null;
    const storedPuzzleId = localStorage.getItem(LS_PUZZLE_ID_KEY);
    if (storedPuzzleId != null && storedPuzzleId !== "") {
      if (storedPuzzleId !== puzzleId) return null;
    }
    const raw = localStorage.getItem(LS_GUESS_KEY);
    if (!raw) return null;
    return parseGuessObject(raw, targetAnswer, playerList);
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
  playerList: IplPlayerRow[],
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
    const won = isSamePlayer(word, targetAnswer, playerList);
    const gameOver = won || guessIndex1Based === MAX_GUESSES;
    if (gameOver) {
      localStorage.setItem(LS_PUZZLE_ID_KEY, puzzleId);
    }
  } catch {
    /* quota / private mode */
  }
}

function persistUnlockedHints(hints: { label: string; text: string }[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_UNLOCKED_HINTS_KEY, JSON.stringify(hints));
  } catch { /* quota / private mode */ }
}

function readUnlockedHints(): { label: string; text: string }[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_UNLOCKED_HINTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as { label: string; text: string }[];
  } catch {
    return [];
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

/** Matches globals.css `.game-shell--xs|sm|md` — tighter shell on smaller phones, more padding on larger (≤480px). */
function gameShellViewportClassSnapshot(): "" | "game-shell--xs" | "game-shell--sm" | "game-shell--md" {
  if (typeof window === "undefined") return "";
  const w = window.innerWidth;
  if (w <= 360) return "game-shell--xs";
  if (w <= 400) return "game-shell--sm";
  if (w <= 480) return "game-shell--md";
  return "";
}

function subscribeGameShellViewport(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("resize", onChange, { passive: true });
  return () => window.removeEventListener("resize", onChange);
}

function useGameShellViewportClass(): string {
  return useSyncExternalStore(subscribeGameShellViewport, gameShellViewportClassSnapshot, () => "");
}

function formatGameTimer(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function Game() {
  const shellVpClass = useGameShellViewportClass();

  const [puzzleData, setPuzzleData] = useState<PuzzleData | null>(null);

  useEffect(() => {
    const cached = readCachedPuzzle();
    if (cached?.setAt && !isPuzzleBeforeTodayCutoff(cached.setAt)) setPuzzleData(cached);

    ensureFreshPuzzle()
      .then((fresh) => {
        cachePuzzle(fresh);
        setPuzzleData((prev) => {
          if (prev && prev.day === fresh.day) return prev;
          return fresh;
        });
      })
      .catch(() => {});
  }, []);

  const playerToGuess = puzzleData
    ? xorDecode(puzzleData.encoded, ENCODE_KEY).toUpperCase()
    : "";
  const currentGameId = puzzleData ? String(puzzleData.day) : "";

  const [currentInput,  setCurrentInput]  = useState("");
  const [guesses,       setGuesses]       = useState<string[]>([]);
  const [statuses,      setStatuses]      = useState<string[][]>([]);
  const [letterStatus,  setLetterStatus]  = useState<Record<string, string>>({});
  const [shaking,       setShaking]       = useState(false);
  const [message,       setMessage]       = useState("");
  const [showModal,     setShowModal]     = useState(false);
  const [showHowToPlay, setShowHowToPlay]  = useState(false);
  const [showHintChooser, setShowHintChooser] = useState(false);
  const [shareDismissed, setShareDismissed] = useState(false);
  /** Cookie accepted + how to play seen — enables initial trivia before first guess (client-read). */
  const [returningUserHints, setReturningUserHints] = useState(false);
  const [hintTokens, setHintTokens] = useState(MAX_HINT_TOKENS);
  const [chosenHints, setChosenHints] = useState<{ label: string; text: string }[]>([]);
  const [usedCategories, setUsedCategories] = useState<string[]>([]);
  const [usedTriviaIndices, setUsedTriviaIndices] = useState<number[]>([]);
  const [tokenUsedForGuess, setTokenUsedForGuess] = useState(0);
  const [stats, setStats] = useState<GameStats>(DEFAULT_STATS);
  const [timerStarted, setTimerStarted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [cookieConsentDone, setCookieConsentDone] = useState(false);
  const [howToPlayDone, setHowToPlayDone] = useState(false);
  const [aliasWin, setAliasWin] = useState(false);

  const [playerList, setPlayerList] = useState<IplPlayerRow[]>(iplPlayers);

  useEffect(() => {
    fetchIplPlayersFromAPI()
      .then((data) => setPlayerList(data))
      .catch(() => {});
  }, []);

  const validGuesses = useMemo(
    () => playerList.map((p) => p.name.toLowerCase()),
    [playerList]
  );

  const targetPlayer = useMemo(
    () => playerToGuess ? resolvePlayerByName(playerToGuess, playerList) : null,
    [playerList, playerToGuess]
  );

  const inputLocked = !puzzleData || !targetPlayer || !cookieConsentDone || !howToPlayDone;

  const answer = targetPlayer?.name.toLowerCase() ?? "";
  const nameNotice =
    targetPlayer?.meta?.shortened === true && targetPlayer.meta.fullName
      ? targetPlayer.meta.fullName
      : null;

  useEffect(() => {
    setReturningUserHints(readReturningUserHintEligible());
    setStats(readStats());

    let consentDone = false;
    let rejected = false;
    try {
      const v = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
      if (v === "accepted" || v === "rejected") {
        setCookieConsentDone(true);
        consentDone = true;
        rejected = v === "rejected";
      }
    } catch { /* */ }

    try {
      if (rejected || localStorage.getItem(LS_HOW_TO_PLAY_DISMISSED) === "1") {
        setHowToPlayDone(true);
      } else if (consentDone) {
        setShowHowToPlay(true);
      }
    } catch { /* */ }
  }, []);

  const dismissHowToPlay = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(LS_HOW_TO_PLAY_DISMISSED, "1");
        localStorage.setItem(LS_HOW_TO_PLAY_SEEN, "true");
      }
    } catch {
      /* quota / private mode */
    }
    setShowHowToPlay(false);
    setHowToPlayDone(true);
    setReturningUserHints(readReturningUserHintEligible());
  }, []);

  /** Mark how-to-play seen on cookie accept so returning-user trivia hint works. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "accepted") {
        localStorage.setItem(LS_HOW_TO_PLAY_SEEN, "true");
      }
    } catch { /* */ }

    const onCookieConsent = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === "accepted" || detail === "rejected") {
        setCookieConsentDone(true);
        if (detail === "rejected") {
          setHowToPlayDone(true);
        } else {
          try {
            if (localStorage.getItem(LS_HOW_TO_PLAY_DISMISSED) !== "1") {
              setTimeout(() => setShowHowToPlay(true), 450);
            }
          } catch { /* */ }
        }
      }
      if (detail !== "accepted") return;
      try { localStorage.setItem(LS_HOW_TO_PLAY_SEEN, "true"); } catch { /* */ }
      setReturningUserHints(readReturningUserHintEligible());
    };
    window.addEventListener("cookie-consent", onCookieConsent);
    return () => window.removeEventListener("cookie-consent", onCookieConsent);
  }, []);

  /** Header help button opens How to play without waiting for first-visit flow. */
  useEffect(() => {
    const onOpenFromHeader = () => setShowHowToPlay(true);
    window.addEventListener(OPEN_HOW_TO_PLAY_EVENT, onOpenFromHeader);
    return () => window.removeEventListener(OPEN_HOW_TO_PLAY_EVENT, onOpenFromHeader);
  }, []);

  /** Header hint button opens hint chooser modal. */
  useEffect(() => {
    const onOpenHints = () => setShowHintChooser(true);
    window.addEventListener(OPEN_HINT_HISTORY_EVENT, onOpenHints);
    return () => window.removeEventListener(OPEN_HINT_HISTORY_EVENT, onOpenHints);
  }, []);

  useEffect(() => {
    if (!showHintChooser) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShowHintChooser(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showHintChooser]);

  // Animation state
  const [flippingRow,      setFlippingRow]      = useState<number | null>(null);
  const [flippingGuess,    setFlippingGuess]    = useState("");
  const [flippingStatuses, setFlippingStatuses] = useState<string[]>([]);
  const [currentFlipCol,   setCurrentFlipCol]   = useState(-1);
  const [doneFlipCols,     setDoneFlipCols]     = useState<Set<number>>(new Set());
  /** Row index (0-based) whose committed tiles play the win bounce; cleared after toast exits */
  const [winBounceRow, setWinBounceRow] = useState<number | null>(null);

  const isAnimating = flippingRow !== null;
  const won      = guesses.length > 0 && isSamePlayer(guesses[guesses.length - 1], answer, playerList);
  const lost     = !won && guesses.length === MAX_GUESSES;
  const gameOver = won || lost;

  const wrongGuessCount = guesses.filter((g) => !isSamePlayer(g, answer, playerList)).length;

  const playerHints: IplHintEntry[] = targetPlayer?.hints ?? [];

  const showOpeningHint = !!targetPlayer && guesses.length === 0;
  const showTokenBox = !!targetPlayer && wrongGuessCount >= 1 && !won && !lost && !(gameOver && shareDismissed);
  const showHintSlot = showOpeningHint || showTokenBox;

  const displayRevealName =
    targetPlayer?.meta?.fullName ??
    `${answer.charAt(0).toUpperCase()}${answer.slice(1).toLowerCase()}`;

  const openingHintText = String(findHint(playerHints, "openingHint") ?? "");
  const canChooseHint = hintTokens > 0 && wrongGuessCount > 0 && tokenUsedForGuess < wrongGuessCount;

  const allUnlockedHints: { label: string; text: string }[] = [
    { label: "Opening Clue", text: openingHintText },
    ...chosenHints,
  ];

  useEffect(() => {
    persistUnlockedHints(allUnlockedHints);
    dispatchHintCountUpdate(allUnlockedHints.length);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenHints.length]);

  const MAX_TRIVIA_PICKS = 2;
  const triviaPickCount = usedCategories.filter(k => k === "trivia").length;
  const isTriviaExhausted = triviaPickCount >= MAX_TRIVIA_PICKS || usedTriviaIndices.length >= collectTrivias(playerHints).length;

  const handleSelectHint = useCallback((categoryKey: string) => {
    if (hintTokens <= 0 || wrongGuessCount <= 0) return;
    if (tokenUsedForGuess >= wrongGuessCount) return;

    const isTrivia = categoryKey === "trivia";
    if (!isTrivia && usedCategories.includes(categoryKey)) return;
    if (isTrivia) {
      const picks = usedCategories.filter(k => k === "trivia").length;
      if (picks >= MAX_TRIVIA_PICKS) return;
    }

    let text = "";
    if (isTrivia) {
      const trivias = collectTrivias(playerHints);
      const available = trivias.map((_, i) => i).filter(i => !usedTriviaIndices.includes(i));
      if (available.length === 0) return;
      const randomIdx = available[Math.floor(Math.random() * available.length)];
      text = trivias[randomIdx];
      const newUsedTrivia = [...usedTriviaIndices, randomIdx];
      setUsedTriviaIndices(newUsedTrivia);
      try { localStorage.setItem(LS_USED_TRIVIA_KEY, JSON.stringify(newUsedTrivia)); } catch { /* */ }
    } else if (categoryKey === "teams") {
      const teams = findHint<string[]>(playerHints, categoryKey) ?? [];
      text = teams.join(", ");
    } else {
      const val = findHint(playerHints, categoryKey);
      text = val != null ? String(val) : "";
    }

    const label = HINT_CATEGORIES.find(c => c.key === categoryKey)!.label;
    const newChosenHints = [...chosenHints, { label, text }];
    const newUsedCats = [...usedCategories, categoryKey];
    const newTokens = hintTokens - 1;

    setChosenHints(newChosenHints);
    setUsedCategories(newUsedCats);
    setHintTokens(newTokens);
    setTokenUsedForGuess(wrongGuessCount);

    try {
      localStorage.setItem(LS_CHOSEN_HINTS_KEY, JSON.stringify(newChosenHints));
      localStorage.setItem(LS_USED_CATEGORIES_KEY, JSON.stringify(newUsedCats));
      localStorage.setItem(LS_HINT_TOKENS_KEY, String(newTokens));
      localStorage.setItem(LS_TOKEN_USED_GUESS_KEY, String(wrongGuessCount));
    } catch { /* */ }
  }, [hintTokens, wrongGuessCount, tokenUsedForGuess, usedCategories, playerHints, usedTriviaIndices, chosenHints]);

  useEffect(() => {
    if (!playerToGuess || !currentGameId) return;
    syncGameIdStorage(currentGameId);

    // Reset React state first — prevents stale guesses from a previous puzzle
    setGuesses([]);
    setStatuses([]);
    setLetterStatus({});
    setCurrentInput("");
    setShareDismissed(false);
    setShowModal(false);
    setTimerStarted(false);
    setElapsedSeconds(0);
    setHintTokens(MAX_HINT_TOKENS);
    setChosenHints([]);
    setUsedCategories([]);
    setUsedTriviaIndices([]);
    setTokenUsedForGuess(0);

    try {
      const savedElapsed = localStorage.getItem(LS_TIMER_ELAPSED_KEY);
      if (savedElapsed) setElapsedSeconds(parseInt(savedElapsed, 10) || 0);
      if (localStorage.getItem(LS_TIMER_STARTED_KEY) === "1") setTimerStarted(true);
      const savedTokens = localStorage.getItem(LS_HINT_TOKENS_KEY);
      if (savedTokens != null) setHintTokens(parseInt(savedTokens, 10));
      const savedChosen = localStorage.getItem(LS_CHOSEN_HINTS_KEY);
      if (savedChosen) setChosenHints(JSON.parse(savedChosen));
      const savedCats = localStorage.getItem(LS_USED_CATEGORIES_KEY);
      if (savedCats) setUsedCategories(JSON.parse(savedCats));
      const savedTrivia = localStorage.getItem(LS_USED_TRIVIA_KEY);
      if (savedTrivia) setUsedTriviaIndices(JSON.parse(savedTrivia));
      const savedTokenGuess = localStorage.getItem(LS_TOKEN_USED_GUESS_KEY);
      if (savedTokenGuess != null) setTokenUsedForGuess(parseInt(savedTokenGuess, 10));
    } catch { /* */ }

    const loaded = readStoredGuesses(currentGameId, answer, playerList);
    if (!loaded) return;
    const last = loaded.guesses[loaded.guesses.length - 1];
    const wasStoredWin = isSamePlayer(last, answer, playerList);
    const gameDone = wasStoredWin || loaded.guesses.length === MAX_GUESSES;
    const dismissedShare = gameDone && readShareDismissedForPuzzle(currentGameId);
    setGuesses(loaded.guesses);
    setStatuses(loaded.statuses);
    setLetterStatus(letterStatusFromRows(loaded.guesses, loaded.statuses));
    if (dismissedShare) setShareDismissed(true);
    if (wasStoredWin && last !== answer) setAliasWin(true);
  }, [playerToGuess, currentGameId, answer, playerList]);

  useEffect(() => {
    if (!timerStarted || gameOver) return;
    const id = setInterval(() => {
      setElapsedSeconds(prev => {
        const next = prev + 1;
        try { localStorage.setItem(LS_TIMER_ELAPSED_KEY, String(next)); } catch { /* */ }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerStarted, gameOver]);

  // Per-tile flip sequencer
  useEffect(() => {
    if (currentFlipCol < 0 || flippingRow === null) return;

    const timer = setTimeout(() => {
      setDoneFlipCols(prev => new Set([...prev, currentFlipCol]));

      if (currentFlipCol < WORD_LENGTH - 1) {
        setCurrentFlipCol(currentFlipCol + 1);
      } else {
        const guess    = flippingGuess;
        const completedRowIndex = flippingRow ?? 0;
        persistGuess(currentGameId, completedRowIndex + 1, guess, answer, playerList);

        const justWon = isSamePlayer(guess, answer, playerList);
        const isAlias = justWon && guess !== answer;
        const rowStats = isAlias
          ? Array(WORD_LENGTH).fill("correct") as string[]
          : flippingStatuses;

        if (isAlias) setAliasWin(true);

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

        const justLost = !justWon && completedRowIndex + 1 === MAX_GUESSES;
        if (justWon || justLost) {
          setStats(recordGameResult(justWon, currentGameId));
        }

        if (justWon && !prefersReducedMotion()) {
          setWinBounceRow(completedRowIndex);
        }
      }
    }, FLIP_DURATION + FLIP_STAGGER);

    return () => clearTimeout(timer);
  }, [currentFlipCol, flippingRow, flippingGuess, flippingStatuses]);

  // Clear win bounce class after animation completes
  useEffect(() => {
    if (winBounceRow === null) return;
    const clearDelay =
      (WORD_LENGTH - 1) * WIN_BOUNCE_STAGGER_MS + WIN_BOUNCE_DURATION_MS;
    const t = window.setTimeout(() => setWinBounceRow(null), clearDelay);
    return () => clearTimeout(t);
  }, [winBounceRow]);

  // Show modal after game ends (slight delay so last flip finishes); not if share already dismissed (e.g. reload)
  useEffect(() => {
    if (gameOver && !shareDismissed) {
      const t = setTimeout(() => setShowModal(true), 1800);
      return () => clearTimeout(t);
    }
  }, [gameOver, shareDismissed]);

  const handleKey = useCallback((key: string) => {
    if (inputLocked || isAnimating || gameOver) return;

    if (key === "Enter") {
      if (currentInput.length !== WORD_LENGTH) {
        setMessage("Not enough letters");
        setShaking(true);
        setTimeout(() => { setShaking(false); setMessage(""); }, 600);
        return;
      }
      if (currentInput !== answer && !validGuesses.includes(currentInput)) {
        setMessage("Not a valid player name");
        setShaking(true);
        setTimeout(() => { setShaking(false); setMessage(""); }, 600);
        return;
      }

      const isAliasGuess = currentInput !== answer && isSamePlayer(currentInput, answer, playerList);
      const rowStatuses = isAliasGuess
        ? Array(WORD_LENGTH).fill("correct") as string[]
        : getLetterStatuses(currentInput, answer);
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
      if (!timerStarted) {
        setTimerStarted(true);
        try { localStorage.setItem(LS_TIMER_STARTED_KEY, "1"); } catch { /* */ }
      }
      setCurrentInput(prev => prev.length < WORD_LENGTH ? prev + key.toLowerCase() : prev);
    }
  }, [currentInput, guesses, isAnimating, gameOver, timerStarted, inputLocked, answer, validGuesses]);

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
      <div className="game-page__content">
        <PageHeader timerDisplay={formatGameTimer(elapsedSeconds)} logoSrc="/stumpd-logo.png" logoAlt="Stumpd" />
        <div className={shellVpClass ? `game-shell ${shellVpClass}` : "game-shell"}>

        <div className="game-shell__top">
          <p className="game-subtitle">Guess the player</p>
          {gameOver && shareDismissed ? <NextPuzzleTimer /> : null}
        </div>

        {/* Validation only — positioned out of flow so the grid does not jump */}
        <div className="game-validation-layer" aria-live="polite">
          {message ? (
            <div className="game-validation-toast">{message}</div>
          ) : null}
        </div>

        <div className="game-grid-wrap">
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
                    if (winBounceRow === rowIndex) {
                      tileClass = "tile game-tile game-tile--win-bounce";
                    }

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
                        ...(winBounceRow === rowIndex && isCommitted
                          ? { "--win-bounce-index": String(colIndex) }
                          : {}),
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
        </div>

        <div
          className={`game-hint-slot${showHintSlot ? " game-hint-slot--active" : ""}`}
          aria-live="polite"
        >
          {showHintSlot ? (
            showOpeningHint ? (
              <div className="game-hint-card" role="status">
                <div className="game-hint-card__content game-hint-card__content--enter">
                  <p className="game-hint-card__label">Clue</p>
                  <p className="game-hint-card__text">{openingHintText}</p>
                </div>
              </div>
            ) : showTokenBox ? (
              <button
                type="button"
                className={`game-hint-token-box${canChooseHint && !showHintChooser ? " game-hint-token-box--nudge" : ""}`}
                onClick={() => setShowHintChooser(true)}
              >
                <span className="game-hint-token-box__icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21h6M12 3a6 6 0 0 0-6 6c0 2.1 1.1 3.8 2.5 5 .7.6 1.2 1.5 1.5 2.5h4c.3-1 .8-1.9 1.5-2.5C16.9 12.8 18 11.1 18 9a6 6 0 0 0-6-6z" /></svg>
                </span>
                <span className="game-hint-token-box__label">
                  {canChooseHint ? "Choose a Hint" : hintTokens > 0 ? "View Hints" : "No Tokens Left"}
                </span>
                <span className="game-hint-token-box__tokens">{hintTokens}/{MAX_HINT_TOKENS}</span>
              </button>
            ) : null
          ) : null}
        </div>

        <div className="game-keyboard-footnote" role="note">
          <p className="game-keyboard-footnote__general">
            Some player names are shortened to fit 5 letters. Example: YUVRAJ → YUVRA
          </p>
        </div>
        </div>
      </div>

      {gameOver && !isAnimating ? (
        <div className="game-page__see-results">
          <div className={`game-result-notice${won ? " game-result-notice--won" : " game-result-notice--lost"}`} role="status">
            <p className="game-result-notice__name">
              {won ? "🎉 " : ""}<strong>{displayRevealName}</strong>
            </p>
            {aliasWin && (
              <p className="game-result-notice__alias">
                You guessed it from hints! The word was <strong>{answer.toUpperCase()}</strong>
              </p>
            )}
            {!won && (
              <p className="game-result-notice__alias">
                The word was <strong>{answer.toUpperCase()}</strong>
              </p>
            )}
          </div>
          <button
            type="button"
            className="see-results-btn"
            onClick={() => setShowModal(true)}
          >
            See Results
          </button>
        </div>
      ) : (
      <div className="game-page__keyboard">
        {/* KEYBOARD — structure aligned with NYT Wordle (row + half-key spacers on middle row) */}
        <div className="game-keyboard" role="group" aria-label="Keyboard">
          <div className="game-keyboard-row game-keyboard-row--top">
            {"qwertyuiop".split("").map(l => {
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
          </div>
          <div className="game-keyboard-row game-keyboard-row--middle">
            <div className="game-keyboard-spacer" aria-hidden="true" />
            {"asdfghjkl".split("").map(l => {
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
            <div className="game-keyboard-spacer" aria-hidden="true" />
          </div>
          <div className="game-keyboard-row game-keyboard-row--bottom">
            <button type="button" className="game-key game-key-wide" onClick={() => handleKey("Enter")}>
              ENTER
            </button>
            {"zxcvbnm".split("").map(l => {
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
            <button type="button" className="game-key game-key-wide" onClick={() => handleKey("Backspace")}>
              ⌫
            </button>
          </div>
        </div>
      </div>
      )}

      {showHintChooser ? (
        <div className="hint-chooser-root">
          <div className="hint-chooser-backdrop" onClick={() => setShowHintChooser(false)} role="presentation" aria-hidden />
          <div className="hint-chooser-card" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="hint-chooser-close" onClick={() => setShowHintChooser(false)} aria-label="Close">✕</button>

            <div className="hint-chooser-header">
              <h2 className="hint-chooser-title">Hints</h2>
              <div className="hint-chooser-token-counter">
                {Array.from({ length: MAX_HINT_TOKENS }).map((_, i) => (
                  <span key={i} className={`hint-chooser-token-dot${i < hintTokens ? " hint-chooser-token-dot--filled" : ""}`} />
                ))}
                <span className="hint-chooser-token-text">{hintTokens}/{MAX_HINT_TOKENS}</span>
              </div>
            </div>

            <div className="hint-chooser-unlocked">
              <div className="hint-chooser-hint-row">
                <span className="hint-chooser-hint-label">Opening Clue</span>
                <span className="hint-chooser-hint-text">{openingHintText}</span>
              </div>
              {chosenHints.map((h, i) => (
                <div key={i} className="hint-chooser-hint-row hint-chooser-hint-row--chosen">
                  <span className="hint-chooser-hint-label">{h.label}</span>
                  <span className="hint-chooser-hint-text">{h.text}</span>
                </div>
              ))}
              {lost && !isAnimating && (
                <div className="hint-chooser-hint-row hint-chooser-hint-row--answer">
                  <span className="hint-chooser-hint-label">Answer</span>
                  <span className="hint-chooser-hint-text">{displayRevealName}</span>
                </div>
              )}
            </div>

            {!gameOver && (
              <div className="hint-chooser-menu">
                <p className="hint-chooser-menu-label">
                  {canChooseHint
                    ? "Choose a hint to reveal" 
                    : hintTokens > 0
                      ? "Make another guess to unlock a hint"
                      : "No tokens remaining"}
                </p>
                <p className="hint-chooser-menu-sublabel">Hints are based on the player you&apos;re guessing</p>
                <div className="hint-chooser-menu-grid">
                  {HINT_CATEGORIES.map((cat) => {
                    const isTrivia = cat.key === "trivia";
                    const isUsed = isTrivia ? isTriviaExhausted : usedCategories.includes(cat.key);
                    const isDisabled = isUsed || !canChooseHint;
                    return (
                      <button
                        key={cat.key}
                        type="button"
                        className={`hint-chooser-cat-btn${isUsed ? " hint-chooser-cat-btn--used" : ""}${isDisabled && !isUsed ? " hint-chooser-cat-btn--locked" : ""}`}
                        disabled={isDisabled}
                        onClick={() => handleSelectHint(cat.key)}
                      >
                        {cat.label}
                        {isTrivia && triviaPickCount > 0 && !isTriviaExhausted ? (
                          <span className="hint-chooser-cat-count" aria-hidden>{triviaPickCount}/{MAX_TRIVIA_PICKS}</span>
                        ) : null}
                        {isUsed ? <span className="hint-chooser-cat-check" aria-hidden>✓</span> : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      <HowToPlayModal open={showHowToPlay} onClose={dismissHowToPlay}>
        <StumpdHowToPlay />
      </HowToPlayModal>

      {/* Share modal */}
      {showModal && (
        <ShareModal
          won={won}
          answer={targetPlayer?.meta?.fullName ?? answer}
          guessCount={guesses.length}
          statuses={statuses}
          stats={stats}
          elapsedSeconds={elapsedSeconds}
          gameTitle="Stumpd"
          puzzleDay={puzzleData?.day}
          hintsUsed={MAX_HINT_TOKENS - hintTokens}
          maxHints={MAX_HINT_TOKENS}
          onClose={() => {
            setShowModal(false);
            setShareDismissed(true);
            persistShareDismissed(currentGameId);
          }}
        />
      )}
    </>
  );
}
