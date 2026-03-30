"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
  useState,
  type AnimationEvent,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import { dispatchOpenHowToPlay } from "./how-to-play-open";

const kylogBrand = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

type Props = {
  open: boolean;
  onClose: () => void;
  /** When false, "How to play" goes to /how-to-play (no in-page modal listener). */
  showHowToPlay?: boolean;
};

const noopSubscribe = () => () => {};

const EXIT_FALLBACK_MS = 420;

export default function LeftSidebar({
  open,
  onClose,
  showHowToPlay = true,
}: Props) {
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitFallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Keep mounted through close so exit animations can run (see globals.css leftSidebarSlideOut). */
  /* eslint-disable react-hooks/set-state-in-effect -- prop-driven drawer: stay mounted until slide-out ends */
  useEffect(() => {
    if (open) {
      setMounted(true);
      setExiting(false);
    } else if (mounted) {
      setExiting(true);
    }
  }, [open, mounted]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted || exiting) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, exiting, onClose]);

  const finishExit = useCallback(() => {
    if (exitFallbackRef.current) {
      clearTimeout(exitFallbackRef.current);
      exitFallbackRef.current = null;
    }
    setMounted(false);
    setExiting(false);
  }, []);

  const handlePanelAnimationEnd = useCallback(
    (e: AnimationEvent<HTMLElement>) => {
      if (e.target !== e.currentTarget) return;
      if (open) return;
      if (!e.animationName.includes("leftSidebarSlideOut")) return;
      finishExit();
    },
    [open, finishExit],
  );

  useEffect(() => {
    if (!exiting || open) return;
    exitFallbackRef.current = setTimeout(() => {
      finishExit();
    }, EXIT_FALLBACK_MS);
    return () => {
      if (exitFallbackRef.current) clearTimeout(exitFallbackRef.current);
    };
  }, [exiting, open, finishExit]);

  if (!isClient || !mounted) return null;

  const rootClass = exiting ? "left-sidebar-root left-sidebar-root--exiting" : "left-sidebar-root";

  return createPortal(
    <div className={rootClass}>
      <div
        className="left-sidebar-backdrop"
        onClick={onClose}
        role="presentation"
        aria-hidden
      />
      <aside
        id="left-sidebar-panel"
        className="left-sidebar-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="kylog-games-heading"
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={handlePanelAnimationEnd}
      >
        <div className="left-sidebar-header">
          <button
            type="button"
            className="left-sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="left-sidebar-brand">
            <Image
              className="left-sidebar-brand-logo left-sidebar-brand-logo--kylog"
              src="/kylog-games-logo.png"
              alt=""
              width={1024}
              height={1024}
              sizes="48px"
            />
            <h2
              id="kylog-games-heading"
              className={`left-sidebar-title ${kylogBrand.className}`}
            >
              Kylog games
            </h2>
          </div>
        </div>
        <nav className="left-sidebar-nav" aria-label="Site">
          <Link
            href="/"
            className="left-sidebar-link left-sidebar-link--with-icon"
            onClick={onClose}
          >
            <span className="left-sidebar-nav-logo-wrap" aria-hidden>
              <Image
                className="left-sidebar-nav-icon"
                src="/fifa-wordle-logo.png"
                alt=""
                width={1024}
                height={682}
                sizes="64px"
              />
            </span>
            <span className="left-sidebar-nav-label">FIFA Wordle</span>
          </Link>
          {showHowToPlay ? (
            <button
              type="button"
              className="left-sidebar-link left-sidebar-link--button"
              onClick={() => {
                onClose();
                dispatchOpenHowToPlay();
              }}
            >
              How to play
            </button>
          ) : (
            <Link href="/how-to-play" className="left-sidebar-link" onClick={onClose}>
              How to play
            </Link>
          )}
          <section
            className="left-sidebar-section"
            aria-labelledby="left-sidebar-privacy-settings-heading"
          >
            <h3
              id="left-sidebar-privacy-settings-heading"
              className="left-sidebar-section-title"
            >
              Privacy settings
            </h3>
            <Link href="/privacy" className="left-sidebar-link" onClick={onClose}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="left-sidebar-link" onClick={onClose}>
              Terms of Service
            </Link>
            <Link href="/cookies" className="left-sidebar-link" onClick={onClose}>
              Cookie Policy
            </Link>
            <Link href="/contact" className="left-sidebar-link" onClick={onClose}>
              Contact
            </Link>
          </section>
        </nav>
      </aside>
    </div>,
    document.body,
  );
}
