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

// Drone tracker: a drone flying across with a target box locked onto it.
function TrackerScene() {
  return (
    <div className="scene scene-tracker">
      <svg viewBox="0 0 320 180" aria-hidden="true">
        <path className="tracker-grid" d="M0 60h320M0 120h320M107 0v180M213 0v180" />
        <g className="tracker-target">
          <path d="M-16 -6L0 2L16 -6M-24 -8h16M8 -8h16M-7 1h14v7h-14z" />
          <path className="tracker-box" d="M-34 -14v-12h12M22 -26h12v12M34 14v12h-12M-22 26h-12v-12" />
          <text className="tracker-text" x="0" y="42">
            LOCKED
          </text>
        </g>
      </svg>
    </div>
  );
}

// Gesture control: a tracked hand skeleton moving the cursor, with its finger count.
// Each line is one finger, from the wrist out to the tip, like MediaPipe's landmarks.
const HAND_LINES = [
  "M160 160 L140 148 L125 135 L113 121 L103 108",
  "M160 160 L145 110 L141 88 L139 74 L137 60",
  "M160 106 L160 82 L160 67 L160 52",
  "M174 110 L177 88 L179 75 L181 63",
  "M160 160 L186 118 L192 101 L195 90 L198 80",
  "M145 110 L160 106 L174 110 L186 118",
];
const FINGERTIPS = [
  [103, 108],
  [137, 60],
  [160, 52],
  [181, 63],
  [198, 80],
];

function HandScene() {
  return (
    <div className="scene scene-hand">
      <svg viewBox="40 40 256 144" aria-hidden="true">
        <g className="hand">
          {HAND_LINES.map((line) => (
            <path key={line} d={line} />
          ))}
          {FINGERTIPS.map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="4" />
          ))}
          <rect className="hand-tag" x="176" y="146" width="56" height="16" rx="2" />
          <text className="hand-tag-text" x="204" y="158">
            Right 5
          </text>
        </g>
        <path className="hand-cursor" d="M0 0 L0 16 L4 12 L8 20 L11 19 L7 11 L13 11 Z" />
      </svg>
    </div>
  );
}

const scenes = { desktop: DesktopScene, calendar: CalendarScene, tracker: TrackerScene, hand: HandScene };

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
