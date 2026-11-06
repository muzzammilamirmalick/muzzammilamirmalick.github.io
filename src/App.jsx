// The top of the app. It shows the intro on top of the site, then removes it when it finishes.
// The site is loaded from the start, so the intro can measure where the hero terminal sits.
import { useRef, useState } from "react";
import { Toaster } from "sonner";
import Intro from "./components/intro/Intro.jsx";
import Background from "./components/layout/Background.jsx";
import MuteButton from "./components/layout/MuteButton.jsx";
import Nav from "./components/layout/Nav.jsx";
import { SiteReady } from "./components/layout/SiteReady.js";
import Hero from "./components/sections/Hero.jsx";
import About from "./components/sections/About.jsx";
import Projects from "./components/sections/Projects.jsx";
import Experience from "./components/sections/Experience.jsx";
import Skills from "./components/sections/Skills.jsx";
import Certifications from "./components/sections/Certifications.jsx";
import Contact from "./components/sections/Contact.jsx";

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
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntro());
  // "waiting" while the intro is covering the site, then "typing" or "done". See Whoami.jsx.
  const [whoamiMode, setWhoamiMode] = useState(() => (hasSeenIntro() ? "done" : "waiting"));
  const heroTerminalRef = useRef(null);

  function handleIntroFinish() {
    rememberIntroSeen();
    setShowIntro(false);

    // Ready to type on a computer. Skipped on phones so the keyboard doesn't pop up.
    if (window.matchMedia("(pointer: fine)").matches) {
      document.getElementById("terminal-input")?.focus({ preventScroll: true });
    }
  }

  return (
    <SiteReady.Provider value={whoamiMode !== "waiting"}>
      <Background />

      {/* "inert" stops clicks and the Tab key from reaching the site behind the intro. */}
      <div inert={whoamiMode === "waiting"}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <Hero whoamiMode={whoamiMode} terminalRef={heroTerminalRef} />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Certifications />
          <Contact />
        </main>
      </div>

      {showIntro && (
        <Intro
          heroTerminalRef={heroTerminalRef}
          onReveal={(animated) => setWhoamiMode(animated ? "typing" : "done")}
          onFinish={handleIntroFinish}
        />
      )}

      <MuteButton />
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
    </SiteReady.Provider>
  );
}
