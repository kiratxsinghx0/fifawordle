import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "../components/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy — FIFA Wordle",
  description:
    "How FIFA Wordle (fifawordle.com) handles privacy, cookies, and third-party advertising.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader showHowToPlay={false} />
      <main className="legal-page">
      <article className="legal-page__inner">
        <p className="legal-page__back">
          <Link href="/">← Back to FIFA Wordle</Link>
        </p>

        <header className="legal-page__header">
          <h1 className="legal-page__title">Privacy Policy</h1>
          <p className="legal-page__updated">Last updated: March 29, 2026</p>
        </header>

        <div className="legal-page__intro-block">
          <p>
            <strong>FIFA Wordle</strong> (fifawordle.com) explains below how we
            handle privacy, cookies, and third-party services.
          </p>
        </div>

        <section className="legal-page__section" aria-labelledby="privacy-s1">
          <h2 id="privacy-s1">1. Information we collect</h2>
          <p>
            We do not collect personal information directly. However, third-party
            services like Google AdSense may collect data such as cookies, device
            information, and usage data to serve ads.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="privacy-s2">
          <h2 id="privacy-s2">2. Cookies</h2>
          <p>
            We use cookies to improve user experience and display relevant ads.
            By using this site, you consent to the use of cookies.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="privacy-s3">
          <h2 id="privacy-s3">3. Third-party services</h2>
          <p>
            We may use services such as Google AdSense which may collect and use
            data according to their own privacy policies.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="privacy-s4">
          <h2 id="privacy-s4">4. Data usage</h2>
          <p>Collected data is used for:</p>
          <ul>
            <li>Improving the website</li>
            <li>Serving relevant ads</li>
          </ul>
        </section>

        <section className="legal-page__section" aria-labelledby="privacy-s5">
          <h2 id="privacy-s5">5. Your rights</h2>
          <p>You can disable cookies in your browser settings.</p>
        </section>

        <section
          className="legal-page__section legal-page__contact"
          aria-labelledby="privacy-s6"
        >
          <h2 id="privacy-s6">6. Contact</h2>
          <p>
            If you have questions, contact us at{" "}
            <a href="mailto:contact@fifawordle.com">contact@fifawordle.com</a>
          </p>
        </section>
      </article>
    </main>
    </>
  );
}
