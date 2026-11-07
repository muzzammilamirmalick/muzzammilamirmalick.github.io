// The cinematic intro: the room, the boot lines, the breach, the zoom and the handoff to MuzzOS.
// It covers MuzzOS, which is already loaded underneath it.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import {
  playAlarm,
  playBeep,
  playClick,
  playCrack,
  playGlitch,
  playRisingTone,
  stopRisingTone,
  unlockAudio,
} from "../../audio/sounds.js";
import { boot } from "../../data/content.js";
import { appById } from "../../os/appList.js";
import WindowChrome from "../../os/WindowChrome.jsx";
import BootLog from "../terminal/BootLog.jsx";
import BreachScreen from "./BreachScreen.jsx";
import { FADE_SECONDS, TIMELINE, ZOOM_EASE } from "./introTimeline.js";
import { HoodedFigure, RedAlertGlow, RoomBackground } from "./RoomScene.jsx";
import {
  computeLayout,
  figureTransform,
  roomTransform,
  terminalHeight,
  terminalTransform,
} from "./sceneLayout.js";
import "../terminal/Terminal.css";
import "./Intro.css";

const NOTHING_TYPED = { command: 0, steps: 0 };
const NO_BREACH = { mode: "off", cracked: 0, flash: 0 };

// Measures the screen and the Terminal window (leaving out its button row).
// Phones have no Terminal window on arrival, so the terminal aims for the top of the screen.
function measureLayout() {
  const screenWidth = document.documentElement.clientWidth;
  const terminal = document.querySelector('[data-window="terminal"]');
  if (!terminal) {
    const width = Math.min(screenWidth - 32, 600);
    const target = { left: (screenWidth - width) / 2, top: 56, width, height: 320 };
    return { ...computeLayout(screenWidth, window.innerHeight, target), landsOnWindow: false };
  }

  const frame = terminal.getBoundingClientRect();
  const footer = terminal.querySelector(".terminal-footer");
  const footerHeight = footer ? footer.getBoundingClientRect().height : 0;
  const target = {
    left: frame.left,
    top: frame.top,
    width: frame.width,
    height: frame.height - footerHeight,
  };
  return { ...computeLayout(screenWidth, window.innerHeight, target), landsOnWindow: true };
}

export default function Intro({ autoStart, onReveal, onFinish }) {
  // gate: waiting for Start. playing: the sequence is running. leaving: fading away.
  const [phase, setPhase] = useState("gate");
  const [fadeSeconds, setFadeSeconds] = useState(FADE_SECONDS.normal);
  const [typed, setTyped] = useState(NOTHING_TYPED);
  const [breach, setBreach] = useState(NO_BREACH);
  const [flickering, setFlickering] = useState(false);
  const reducedMotion = useReducedMotion();

  // progress runs from 0 to 1 during the zoom. Every moving layer is worked out from it,
  // so they all stay perfectly in sync.
  const progress = useMotionValue(0);
  const layout = useMotionValue(computeLayout(1280, 800, { left: 0, top: 0, width: 800, height: 400 }));

  const roomStyle = useTransform([layout, progress], ([l, p]) => roomTransform(l, p));
  const figureStyle = useTransform([layout, progress], ([l, p]) => figureTransform(l, p));
  const figureOpacity = useTransform(progress, [0.3, 0.6], [1, 0]);
  const terminalStyle = useTransform([layout, progress], ([l, p]) => terminalTransform(l, p));
  const terminalHeightStyle = useTransform([layout, progress], ([l, p]) => terminalHeight(l, p));
  const terminalWidthStyle = useTransform(layout, (l) => l.terminal.width);
  // On phones there is no window to land on, so the terminal fades away near the end.
  const terminalOpacity = useTransform([layout, progress], ([l, p]) =>
    l.landsOnWindow ? 1 : 1 - Math.min(1, Math.max(0, (p - 0.5) / 0.35))
  );
  const breachOpacity = useTransform(progress, [0, 0.22], [1, 0]);
  // Streaks rush past during the fastest part of the zoom.
  const streakOpacity = useTransform(progress, [0.08, 0.4, 0.75, 0.97], [0, 0.75, 0.75, 0]);
  // A little real blur on computers. Phones rely on the streaks, which cost far less to draw.
  const roomFilter = useTransform([layout, progress], ([l, p]) => {
    if (l.isNarrow) return "none";
    const blur = 3.5 * Math.sin(Math.PI * p);
    return blur < 0.05 ? "none" : `blur(${blur.toFixed(2)}px)`;
  });

  // The whole scene shakes a little when a firewall cracks.
  const shakeX = useMotionValue(0);
  const shakeY = useMotionValue(0);
  const shakes = useRef([]);
  function shake(strength) {
    shakes.current.forEach((running) => running.stop());
    shakes.current = [
      animate(shakeX, [0, -strength, strength * 0.7, -strength * 0.4, 0], { duration: 0.24 }),
      animate(shakeY, [0, strength * 0.5, -strength * 0.5, strength * 0.2, 0], { duration: 0.24 }),
    ];
  }

  // Measure now, and again whenever the window or the loaded fonts change the layout.
  useLayoutEffect(() => {
    const update = () => layout.set(measureLayout());
    update();
    window.addEventListener("resize", update);
    document.fonts?.ready.then(update);
    return () => window.removeEventListener("resize", update);
  }, [layout]);

  function leave(seconds) {
    setFadeSeconds(seconds);
    setPhase("leaving");
  }

  function start() {
    unlockAudio();

    // Reduced motion: no alert, shake, glitch or zoom. One soft tone and a simple fade.
    if (reducedMotion) {
      setTyped({ command: boot.command.length, steps: boot.steps.length });
      playBeep();
      onReveal(false);
      leave(FADE_SECONDS.reducedMotion);
      return;
    }

    setPhase("playing");
  }

  function skip() {
    stopRisingTone();
    onReveal(false);
    leave(FADE_SECONDS.skip);
  }

  // The "reboot" command skips the Start button, since the visitor just asked for this.
  useEffect(() => {
    if (autoStart) start();
    // Only once, when the intro first appears.
  }, []);

  // The main sequence. Each step is scheduled once, and leaving the "playing"
  // phase (the Skip button) cancels whatever has not happened yet.
  useEffect(() => {
    if (phase !== "playing") return undefined;

    const timers = [];
    let zoom = null;
    const at = (time, action) => timers.push(setTimeout(action, time));
    const flashBreach = (changes) =>
      setBreach((current) => ({ ...current, ...changes, flash: current.flash + 1 }));

    // The boot lines.
    const commandCharTime = (TIMELINE.commandEnd - TIMELINE.commandStart) / boot.command.length;
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

    // The breach.
    at(TIMELINE.alertStart, () => {
      flashBreach({ mode: "alert" });
      playAlarm();
    });
    TIMELINE.crackTimes.forEach((time, index) => {
      at(time, () => {
        flashBreach({ cracked: index + 1 });
        playAlarm();
        playCrack();
        shake(5);
      });
    });
    at(TIMELINE.glitchStart, () => {
      flashBreach({ mode: "glitch" });
      playGlitch();
      shake(9);
    });
    at(TIMELINE.grantedStart, () => {
      flashBreach({ mode: "granted" });
      // The tone climbs until the screen has filled the page.
      playRisingTone((TIMELINE.zoomEnd - TIMELINE.grantedStart) / 1000);
    });

    // The zoom.
    at(TIMELINE.zoomStart, () => {
      zoom = animate(progress, 1, {
        duration: (TIMELINE.zoomEnd - TIMELINE.zoomStart) / 1000,
        ease: ZOOM_EASE,
      });
    });
    at(TIMELINE.zoomEnd, () => {
      // A slow device might still be mid-zoom. Land exactly on the Terminal window anyway.
      zoom?.stop();
      progress.set(1);
      setFlickering(true);
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

  const breachIsShowing = breach.mode !== "off";

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
      <motion.div className="intro-stage" style={{ x: shakeX, y: shakeY }}>
        <RoomBackground style={{ transform: roomStyle, filter: roomFilter }} />
        <RedAlertGlow
          style={{ transform: roomStyle }}
          visible={breach.mode === "alert" || breach.mode === "glitch"}
        />

        {/* The same parts as the Terminal window, at its real size and scaled down. */}
        <motion.div
          className="intro-terminal"
          aria-hidden="true"
          style={{
            transform: terminalStyle,
            width: terminalWidthStyle,
            height: terminalHeightStyle,
            opacity: terminalOpacity,
          }}
        >
          <div className="window intro-window">
            <WindowChrome app={appById.terminal} />
            <div className="terminal">
              <div className="terminal-body">
                <BootLog
                  commandChars={typed.command}
                  stepsShown={typed.steps}
                  showCursor={!breachIsShowing && phase !== "leaving"}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* The breach sits on the monitor's screen, so it moves with the room. */}
        {breachIsShowing && (
          <motion.div className="intro-layer" style={{ transform: roomStyle }}>
            <BreachScreen
              mode={breach.mode}
              cracked={breach.cracked}
              flash={breach.flash}
              style={{ opacity: breachOpacity }}
            />
          </motion.div>
        )}

        <HoodedFigure style={{ transform: figureStyle, opacity: figureOpacity }} />
      </motion.div>

      <motion.div className="intro-streaks" style={{ opacity: streakOpacity }} />
      {flickering && <div className="intro-flicker" />}

      <AnimatePresence>
        {phase === "gate" && !autoStart && (
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
