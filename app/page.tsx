import Image from "next/image";
import Game from "./components/games";

export default function Home() {
  return (
    <main>
      <header className="page-header">
        <h1 className="page-title-logo-wrap">
          <Image
            className="page-title-logo"
            src="/fifa-wordle-logo.png"
            alt="FIFA Wordle"
            width={1024}
            height={682}
            priority
            sizes="(max-width: 320px) 100vw, 20rem"
          />
        </h1>
        <div className="page-title-accent" aria-hidden="true" />
      </header>
      <Game />
    </main>
  );
}
