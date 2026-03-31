"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LeftSidebar from "./left-sidebar";
import { dispatchOpenHowToPlay } from "./how-to-play-open";
import { dispatchOpenHintHistory, HINT_COUNT_UPDATE_EVENT } from "./hint-history-open";

export { OPEN_HOW_TO_PLAY_EVENT, dispatchOpenHowToPlay } from "./how-to-play-open";
export { OPEN_HINT_HISTORY_EVENT } from "./hint-history-open";

type PageHeaderProps = {
  /** When false, only the logo and accent bar (matches legal/static pages). */
  showHowToPlay?: boolean;
};

export default function PageHeader({ showHowToPlay = true }: PageHeaderProps) {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [hintCount, setHintCount] = useState(0);

  useEffect(() => {
    const onCount = (e: Event) => setHintCount((e as CustomEvent<number>).detail);
    window.addEventListener(HINT_COUNT_UPDATE_EVENT, onCount);
    return () => window.removeEventListener(HINT_COUNT_UPDATE_EVENT, onCount);
  }, []);

  const logo = (
    <Image
      className="page-title-logo"
      src="/fifa-wordle-logo.png"
      alt="FIFA Wordle"
      width={1024}
      height={682}
      priority
      sizes="(max-width: 360px) 90vw, 18rem"
    />
  );

  return (
    <header
      className={showHowToPlay ? "page-header page-header--game" : "page-header"}
    >
      <div className="page-header-bar">
        <div className="page-header-bar__side page-header-bar__side--start">
          <button
            type="button"
            className="page-header-icon-btn page-header-menu-btn"
            aria-label="Open menu"
            aria-expanded={leftSidebarOpen}
            aria-controls="left-sidebar-panel"
            onClick={() => setLeftSidebarOpen(true)}
          >
            <svg
              className="page-header-icon-btn__glyph"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {showHowToPlay ? (
          <h1 className="page-title-logo-wrap">{logo}</h1>
        ) : (
          <div className="page-title-logo-wrap">{logo}</div>
        )}
        <div className="page-header-bar__side page-header-bar__side--end">
          <nav
            className="page-header-toolbar"
            aria-label="Help and legal"
          >
            {showHowToPlay ? (
              <>
                <button
                  type="button"
                  className="page-header-icon-btn page-header-hint-btn"
                  aria-label="View hints"
                  onClick={() => dispatchOpenHintHistory()}
                >
                  <svg
                    className="page-header-icon-btn__glyph"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M9 21h6M12 3a6 6 0 0 0-6 6c0 2.1 1.1 3.8 2.5 5 .7.6 1.2 1.5 1.5 2.5h4c.3-1 .8-1.9 1.5-2.5C16.9 12.8 18 11.1 18 9a6 6 0 0 0-6-6z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {hintCount > 0 && (
                    <span className="page-header-hint-badge" aria-hidden>
                      {hintCount}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  className="page-header-icon-btn"
                  aria-label="How to play"
                  onClick={() => dispatchOpenHowToPlay()}
                >
                  <svg
                    className="page-header-icon-btn__glyph"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.5.3-.7.6-.7 1.1V14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="17" r="1" fill="currentColor" />
                  </svg>
                </button>
              </>
            ) : null}
            <Link
              href="/privacy"
              className="page-header-icon-btn"
              aria-label="Privacy Policy"
            >
              <svg
                className="page-header-icon-btn__glyph"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M12 3L5 6v5c0 5 3.5 9.5 7 11 3.5-1.5 7-6 7-11V6l-7-3z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/terms"
              className="page-header-icon-btn"
              aria-label="Terms of Service"
            >
              <svg
                className="page-header-icon-btn__glyph"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 2v6h6M8 13h8M8 17h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
            <Link
              href="/cookies"
              className="page-header-icon-btn"
              aria-label="Cookie Policy"
            >
              <svg
                className="page-header-icon-btn__glyph"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <circle cx="9" cy="10" r="1.25" fill="currentColor" />
                <circle cx="15" cy="14" r="1.25" fill="currentColor" />
                <circle cx="14" cy="9" r="1" fill="currentColor" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="page-header-icon-btn"
              aria-label="Contact"
            >
              <svg
                className="page-header-icon-btn__glyph"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M4 6h16v12H4V6z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 7l8 6 8-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
      <div className="page-title-accent" aria-hidden="true" />
      <LeftSidebar
        open={leftSidebarOpen}
        onClose={() => setLeftSidebarOpen(false)}
        showHowToPlay={showHowToPlay}
      />
    </header>
  );
}
