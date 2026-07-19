const AI_ITEMS = [
  { label: "ASK", desc: "AIに聞いたこと" },
  { label: "PROMPT", desc: "うまくいった指示" },
  { label: "ERROR", desc: "失敗したこと" },
  { label: "FIX", desc: "自分で直したこと" },
];

export default function AiSection() {
  return (
    <section className="section ai-section">
      <div className="section-head">
        <p className="section-number">05</p>
        <p className="section-en">AI COLLABORATION</p>
      </div>
      <div className="ai-marquee" aria-hidden="true">
        <span>ASK → TRY → ERROR → FIX → UNDERSTAND →</span>
      </div>
      <h2 className="display-title">
        AIに聞く。
        <br />
        <span>でも、最後は自分で直す。</span>
      </h2>
      <div className="ai-grid">
        {AI_ITEMS.map((item) => (
          <div key={item.label}>
            <b>{item.label}</b>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
