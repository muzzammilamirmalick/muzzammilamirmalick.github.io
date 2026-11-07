// MuzzOS on a phone: a home screen with an app grid and dock. Apps open full screen.
// Each open app is added to the browser's history, so the phone's back button closes it.
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import WelcomeApp from "../apps/WelcomeApp.jsx";
import Icon from "../components/ui/Icon.jsx";
import AppIcon from "./AppIcon.jsx";
import { appById, desktopApps, dockAppIds } from "./appList.js";
import { OsContext } from "./OsContext.js";
import TopBar from "./TopBar.jsx";

const EASE_OUT = [0.22, 1, 0.36, 1];

function PhoneApp({ id, onBack, isTop }) {
  const app = appById[id];
  const reducedMotion = useReducedMotion();
  const backRef = useRef(null);

  // Move focus into the app when it opens, so keyboards and screen readers follow.
  useEffect(() => {
    if (isTop) backRef.current.focus({ preventScroll: true });
  }, [isTop]);

  const hidden = reducedMotion ? { opacity: 0 } : { y: "100%" };
  return (
    <motion.section
      className="phone-app"
      data-window={id}
      role="dialog"
      aria-labelledby={`phone-title-${id}`}
      inert={!isTop}
      initial={hidden}
      animate={reducedMotion ? { opacity: 1 } : { y: 0 }}
      exit={hidden}
      transition={{ duration: reducedMotion ? 0.12 : 0.3, ease: EASE_OUT }}
    >
      <header className="phone-app-bar">
        <button ref={backRef} type="button" className="phone-back" onClick={onBack}>
          <Icon name="back" size={18} />
          Back
        </button>
        <span className="phone-app-title" id={`phone-title-${id}`}>
          {app.label}
        </span>
      </header>
      <div className="phone-app-body">
        <Suspense fallback={<p className="app-pad app-loading">Loading...</p>}>
          <app.Component />
        </Suspense>
      </div>
    </motion.section>
  );
}

export default function PhoneHome({ whoamiMode, reboot }) {
  const [stack, setStack] = useState([]); // The open apps. The last one is on top.
  const stackRef = useRef(stack);
  const openers = useRef(new Map()); // What to return focus to when each app closes.

  // Whenever an app closes, send keyboard focus back to where it was opened from.
  // This waits until after the update, because the home screen can't take focus while covered.
  useEffect(() => {
    const previous = stackRef.current;
    stackRef.current = stack;
    if (stack.length >= previous.length) return;
    const closedId = previous[previous.length - 1];
    const opener = openers.current.get(closedId);
    openers.current.delete(closedId);
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  }, [stack]);

  // The browser's back button removes the top app.
  useEffect(() => {
    const handlePopState = () => setStack((current) => current.slice(0, -1));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Esc works like back on phones with a keyboard, and in small browser windows.
  useEffect(() => {
    if (stack.length === 0) return undefined;
    function handleKeyDown(event) {
      if (event.key === "Escape") window.history.back();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stack.length]);

  const os = useMemo(
    () => ({
      whoamiMode,
      reboot,
      openApp(id, opener) {
        if (stackRef.current.includes(id)) return;
        if (opener) openers.current.set(id, opener);
        window.history.pushState({ muzzosApp: id }, "");
        setStack((current) => [...current, id]);
      },
    }),
    [whoamiMode, reboot]
  );

  // Apps in the dock are not repeated in the grid.
  const gridApps = desktopApps.filter((app) => !dockAppIds.includes(app.id));

  return (
    <OsContext.Provider value={os}>
      <div className="os phone-os">
        <TopBar />
        <main className="phone-home" inert={stack.length > 0}>
          <section className="phone-welcome" aria-label="Welcome">
            <WelcomeApp />
          </section>
          <nav className="phone-grid" aria-label="Apps">
            {gridApps.map((app) => (
              <AppIcon key={app.id} app={app} place="phone" />
            ))}
          </nav>
        </main>
        <nav className="dock phone-dock" aria-label="Dock" inert={stack.length > 0}>
          {dockAppIds.map((id) => (
            <AppIcon key={id} app={appById[id]} place="phone" />
          ))}
        </nav>
        <AnimatePresence>
          {stack.map((id, index) => (
            <PhoneApp
              key={id}
              id={id}
              isTop={index === stack.length - 1}
              onBack={() => window.history.back()}
            />
          ))}
        </AnimatePresence>
      </div>
    </OsContext.Provider>
  );
}
