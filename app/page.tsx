import Game from "./components/games";

export default function Home() {
  return (
    <main>
      <header className="page-header">
        <h1 className="page-title">
          <span className="page-title-mark" aria-hidden="true">
            ⚽
          </span>
          <span className="page-title-text">FIFA Wordle</span>
        </h1>
        <div className="page-title-accent" aria-hidden="true" />
      </header>
      <Game />
    </main>
  );
}
