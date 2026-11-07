// A project's preview. It plays when hovered with a mouse, or tapped on a phone.
// If the project has a video in content.js it plays that. Otherwise it shows a small
// animated stand-in, chosen by the project's "preview" value.
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";
import "./ProjectPreview.css";

function DesktopScene() {
  return (
    <div className="scene scene-desktop">
      <span className="mini-window mini-window-a" />
      <span className="mini-window mini-window-b" />
      <span className="mini-window mini-window-c" />
    </div>
  );
}

function CalendarScene() {
  return (
    <div className="scene scene-calendar">
      {Array.from({ length: 21 }, (_, index) => (
        <span className="calendar-cell" key={index} style={{ "--cell": index }} />
      ))}
    </div>
  );
}

function BasketballScene() {
  return (
    <div className="scene scene-basketball">
      <svg viewBox="0 0 320 180" className="court" aria-hidden="true">
        <path className="shot-arc" d="M40 150 C110 10 210 10 262 62" pathLength="1" />
        <path className="hoop" d="M248 62h32M254 62l4 22h12l4-22" />
        <circle className="ball" r="9" />
      </svg>
    </div>
  );
}

const scenes = { desktop: DesktopScene, calendar: CalendarScene, basketball: BasketballScene };

export default function ProjectPreview({ project }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const Scene = scenes[project.preview] ?? DesktopScene;

  // Start or stop the real video when there is one.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      // Browsers can refuse to play. The preview simply stays still if so.
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [playing]);

  return (
    <button
      type="button"
      className={playing ? "preview is-playing" : "preview"}
      aria-pressed={playing}
      aria-label={`Play preview of ${project.name}`}
      onClick={() => setPlaying(!playing)}
      // Hovering only counts for a real mouse. Phones use the tap above instead.
      onPointerEnter={(event) => event.pointerType === "mouse" && setPlaying(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setPlaying(false)}
    >
      {project.video ? (
        <video ref={videoRef} src={project.video} muted loop playsInline preload="none" tabIndex={-1} />
      ) : (
        <Scene />
      )}
      <span className="preview-play" aria-hidden="true">
        <Icon name="play" size={16} />
      </span>
    </button>
  );
}
