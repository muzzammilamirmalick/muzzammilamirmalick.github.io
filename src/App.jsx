// The top of the app. It shows the intro on top of MuzzOS, then removes it when it finishes.
// MuzzOS is loaded from the start, so the intro can measure where the Terminal window sits.
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { toast, Toaster } from "sonner";
import { playRisingTone, unlockAudio } from "./audio/sounds.js";
import Intro from "./components/intro/Intro.jsx";
import MuteButton from "./components/layout/MuteButton.jsx";
import { useKonami } from "./easterEggs/useKonami.js";
import Desktop from "./os/Desktop.jsx";
import PhoneHome from "./os/PhoneHome.jsx";
import { useIsPhone } from "./os/useIsPhone.js";
import Wallpaper from "./os/Wallpaper.jsx";
import "./os/Os.css";

// Loaded only if someone actually finds it.
const Flyover = lazy(() => import("./easterEggs/Flyover.jsx"));

const SEEN_KEY = "portfolio-intro-seen";

// sessionStorage lasts until the tab closes, so a refresh skips the intro but a new visit
// plays it. Browsers can block storage, so these two helpers must never crash the site.
function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "true";
  } catch {
    return false;
  }
}

function rememberIntroSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "true");
  } catch {
    // Nothing to do. The intro will just play again after a refresh.
  }
}

export default function App() {
  const isPhone = useIsPhone();
  const reducedMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntro());
  // "waiting" while the intro is covering MuzzOS, then "typing" or "done". See Whoami.jsx.
  const [whoamiMode, setWhoamiMode] = useState(() => (hasSeenIntro() ? "done" : "waiting"));
  const [bootCount, setBootCount] = useState(0); // Goes up each time someone types "reboot".
  const [flyoverKey, setFlyoverKey] = useState(0); // Above zero while the Konami surprise plays.

  // A refresh skips the Start button, so sound is switched on by the first click or key press.
  useEffect(() => {
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  // The "reboot" command: back to the room, with a fresh desktop underneath.
  const reboot = useCallback(() => {
    setWhoamiMode("waiting");
    setShowIntro(true);
    setBootCount((count) => count + 1);
  }, []);

  // The Konami code.
  const celebrate = useCallback(() => {
    playRisingTone(0.9);
    toast("Cheat code accepted. Cleared for takeoff.");
    setFlyoverKey((key) => key + 1);
  }, []);
  useKonami(celebrate);

  const Shell = isPhone ? PhoneHome : Desktop;

  return (
    <>
      <Wallpaper />

      {/* The first stop for keyboards and screen readers. Hidden until it has focus. */}
      <a className="skip-link" href="/simple.html">
        Skip to Simple view
      </a>

      {/* Early in the page, so keyboard users can reach it quickly. */}
      <MuteButton />

      {/* "inert" stops clicks and the Tab key from reaching MuzzOS behind the intro.
          Changing the key makes React build a brand new desktop after a reboot. */}
      <div inert={whoamiMode === "waiting"} className={flyoverKey > 0 && !reducedMotion ? "is-celebrating" : undefined}>
        <Shell key={bootCount} whoamiMode={whoamiMode} reboot={reboot} />
      </div>

      {showIntro && (
        <Intro
          key={bootCount}
          autoStart={bootCount > 0}
          onReveal={(animated) => setWhoamiMode(animated ? "typing" : "done")}
          onFinish={() => {
            rememberIntroSeen();
            setShowIntro(false);
          }}
        />
      )}

      {flyoverKey > 0 && !reducedMotion && (
        <Suspense fallback={null}>
          <Flyover key={flyoverKey} onDone={() => setFlyoverKey(0)} />
        </Suspense>
      )}

      <Toaster
        position="bottom-center"
        theme="dark"
        toastOptions={{
          style: {
            background: "var(--surface)",
            border: "1px solid var(--amber)",
            color: "var(--amber)",
            fontFamily: "var(--font-mono)",
          },
        }}
      />
    </>
  );
}
