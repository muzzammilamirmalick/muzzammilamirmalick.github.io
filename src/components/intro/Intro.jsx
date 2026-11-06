// The cinematic intro: the room, the boot sequence, the camera zoom and the handoff to the site.
// It covers the real site, which is already loaded underneath it.
import { useEffect, useLayoutEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { playBeep, playClick, unlockAudio } from "../../audio/sounds.js";
import { boot } from "../../data/content.js";
import BootLog from "../terminal/BootLog.jsx";
import TerminalWindow from "../terminal/TerminalWindow.jsx";
import { FADE_SECONDS, TIMELINE, ZOOM_EASE } from "./introTimeline.js";
import { HoodedFigure, RoomBackground } from "./RoomScene.jsx";
import {
  computeLayout,
  figureTransform,
  roomTransform,
  terminalHeight,
  terminalTransform,
} from "./sceneLayout.js";
import "./Intro.css";

const NOTHING_TYPED = { command: 0, steps: 0, welcome: 0 };

// Measures the window and the hero terminal (leaving out its button row).
function measureLayout(heroTerminal) {
  const frame = heroTerminal.getBoundingClientRect();
  const footer = heroTerminal.querySelector(".terminal-footer");
  const footerHeight = footer ? footer.getBoundingClientRect().height : 0;

  return computeLayout(document.documentElement.clientWidth, window.innerHeight, {
    left: frame.left,
    top: frame.top,
    width: frame.width,
    height: frame.height - footerHeight,
  });
}

export default function Intro({ heroTerminalRef, onReveal, onFinish }) {
  // gate: waiting for Start. playing: the sequence is running. leaving: fading away.
  const [phase, setPhase] = useState("gate");
  const [fadeSeconds, setFadeSeconds] = useState(FADE_SECONDS.normal);
  const [typed, setTyped] = useState(NOTHING_TYPED);
  const [flickering, setFlickering] = useState(false);
  const reducedMotion = useReducedMotion();

  // progress runs from 0 to 1 during the zoom. Every moving layer is worked out from it,
  // so they all stay perfectly in sync.
  const progress = useMotionValue(0);
  const layout = useMotionValue(computeLayout(1280, 800, { left: 0, top: 0, width: 800, height: 400 }));

  const roomStyle = useTransform([layout, progress], ([l, p]) => roomTransform(l, p));
  const figureStyle = useTransform([layout, progress], ([l, p]) => figureTransform(l, p));
  const figureOpacity = useTransform(progress, [0.35, 0.7], [1, 0]);
  const terminalStyle = useTransform([layout, progress], ([l, p]) => terminalTransform(l, p));
  const terminalHeightStyle = useTransform([layout, progress], ([l, p]) => terminalHeight(l, p));
  const terminalWidthStyle = useTransform(layout, (l) => l.terminal.width);

  // Lock page scrolling while the intro is showing, and start from the top of the page.
  useLayoutEffect(() => {
    document.documentElement.classList.add("intro-active");
    window.scrollTo(0, 0);
    return () => document.documentElement.classList.remove("intro-active");
  }, []);

  // Measure now, and again whenever the window or the loaded fonts change the layout.
  useLayoutEffect(() => {
    const update = () => layout.set(measureLayout(heroTerminalRef.current));
    update();
    window.addEventListener("resize", update);
    document.fonts?.ready.then(update);
    return () => window.removeEventListener("resize", update);
  }, [heroTerminalRef, layout]);

  function leave(seconds) {
    setFadeSeconds(seconds);
    setPhase("leaving");
  }

  function start() {
    unlockAudio();

    // Reduced motion: no typing, zoom or flicker. Show the text and fade to the site.
    if (reducedMotion) {
      setTyped({
        command: boot.command.length,
        steps: boot.steps.length,
        welcome: boot.welcome.length,
      });
      playBeep();
      onReveal(false);
      leave(FADE_SECONDS.reducedMotion);
      return;
    }

    setPhase("playing");
  }

  function skip() {
    onReveal(false);
    leave(FADE_SECONDS.skip);
  }

  // The main sequence. Each step is scheduled once, and leaving the "playing"
  // phase (the Skip button) cancels whatever has not happened yet.
  useEffect(() => {
    if (phase !== "playing") return undefined;

    const timers = [];
    let zoom = null;
    const at = (time, action) => timers.push(setTimeout(action, time));

    const commandCharTime =
      (TIMELINE.commandEnd - TIMELINE.commandStart) / boot.command.length;
    for (let chars = 1; chars <= boot.command.length; chars++) {
      at(TIMELINE.commandStart + chars * commandCharTime, () => {
        setTyped((current) => ({ ...current, command: chars }));
        // Typing is fast, so a click on every third letter sounds more natural.
        if (chars % 3 === 1) playClick();
      });
    }

    TIMELINE.stepTimes.forEach((time, index) => {
      at(time, () => {
        setTyped((current) => ({ ...current, steps: index + 1 }));
        playClick();
      });
    });

    at(TIMELINE.welcomeStart, playBeep);
    const welcomeCharTime =
      (TIMELINE.welcomeEnd - TIMELINE.welcomeStart) / boot.welcome.length;
    for (let chars = 1; chars <= boot.welcome.length; chars++) {
      at(TIMELINE.welcomeStart + chars * welcomeCharTime, () => {
        setTyped((current) => ({ ...current, welcome: chars }));
      });
    }

    at(TIMELINE.zoomStart, () => {
      zoom = animate(progress, 1, {
        duration: (TIMELINE.flickerStart - TIMELINE.zoomStart) / 1000,
        ease: ZOOM_EASE,
      });
    });
    at(TIMELINE.flickerStart, () => {
      // A slow device might still be mid-zoom. Land exactly on the hero terminal anyway.
      zoom?.stop();
      progress.set(1);
      setFlickering(true);
    });
    at(TIMELINE.reveal, () => {
      onReveal(true);
      leave(FADE_SECONDS.normal);
    });

    return () => {
      timers.forEach(clearTimeout);
      zoom?.stop();
    };
  }, [phase]); // This must only restart when the phase changes.

  // Keyboard: Enter starts (when no other button has focus) and Escape skips.
  useEffect(() => {
    function handleKeyDown(event) {
      if (phase === "gate" && event.key === "Enter" && document.activeElement === document.body) {
        start();
      }
      if (phase === "playing" && event.key === "Escape") {
        skip();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <motion.div
      className="intro"
      initial={false}
      animate={{ opacity: phase === "leaving" ? 0 : 1 }}
      transition={{ duration: fadeSeconds, ease: "easeOut" }}
      onAnimationComplete={() => {
        if (phase === "leaving") onFinish();
      }}
      style={{ pointerEvents: phase === "leaving" ? "none" : "auto" }}
    >
      <RoomBackground style={{ transform: roomStyle }} />

      {/* The same terminal parts as the hero, at the hero's real size and scaled down. */}
      <motion.div
        className="intro-terminal"
        aria-hidden="true"
        style={{
          transform: terminalStyle,
          width: terminalWidthStyle,
          height: terminalHeightStyle,
        }}
      >
        <TerminalWindow>
          <BootLog
            commandChars={typed.command}
            stepsShown={typed.steps}
            welcomeChars={typed.welcome}
            showCursor={!flickering && phase !== "leaving"}
          />
        </TerminalWindow>
      </motion.div>

      <HoodedFigure style={{ transform: figureStyle, opacity: figureOpacity }} />

      {flickering && <div className="intro-flicker" />}

      <AnimatePresence>
        {phase === "gate" && (
          <motion.div
            className="intro-start"
            key="start"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <button className="btn btn-primary intro-start-button" type="button" onClick={start} autoFocus>
              Click or press Enter to start
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "playing" && (
        <button className="btn intro-skip" type="button" onClick={skip} autoFocus>
          Skip
        </button>
      )}
    </motion.div>
  );
}
