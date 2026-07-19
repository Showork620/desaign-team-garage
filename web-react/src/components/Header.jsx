export default function Header() {
  return (
    <header className="site-header">
      <a href="#top" className="logo">
        <span>WEB</span> BUILD LOG
      </a>
      <nav className="nav" aria-label="メインナビゲーション">
        <a href="#about">About</a>
        <a href="#roadmap">Roadmap</a>
        <a href="#works">Works</a>
        <a href="#log">Log</a>
      </nav>
    </header>
  );
}
