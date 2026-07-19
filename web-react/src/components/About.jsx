export default function About() {
  return (
    <section id="about" className="section about">
      <div className="section-head">
        <p className="section-number">01</p>
        <p className="section-en">ABOUT THIS PROJECT</p>
      </div>
      <div className="about-title-wrap">
        <h2 className="display-title">
          デザインだけで、
          <br />
          <span>終わらせない。</span>
        </h2>
        <p className="floating-en">READ / FIX / BUILD</p>
      </div>
      <div className="about-content">
        <p className="lead">
          コードを「難しいもの」のままにしない。
          <br />
          AIに相談しながら、自分の手で理解していく。
        </p>
        <div>
          <p>
            このサイトは、Webデザインから一歩進んで、HTML / CSS / JavaScript
            の基礎を理解し、AI開発ツールと一緒に小さなアプリを作っていく学習記録です。
          </p>
          <ul className="check-list">
            <li>
              <b>01</b>
              <span>HTML / CSS / JS の基礎を理解する</span>
            </li>
            <li>
              <b>02</b>
              <span>Claude Code などのAI開発ツールを体験する</span>
            </li>
            <li>
              <b>03</b>
              <span>学びの過程を、動くアプリとして残す</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
