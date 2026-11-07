// The Konami code surprise: a plane flies over the desktop while a radar pings.
// The animation is all in the CSS file, and this removes itself when the plane has gone.
import "./Flyover.css";

export default function Flyover({ onDone }) {
  return (
    <div className="flyover" aria-hidden="true">
      <span className="flyover-ping" />
      <span className="flyover-ping flyover-ping-late" />
      <svg className="flyover-plane" viewBox="0 0 240 60" onAnimationEnd={onDone}>
        <path className="flyover-trail" d="M0 30h150" />
        <path
          className="flyover-body"
          d="M232 30c0-3-5-5-11-5h-23L178 3h-8l9 22h-21l-7-8h-6l4 13-4 13h6l7-8h21l-9 22h8l20-22h23c6 0 11-2 11-5z"
        />
      </svg>
    </div>
  );
}
