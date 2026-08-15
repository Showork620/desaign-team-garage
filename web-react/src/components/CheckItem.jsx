import { Link } from "react-router-dom";
import { useProgress } from "../progress/progressContext";

export default function CheckItem({ item, index, categoryId }) {
  const { isDone, toggle } = useProgress();
  const done = isDone(item.id);
  const itemPath = categoryId ? `/roadmap/${categoryId}/${item.id}` : null;

  return (
    <li className={`check-item${done ? " is-done" : ""}`}>
      <div className="check-item-row">
        <label className="check-toggle" aria-label={`${item.title}をチェック`}>
          <input
            type="checkbox"
            checked={done}
            onChange={() => toggle(item.id)}
            onClick={(event) => event.stopPropagation()}
          />
          <span className="check-box" aria-hidden="true">
            ✓
          </span>
        </label>
        {index != null && <span className="check-num">{String(index + 1).padStart(2, "0")}</span>}
        {itemPath ? (
          <Link to={itemPath} className="check-title check-title-link">
            {item.title}
          </Link>
        ) : (
          <span className="check-title">{item.title}</span>
        )}
      </div>
    </li>
  );
}
