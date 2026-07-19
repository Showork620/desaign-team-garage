const WORK_ITEMS = [
  { no: "01", visual: "HELLO\nWORLD.", title: "自己紹介ページ", tag: "HTML / CSS", featured: true },
  { no: "02", visual: "CLICK\nME ↗", title: "ボタンデザイン集", tag: "CSS Components" },
  { no: "03", visual: "TODO\n□ □ ■", title: "ToDoアプリ", tag: "JavaScript" },
  { no: "04", visual: "#C8FF3D", title: "カラーパレット生成", tag: "JavaScript App" },
];

export default function Works() {
  return (
    <section id="works" className="section works">
      <div className="section-head">
        <p className="section-number">03</p>
        <p className="section-en">WORKS / APPS</p>
      </div>
      <h2 className="display-title works-title">
        作ったものが、
        <br />
        <span>学んだ証拠になる。</span>
      </h2>
      <div className="works-grid">
        {WORK_ITEMS.map((work) => (
          <article key={work.no} className={`work-card${work.featured ? " featured" : ""}`}>
            <span className="work-no">{work.no}</span>
            <div className="work-visual">
              {work.visual.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </div>
            <div>
              <h3>{work.title}</h3>
              <p>{work.tag}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
