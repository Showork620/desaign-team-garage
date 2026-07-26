import { useState } from "react";
import { Link } from "react-router-dom";
import { ROADMAP } from "../data/roadmap";
import { getLessons } from "../data/lessons";
import { useProgress } from "../progress/progressContext";
import ProgressBar from "./ProgressBar";
import CheckItem from "./CheckItem";

export default function Roadmap() {
  const [openId, setOpenId] = useState(null);
  const { categoryProgress, totalProgress, resetAll } = useProgress();

  const toggleOpen = (id) => setOpenId((current) => (current === id ? null : id));

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
        <p>
          Frontend エンジニアデビューまでの道のりを、8カテゴリ・{totalProgress.total}
          項目に分けました。できたものからチェックしていきます。
        </p>
      </div>

      <div className="roadmap-total">
        <p className="roadmap-total-label">TOTAL PROGRESS</p>
        <ProgressBar
          done={totalProgress.done}
          total={totalProgress.total}
          percent={totalProgress.percent}
          size="lg"
        />
        {totalProgress.done > 0 && (
          <button type="button" className="roadmap-reset" onClick={resetAll}>
            チェックをリセット
          </button>
        )}
      </div>

      <div className="roadmap-list">
        {ROADMAP.map((category) => {
          const progress = categoryProgress(category.id);
          const isOpen = openId === category.id;
          const isComplete = progress.done === progress.total;
          const hasLessons = Boolean(getLessons(category.id));

          return (
            <article
              key={category.id}
              className={`roadmap-row${isOpen ? " is-open" : ""}${isComplete ? " is-complete" : ""}`}
            >
              <button
                type="button"
                className="roadmap-row-head"
                onClick={() => toggleOpen(category.id)}
                aria-expanded={isOpen}
                aria-controls={`roadmap-panel-${category.id}`}
              >
                <span className="num">{category.num}</span>
                <span className="roadmap-row-title">
                  <h3>{category.title}</h3>
                  <em>{category.desc}</em>
                </span>
                <span className="roadmap-row-progress">
                  <ProgressBar
                    done={progress.done}
                    total={progress.total}
                    percent={progress.percent}
                    size="sm"
                  />
                </span>
                <i aria-hidden="true">{isOpen ? "−" : "+"}</i>
              </button>

              {isOpen && (
                <div className="roadmap-panel" id={`roadmap-panel-${category.id}`}>
                  <ul className="check-items">
                    {category.items.map((item, index) => (
                      <CheckItem key={item.id} item={item} index={index} />
                    ))}
                  </ul>
                  <Link to={`/roadmap/${category.id}`} className="roadmap-more">
                    <span>{category.title} の特設ページへ</span>
                    {!hasLessons && <b className="roadmap-more-wip">準備中</b>}
                    <i aria-hidden="true">→</i>
                  </Link>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
