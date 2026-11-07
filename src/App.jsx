// The top of the app. It shows the intro on top of MuzzOS, then removes it when it finishes.
// MuzzOS is loaded from the start, so the intro can measure where the Terminal window sits.
import { useCallback, useState } from "react";
import { Toaster } from "sonner";
import Intro from "./components/intro/Intro.jsx";
import MuteButton from "./components/layout/MuteButton.jsx";
import Desktop from "./os/Desktop.jsx";
import PhoneHome from "./os/PhoneHome.jsx";
import { useIsPhone } from "./os/useIsPhone.js";
import Wallpaper from "./os/Wallpaper.jsx";
import "./os/Os.css";

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
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntro());
  // "waiting" while the intro is covering MuzzOS, then "typing" or "done". See Whoami.jsx.
  const [whoamiMode, setWhoamiMode] = useState(() => (hasSeenIntro() ? "done" : "waiting"));

  // The "reboot" easter egg is connected in a later step.
  const reboot = useCallback(() => {}, []);

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

      {/* "inert" stops clicks and the Tab key from reaching MuzzOS behind the intro. */}
      <div inert={whoamiMode === "waiting"}>
        <Shell whoamiMode={whoamiMode} reboot={reboot} />
      </div>

      {showIntro && (
        <Intro
          onReveal={(animated) => setWhoamiMode(animated ? "typing" : "done")}
          onFinish={() => {
            rememberIntroSeen();
            setShowIntro(false);
          }}
        />
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
