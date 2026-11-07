// My story as a timeline that draws itself, one stop at a time.
// Stops with more to say open when clicked.
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Icon from "../components/ui/Icon.jsx";
import StatTiles from "../components/ui/StatTiles.jsx";
import { codingSince, journey, stats } from "../data/content.js";
import "./JourneyApp.css";

const STOP_SECONDS = 0.38; // The time between one stop appearing and the next.
const EASE_OUT = [0.22, 1, 0.36, 1];

// Each stop's icon arrives in its own small way.
const iconEntrances = {
  terminal: { opacity: [0, 1, 0.3, 1], scale: [0.7, 1, 1, 1] }, // Flickers on, like a screen.
  wrench: { rotate: [-50, 18, -8, 0], scale: [0.7, 1, 1, 1], opacity: [0, 1, 1, 1] }, // Turns like tightening a bolt.
  car: { x: [-34, 3, 0], opacity: [0, 1, 1] }, // Drives in from the left.
  experience: { y: [-22, 3, 0], opacity: [0, 1, 1] }, // Drops into place.
  school: { rotate: [-16, 8, 0], y: [-14, 0, 0], opacity: [0, 1, 1] }, // Lands like a tossed cap.
  spark: { scale: [0, 1.3, 1], rotate: [-90, 15, 0], opacity: [0, 1, 1] }, // Bursts open.
};

function Stop({ stop, index, skipAnimation }) {
  const [open, setOpen] = useState(false);
  const delay = index * STOP_SECONDS;

  const heading = (
    <>
      <span className="stop-when">{stop.when}</span>
      <span className="stop-title">{stop.title}</span>
    </>
  );

  return (
    <motion.li
      className="stop"
      initial={skipAnimation ? false : { opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay, ease: EASE_OUT }}
    >
      <motion.span
        className="stop-icon"
        initial={skipAnimation ? false : { opacity: 0 }}
        animate={skipAnimation ? undefined : iconEntrances[stop.icon]}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
      >
        <Icon name={stop.icon} size={18} />
      </motion.span>

      <div className="stop-content">
        {stop.detail ? (
          <button
            type="button"
            className="stop-button"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {heading}
            <span className="stop-toggle" aria-hidden="true">
              {open ? "-" : "+"}
            </span>
          </button>
        ) : (
          <div className="stop-heading">{heading}</div>
        )}
        {open && <p className="stop-detail">{stop.detail}</p>}
      </div>
    </motion.li>
  );
}

export default function JourneyApp() {
  const reducedMotion = useReducedMotion();
  const [playCount, setPlayCount] = useState(0); // Changing this restarts the animation.
  const lineSeconds = journey.length * STOP_SECONDS;

  return (
    <div className="app-pad journey">
      <StatTiles stats={stats} />
      <p className="journey-since">
        <Icon name="terminal" size={14} />
        {codingSince}
      </p>

      <div className="timeline-wrap" key={playCount}>
        <motion.span
          className="timeline-line"
          aria-hidden="true"
          initial={reducedMotion ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: lineSeconds, ease: "linear" }}
        />
        <ol className="timeline">
          {journey.map((stop, index) => (
            <Stop key={stop.when} stop={stop} index={index} skipAnimation={reducedMotion} />
          ))}
        </ol>
      </div>

      {!reducedMotion && (
        <button type="button" className="journey-replay" onClick={() => setPlayCount(playCount + 1)}>
          Replay
        </button>
      )}
    </div>
  );
}
