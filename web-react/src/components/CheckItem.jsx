import { useProgress } from "../progress/progressContext";

export default function CheckItem({ item, index }) {
  const { isDone, toggle } = useProgress();
  const done = isDone(item.id);

  return (
    <li className={`check-item${done ? " is-done" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={done}
          onChange={() => toggle(item.id)}
          onClick={(event) => event.stopPropagation()}
        />
        <span className="check-box" aria-hidden="true">
          ✓
        </span>
        {index != null && <span className="check-num">{String(index + 1).padStart(2, "0")}</span>}
        <span className="check-title">{item.title}</span>
      </label>
    </li>
  );
}
