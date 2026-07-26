import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ROADMAP, findCategory, findCategoryIndex } from "../data/roadmap";
import { getLesson, getLessons } from "../data/lessons";
import { useProgress } from "../progress/progressContext";
import ProgressBar from "../components/ProgressBar";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const category = findCategory(categoryId);
  const { categoryProgress, isDone, toggle } = useProgress();

  // ページを開いたら必ず先頭から。
  // index.css の scroll-behavior:smooth が効かないよう instant を指定する。
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [categoryId]);

  if (!category) {
    return (
      <main className="lesson-page">
        <div className="lesson-inner lesson-notfound">
          <h1>ページが見つかりません</h1>
          <Link to="/" className="lesson-back">
            <i aria-hidden="true">←</i> トップへ戻る
          </Link>
        </div>
      </main>
    );
  }

  const progress = categoryProgress(category.id);
  const lessons = getLessons(category.id);
  const index = findCategoryIndex(category.id);
  const prev = ROADMAP[index - 1];
  const next = ROADMAP[index + 1];

  return (
    <main className="lesson-page">
      <div className="lesson-inner">
        <Link to="/" state={{ scrollTo: "roadmap" }} className="lesson-back">
          <i aria-hidden="true">←</i> BACK TO ROADMAP
        </Link>

        <header className="lesson-hero">
          <p className="lesson-meta">
            <span className="lesson-num">{category.num}</span>
            <span className="lesson-en">{category.en}</span>
          </p>
          <h1 className="lesson-title">{category.lead}</h1>
          <p className="lesson-desc">{category.desc}</p>
          <div className="lesson-progress">
            <ProgressBar
              done={progress.done}
              total={progress.total}
              percent={progress.percent}
              size="lg"
            />
          </div>
        </header>

        {!lessons && (
          <p className="lesson-wip">
            このカテゴリの解説はこれから書いていきます。チェックリストは今すぐ使えます。
          </p>
        )}

        <div className="lesson-list">
          {category.items.map((item, i) => {
            const lesson = getLesson(category.id, item.id);
            const done = isDone(item.id);

            return (
              <article key={item.id} className={`lesson-item${done ? " is-done" : ""}`}>
                <div className="lesson-item-head">
                  <label className="lesson-check">
                    <input type="checkbox" checked={done} onChange={() => toggle(item.id)} />
                    <span className="check-box" aria-hidden="true">
                      ✓
                    </span>
                  </label>
                  <span className="lesson-item-num">{String(i + 1).padStart(2, "0")}</span>
                  <h2>{item.title}</h2>
                </div>

                {lesson ? (
                  <div className="lesson-body">
                    <Block label="これは何？">
                      <p>{lesson.what}</p>
                    </Block>

                    <Block label="なぜ必要？">
                      <p>{lesson.why}</p>
                    </Block>

                    {lesson.code && (
                      <Block label="コードで見る">
                        {lesson.code.caption && <p className="lesson-caption">{lesson.code.caption}</p>}
                        <pre className="lesson-code">
                          <code>{lesson.code.body}</code>
                        </pre>
                      </Block>
                    )}

                    {lesson.practice?.length > 0 && (
                      <Block label="やってみる">
                        <ul className="lesson-practice">
                          {lesson.practice.map((text) => (
                            <li key={text}>{text}</li>
                          ))}
                        </ul>
                      </Block>
                    )}

                    {lesson.pitfalls?.length > 0 && (
                      <Block label="つまずきポイント">
                        <ul className="lesson-pitfalls">
                          {lesson.pitfalls.map((pitfall) => (
                            <li key={pitfall.title}>
                              <b>{pitfall.title}</b>
                              <span>{pitfall.body}</span>
                            </li>
                          ))}
                        </ul>
                      </Block>
                    )}

                    {lesson.links?.length > 0 && (
                      <Block label="参考リンク">
                        <ul className="lesson-links">
                          {lesson.links.map((link) => (
                            <li key={link.url}>
                              <a href={link.url} target="_blank" rel="noreferrer">
                                {link.label} <i aria-hidden="true">↗</i>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </Block>
                    )}
                  </div>
                ) : (
                  <p className="lesson-empty">解説はこれから書きます。</p>
                )}
              </article>
            );
          })}
        </div>

        <nav className="lesson-nav" aria-label="カテゴリ移動">
          {prev ? (
            <Link to={`/roadmap/${prev.id}`} className="lesson-nav-item">
              <span>PREV — {prev.num}</span>
              <b>{prev.title}</b>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/roadmap/${next.id}`} className="lesson-nav-item is-next">
              <span>NEXT — {next.num}</span>
              <b>{next.title}</b>
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}

function Block({ label, children }) {
  return (
    <section className="lesson-block">
      <h3>{label}</h3>
      <div>{children}</div>
    </section>
  );
}
