// MuzzOS on a computer: the top bar, desktop icons, windows and dock.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import AppIcon from "./AppIcon.jsx";
import { appById, desktopApps, dockAppIds } from "./appList.js";
import { OsContext } from "./OsContext.js";
import TopBar from "./TopBar.jsx";
import { useWindowManager } from "./useWindowManager.js";
import Window from "./Window.jsx";
import { arrivalWindows, getDesktopArea } from "./windowLayout.js";

// The windows already open when the desktop first appears.
function startingWindows(includeWelcome) {
  const layout = arrivalWindows(getDesktopArea());
  const windows = [{ id: "terminal", ...layout.terminal, z: 11, minimized: false, animateIn: false }];
  if (includeWelcome) {
    windows.push({ id: "welcome", ...layout.welcome, z: 12, minimized: false, animateIn: false });
  }
  return windows;
}

export default function Desktop({ whoamiMode, reboot }) {
  const siteRevealed = whoamiMode !== "waiting";
  const [startedBehindIntro] = useState(!siteRevealed);
  const { windows, topWindow, dispatch } = useWindowManager(startingWindows(siteRevealed));
  const areaRef = useRef(null);
  const openers = useRef(new Map()); // What to return keyboard focus to when a window closes.

  // Welcome grows open as the intro hands over to the desktop.
  useEffect(() => {
    if (startedBehindIntro && siteRevealed) {
      dispatch({
        type: "open",
        id: "welcome",
        area: getDesktopArea(),
        placement: arrivalWindows(getDesktopArea()).welcome,
      });
    }
  }, [startedBehindIntro, siteRevealed, dispatch]);

  // Keep every window on screen when the browser is resized.
  useEffect(() => {
    const fit = () => dispatch({ type: "fitAll", area: getDesktopArea() });
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [dispatch]);

  // Finds the icon a window should animate from or to.
  function getIcon(id, preferDock = false) {
    const dock = document.querySelector(`[data-dock-icon="${id}"]`);
    const desktop = document.querySelector(`[data-app-icon="${id}"]`);
    return preferDock ? dock ?? desktop : desktop ?? dock;
  }

  function closeWindow(id) {
    const opener = openers.current.get(id);
    dispatch({ type: "close", id });
    openers.current.delete(id);
    // Send keyboard focus back to where the visitor came from.
    (opener?.isConnected ? opener : getIcon(id))?.focus({ preventScroll: true });
  }

  function minimizeWindow(id) {
    dispatch({ type: "minimize", id });
    document.querySelector(`[data-dock-icon="${id}"]`)?.focus({ preventScroll: true });
  }

  // Esc closes the window on top.
  useEffect(() => {
    if (!siteRevealed) return undefined;
    function handleKeyDown(event) {
      if (event.key === "Escape" && topWindow) closeWindow(topWindow.id);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const os = useMemo(
    () => ({
      whoamiMode,
      reboot,
      openApp(id, opener) {
        if (opener) openers.current.set(id, opener);
        dispatch({ type: "open", id, area: getDesktopArea() });
      },
    }),
    [whoamiMode, reboot, dispatch]
  );

  // The dock shows the regular apps, plus anything else that is open right now.
  const openIds = windows.map((win) => win.id);
  const dockIds = [...dockAppIds, ...openIds.filter((id) => !dockAppIds.includes(id))];

  return (
    <OsContext.Provider value={os}>
      <div className="os">
        <TopBar />
        <main className="desktop-area" ref={areaRef}>
          <nav className="desktop-icons" aria-label="Apps">
            {desktopApps.map((app) => (
              <AppIcon key={app.id} app={app} place="desktop" />
            ))}
          </nav>
          <AnimatePresence>
            {windows.map((win) => (
              <Window
                key={win.id}
                win={win}
                areaRef={areaRef}
                getIcon={getIcon}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                onFocus={(id) => dispatch({ type: "focus", id })}
                onMove={(id, x, y) => dispatch({ type: "move", id, x, y })}
              />
            ))}
          </AnimatePresence>
        </main>
        <nav className="dock" aria-label="Dock">
          {dockIds.map((id) => (
            <AppIcon key={id} app={appById[id]} place="dock" isOpen={openIds.includes(id)} />
          ))}
        </nav>
      </div>
    </OsContext.Provider>
  );
}
