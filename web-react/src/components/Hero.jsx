export default function Hero() {
  return (
    <section className="hero">
      <p className="hero-index">
        A DESIGNER'S
        <br />
        WEB DEVELOPMENT JOURNAL
      </p>
      <div className="hero-copy">
        <p className="eyebrow">LEARN × BUILD × RECORD</p>
        <h1 className="hero-title">
          <span className="line line-1">AIと一緒に、</span>
          <span className="line line-2">
            Webを<span className="outline">自分の手で</span>
          </span>
          <span className="line line-3">組み立てる。</span>
        </h1>
      </div>
      <div className="hero-bottom">
        <p className="hero-description">
          HTML / CSS / JavaScript / React の基礎を学びながら、実際に動くアプリを作っていく、デザイナーのためのWeb制作ログ。
        </p>
        <a href="#about" className="scroll-link">
          <span>SCROLL</span>
          <i>↓</i>
        </a>
      </div>
      <div className="hero-code" aria-hidden="true">
        &lt;BUILD
        <br />
        &nbsp;&nbsp;WITH="AI"
        <br />
        /&gt;
      </div>
    </section>
  );
}
