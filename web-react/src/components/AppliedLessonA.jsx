import { Block } from "./LessonContent";
import CodePlayground from "./CodePlayground";
import DomPlayground from "./DomPlayground";
import APPLIED_LESSON_A from "../data/appliedLessonA";

export default function AppliedLessonA() {
  const { intro, steps, challenge, links } = APPLIED_LESSON_A;

  return (
    <div className="lesson-body applied-lesson">
      <Block label="これは何？">
        <p>{intro.what}</p>
      </Block>

      <Block label="なぜ必要？">
        <p>{intro.why}</p>
      </Block>

      {steps.map((step) => (
        <section className="applied-step" key={step.id}>
          <p className="applied-step-label">{step.label}</p>
          <h2 className="applied-step-title">{step.title}</h2>
          <p className="applied-step-explanation">{step.explanation}</p>

          {step.html && (
            <div className="applied-step-html">
              <p className="lesson-caption">使用するHTML</p>
              <pre className="lesson-code">
                <code>{step.html}</code>
              </pre>
            </div>
          )}

          {step.notes?.length > 0 && (
            <ul className="applied-step-notes">
              {step.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          )}

          {step.kind === "dom" ? (
            <DomPlayground html={step.html} initialCode={step.code} />
          ) : (
            <CodePlayground initialCode={step.code} itemTitle={step.title} />
          )}

          {step.practice?.length > 0 && (
            <Block label="やってみる">
              <ul className="lesson-practice">
                {step.practice.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </Block>
          )}

          {step.pitfalls?.length > 0 && (
            <Block label="つまずきポイント">
              <ul className="lesson-pitfalls">
                {step.pitfalls.map((pitfall) => (
                  <li key={pitfall.title}>
                    <b>{pitfall.title}</b>
                    <span>{pitfall.body}</span>
                  </li>
                ))}
              </ul>
            </Block>
          )}
        </section>
      ))}

      <section className="applied-step applied-challenge">
        <p className="applied-step-label">類題</p>
        <h2 className="applied-step-title">{challenge.title}</h2>
        <p className="applied-step-explanation">{challenge.description}</p>
        <DomPlayground html={challenge.html} initialCode={challenge.code} />
      </section>

      {links?.length > 0 && (
        <Block label="参考リンク">
          <ul className="lesson-links">
            {links.map((link) => (
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
