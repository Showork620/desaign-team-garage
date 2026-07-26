import SectionLink from "./SectionLink";

export default function Header() {
  return (
    <header className="site-header">
      <SectionLink section="top" className="logo">
        <span>WEB</span> BUILD LOG
      </SectionLink>
      <nav className="nav" aria-label="メインナビゲーション">
        <SectionLink section="about">About</SectionLink>
        <SectionLink section="roadmap">Roadmap</SectionLink>
        <SectionLink section="works">Works</SectionLink>
        <SectionLink section="log">Log</SectionLink>
      </nav>
    </header>
  );
}
