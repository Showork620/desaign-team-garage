import CodeBlock from "./CodeBlock";

export default function LessonContent({ lesson, playground }) {
  if (!lesson) {
    return <p className="lesson-empty">解説はこれから書きます。</p>;
  }

  return (
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
          <CodeBlock code={lesson.code.body} language="javascript" />
        </Block>
      )}

      {playground}

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
  );
}

export function Block({ label, children }) {
  return (
    <section className="lesson-block">
      <h3>{label}</h3>
      <div>{children}</div>
    </section>
  );
}
