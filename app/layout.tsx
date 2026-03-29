// FIX: Import globals.css here so animations (flip, shake) are applied globally
import type { Viewport } from "next";
import Link from "next/link";
import { CookieBanner } from "./components/cookie-banner";
import "./globals.css";

export const metadata = {
  title: "FIFA Wordle",
  description: "Guess the FIFA player daily",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {children}
        <CookieBanner />
        <footer className="site-footer">
          <nav className="site-footer-nav" aria-label="Legal and contact">
            <ul className="site-footer-links">
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookies">Cookie Policy</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </footer>
      </body>
    </html>
  );
}
