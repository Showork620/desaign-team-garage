const LOG_ITEMS = [
  { day: "DAY 01", title: "まずは、構造を考える。", desc: "HTMLで見出しと段落を作った。思ったより「構造を考える」作業だった。" },
  { day: "DAY 02", title: "余白で、見え方が変わる。", desc: "CSSで余白と文字サイズを調整。見た目が変わると一気に楽しくなった。" },
  { day: "DAY 03", title: "クリックで、画面が応える。", desc: "JavaScriptでイベントを追加。小さな動きでもアプリらしさが生まれた。" },
];

export default function ProcessLog() {
  return (
    <section id="log" className="section log-section">
      <div className="section-head">
        <p className="section-number">04</p>
        <p className="section-en">PROCESS LOG</p>
      </div>
      <div className="log-layout">
        <div className="sticky-title">
          <h2 className="display-title">
            できたことも、
            <br />
            <span>つまずいたことも。</span>
          </h2>
          <p>EVERY ERROR BECOMES A CLUE.</p>
        </div>
        <div className="log-list">
          {LOG_ITEMS.map((log) => (
            <article key={log.day}>
              <time>{log.day}</time>
              <h3>{log.title}</h3>
              <p>{log.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
