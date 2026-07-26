export default function ProgressBar({ done, total, percent, size = "md", showLabel = true }) {
  const label = `${done} / ${total}`;

  return (
    <div className={`progress progress-${size}`}>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`進捗 ${label}`}
      >
        <span className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      {showLabel && (
        <p className="progress-label">
          <b>{label}</b>
          <span>{percent}%</span>
        </p>
      )}
    </div>
  );
}
