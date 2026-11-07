// Two photos stacked on top of each other, with a slider that reveals one over the other.
// A real range input does the work, so it works with a mouse, a finger and the arrow keys.
import { useState } from "react";
import "./BeforeAfterSlider.css";

export default function BeforeAfterSlider({ before, after }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="ba-slider" style={{ "--position": `${position}%` }}>
      <img src={after} alt="The car after detailing" className="ba-image" loading="lazy" width="800" height="500" />
      <img
        src={before}
        alt="The car before detailing"
        className="ba-image ba-before"
        loading="lazy"
        width="800"
        height="500"
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
