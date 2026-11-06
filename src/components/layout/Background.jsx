// The subtle page background: a slow-moving grid with faint scanlines over it.
// It is decoration only, and all of its movement is in the CSS file.
import "./Background.css";

export default function Background() {
  return (
    <div className="background" aria-hidden="true">
      <div className="background-grid" />
      <div className="background-scanlines" />
    </div>
  );
}
