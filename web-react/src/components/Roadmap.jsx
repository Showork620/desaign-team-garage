const ROADMAP_ITEMS = [
  { num: "01", title: "HTML", desc: "ページの骨組みを作る" },
  { num: "02", title: "CSS", desc: "見た目を整える" },
  { num: "03", title: "JavaScript", desc: "動きをつける" },
  { num: "04", title: "AI Tools", desc: "AIに相談しながら作る" },
  { num: "05", title: "GitHub", desc: "作ったものを記録する" },
  { num: "06", title: "App Build", desc: "小さなアプリを完成させる" },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="section roadmap-section">
      <div className="section-head">
        <p className="section-number">02</p>
        <p className="section-en">LEARNING ROADMAP</p>
      </div>
      <div className="roadmap-intro">
        <h2 className="display-title">
          <span>わからない</span>を、
          <br />
          ひとつずつ進む。
        </h2>
        <p>基礎からアプリ制作まで。学んだ順番そのものを、サイトのコンテンツとして積み重ねます。</p>
      </div>
      <div className="roadmap-list">
        {ROADMAP_ITEMS.map((item) => (
          <article key={item.num}>
            <span className="num">{item.num}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <i>→</i>
          </article>
        ))}
      </div>
    </section>
  );
}
