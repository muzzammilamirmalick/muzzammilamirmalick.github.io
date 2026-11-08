// Two photos stacked on top of each other, with a slider that reveals one over the other.
// A real range input does the work, so it works with a mouse, a finger and the arrow keys.
// Photos are 3:4 (tall) by default, or 4:3 when "wide" is set.
import { useState } from "react";
import "./BeforeAfterSlider.css";

export default function BeforeAfterSlider({ before, after, caption, wide = false }) {
  const [position, setPosition] = useState(50);
  const [width, height] = wide ? [960, 720] : [720, 960];
  const what = caption || "The car";

  return (
    <div className={`ba-slider${wide ? " ba-wide" : ""}`} style={{ "--position": `${position}%` }}>
      <img src={after} alt={`After: ${what}`} className="ba-image" loading="lazy" width={width} height={height} />
      <img
        src={before}
        alt={`Before: ${what}`}
        className="ba-image ba-before"
        loading="lazy"
        width={width}
        height={height}
      />
      <span className="ba-label ba-label-before" aria-hidden="true">
        Before
      </span>
      <span className="ba-label ba-label-after" aria-hidden="true">
        After
      </span>
      <span className="ba-handle" aria-hidden="true" />
      <input
        className="ba-input"
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Compare before and after photos"
      />
    </div>
  );
}
