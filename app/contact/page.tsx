import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — FIFA Wordle",
  description:
    "Get in touch with FIFA Wordle for queries, feedback, or business inquiries.",
};

export default function Contact() {
  return (
    <main className="legal-page">
      <article className="legal-page__inner">
        <p className="legal-page__back">
          <Link href="/">← Back to FIFA Wordle</Link>
        </p>

        <header className="legal-page__header">
          <h1 className="legal-page__title">Contact</h1>
        </header>

        <section
          className="legal-page__section legal-page__contact legal-page__contact-hero"
          aria-labelledby="contact-email"
        >
          <h2 id="contact-email">Email</h2>
          <p className="legal-page__contact-email">
            <a href="mailto:contact@fifawordle.com">contact@fifawordle.com</a>
          </p>
        </section>

        <div className="legal-page__intro-block">
          <p>
            For any queries, feedback, or business inquiries, reach out anytime.
          </p>
        </div>
      </article>
    </main>
  );
}
