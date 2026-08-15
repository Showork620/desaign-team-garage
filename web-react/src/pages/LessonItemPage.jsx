import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AppliedLessonA from "../components/AppliedLessonA";
import CodePlayground from "../components/CodePlayground";
import LessonContent from "../components/LessonContent";
import { findCategory } from "../data/roadmap";
import { getLesson } from "../data/lessons";
import { useProgress } from "../progress/progressContext";

export default function LessonItemPage() {
  const { categoryId, itemId } = useParams();
  const category = findCategory(categoryId);
  const { isDone, toggle } = useProgress();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [categoryId, itemId]);

  if (!category) {
    return <NotFound />;
  }

  const itemIndex = category.items.findIndex((item) => item.id === itemId);
  const item = category.items[itemIndex];
  const lesson = getLesson(category.id, itemId);

  if (!item) {
    return <NotFound backTo={`/roadmap/${category.id}`} />;
  }

  const done = isDone(item.id);
  const prev = category.items[itemIndex - 1];
  const next = category.items[itemIndex + 1];

  return (
    <main className="lesson-page">
      <div className="lesson-inner">
        <Link to={`/roadmap/${category.id}`} className="lesson-back">
          <i aria-hidden="true">←</i> {category.title} 一覧へ戻る
        </Link>

        <article className={`lesson-item lesson-item-detail${done ? " is-done" : ""}`}>
          <div className="lesson-item-head">
            <label className="lesson-check">
              <input type="checkbox" checked={done} onChange={() => toggle(item.id)} />
              <span className="check-box" aria-hidden="true">
                ✓
              </span>
            </label>
            <span className="lesson-item-num">{String(itemIndex + 1).padStart(2, "0")}</span>
            <div>
              <p className="lesson-meta lesson-item-meta">
                <span className="lesson-num">{category.num}</span>
                <span className="lesson-en">{category.en}</span>
              </p>
              <h1>{lesson?.heading ?? item.title}</h1>
            </div>
          </div>

          {item.id === "js-applied" ? (
            <AppliedLessonA />
          ) : (
            <LessonContent
              lesson={lesson}
              playground={
                category.id === "javascript" && lesson ? (
                  <CodePlayground
                    initialCode={lesson.code?.body}
                    examples={lesson.playgroundExamples}
                    itemTitle={item.title}
                  />
                ) : null
              }
            />
          )}
        </article>

        <nav className="lesson-nav" aria-label="トピック移動">
          {prev ? (
            <Link to={`/roadmap/${category.id}/${prev.id}`} className="lesson-nav-item">
              <span>PREV</span>
              <b>{prev.title}</b>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/roadmap/${category.id}/${next.id}`} className="lesson-nav-item is-next">
              <span>NEXT</span>
              <b>{next.title}</b>
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}

function NotFound({ backTo = "/" }) {
  return (
    <main className="lesson-page">
      <div className="lesson-inner lesson-notfound">
        <h1>ページが見つかりません</h1>
        <Link to={backTo} className="lesson-back">
          <i aria-hidden="true">←</i> 戻る
        </Link>
      </div>
    </main>
  );
}
