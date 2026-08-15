import { useEffect, useRef, useState } from "react";
import { Block } from "./LessonContent";

const INITIAL_STUDENTS = [
  { name: "田中", score: 82 },
  { name: "佐藤", score: 45 },
  { name: "鈴木", score: 60 },
];

const PASS_LINE = 60;

// レッスンの解説コードと同じ手順（配列をforで1件ずつ確認 → 条件で要素を作る
// → appendChildで追加）を、実際のDOM APIでそのまま動かすデモです。
// React の再レンダーではなく、生の document 操作の結果を見せることに意味があるので
// あえて JSX の map ではなくこの形にしています。
function renderStudentList(listElement, students, passLine) {
  listElement.textContent = "";

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const li = document.createElement("li");

    if (student.score >= passLine) {
      li.textContent = `${student.name}：${student.score}点 → 合格`;
      li.classList.add("is-pass");
    } else {
      li.textContent = `${student.name}：${student.score}点`;
    }

    listElement.appendChild(li);
  }
}

export default function StudentListDemo() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [passLine, setPassLine] = useState(PASS_LINE);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      renderStudentList(listRef.current, students, passLine);
    }
  }, [students, passLine]);

  const addStudent = (event) => {
    event.preventDefault();
    if (!name.trim() || score === "") return;

    setStudents((current) => [...current, { name: name.trim(), score: Number(score) }]);
    setName("");
    setScore("");
  };

  const reset = () => {
    setStudents(INITIAL_STUDENTS);
    setPassLine(PASS_LINE);
  };

  return (
    <Block label="実際に動かして確認">
      <div className="student-demo">
        <p className="student-demo-lead">
          生徒を追加したり合格ラインを変えると、上のコードと同じロジックが実際の
          &lt;ul&gt;要素を書き換えます（document.createElement + appendChild）。
        </p>

        <div className="student-demo-controls">
          <label className="student-demo-line">
            合格ライン
            <input
              type="number"
              value={passLine}
              onChange={(event) => setPassLine(Number(event.target.value))}
            />
            点以上
          </label>

          <form className="student-demo-form" onSubmit={addStudent}>
            <input
              type="text"
              placeholder="名前"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-label="生徒の名前"
            />
            <input
              type="number"
              placeholder="点数"
              value={score}
              onChange={(event) => setScore(event.target.value)}
              aria-label="生徒の点数"
            />
            <button type="submit">生徒を追加</button>
          </form>

          <button type="button" className="student-demo-reset" onClick={reset}>
            リセット
          </button>
        </div>

        <ul className="student-demo-list" ref={listRef} aria-live="polite" />
      </div>
    </Block>
  );
}
