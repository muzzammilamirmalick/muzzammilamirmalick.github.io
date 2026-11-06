// The sound on/off button. It stays in the top right corner during the intro and the site.
import { useState } from "react";
import { isMuted, setMuted } from "../../audio/sounds.js";
import "./MuteButton.css";

export default function MuteButton() {
  const [muted, setMutedState] = useState(isMuted);

  function toggle() {
    setMuted(!muted);
    setMutedState(!muted);
  }

  return (
    <button
      className="mute-button"
      type="button"
      onClick={toggle}
      aria-label={muted ? "Turn sound on" : "Turn sound off"}
      title={muted ? "Turn sound on" : "Turn sound off"}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z" fill="currentColor" />
        {muted ? (
          <path d="M16 9.5l5 5m0-5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        ) : (
          <path
            d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        )}
      </svg>
    </button>
  );
}
