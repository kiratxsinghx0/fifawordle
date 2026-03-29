import type { Metadata } from "next";
import HowToPlayContent from "../components/how-to-play-content";

export const metadata: Metadata = {
  title: "How to Play — FIFA Wordle",
  description:
    "Guess the FIFA player in six tries. Learn the rules and tile colors.",
};

export default function HowToPlayPage() {
  return (
    <main className="legal-page how-to-play-page">
      <article className="legal-page__inner">
        <HowToPlayContent showBackLink />
      </article>
    </main>
  );
}
