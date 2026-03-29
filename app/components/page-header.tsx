"use client";

import Image from "next/image";

export const OPEN_HOW_TO_PLAY_EVENT = "fifa-wordle-open-how-to-play";

export function dispatchOpenHowToPlay() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_HOW_TO_PLAY_EVENT));
}

type PageHeaderProps = {
  /** When false, only the logo and accent bar (matches legal/static pages). */
  showHowToPlay?: boolean;
};

export default function PageHeader({ showHowToPlay = true }: PageHeaderProps) {
  const logo = (
    <Image
      className="page-title-logo"
      src="/fifa-wordle-logo.png"
      alt="FIFA Wordle"
      width={1024}
      height={682}
      priority
      sizes="(max-width: 320px) 100vw, 20rem"
    />
  );

  return (
    <header className="page-header">
      <div className="page-header-bar">
        <div className="page-header-bar__side" aria-hidden />
        {showHowToPlay ? (
          <h1 className="page-title-logo-wrap">{logo}</h1>
        ) : (
          <div className="page-title-logo-wrap">{logo}</div>
        )}
        <div className="page-header-bar__side page-header-bar__side--end">
          {showHowToPlay ? (
            <button
              type="button"
              className="page-header-how-to-play"
              aria-label="How to play"
              onClick={() => dispatchOpenHowToPlay()}
            >
              <svg
                className="page-header-how-to-play__icon"
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
          ) : null}
        </div>
      </div>
      <div className="page-title-accent" aria-hidden="true" />
    </header>
  );
}
