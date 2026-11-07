// Works out where windows should appear, so they fit the screen and stay tidy.
import { appById } from "./appList.js";

// These match --bar-height and --dock-height in Os.css.
const BAR_HEIGHT = 40;
const DOCK_HEIGHT = 76;
const ICONS_WIDTH = 200; // The space the desktop icons take up on the left.
const GAP = 16;

// The area windows can move around in: between the top bar and the dock.
export function getDesktopArea() {
  return {
    width: document.documentElement.clientWidth,
    height: window.innerHeight - BAR_HEIGHT - DOCK_HEIGHT,
  };
}

// Keeps a window fully on screen.
export function keepInside(x, y, width, height, area) {
  return {
    x: Math.max(0, Math.min(x, area.width - width)),
    y: Math.max(0, Math.min(y, area.height - height)),
  };
}

export function fitSize(app, area) {
  return {
    width: Math.min(app.width, area.width - GAP),
    height: Math.min(app.height, area.height - GAP),
  };
}

// Places Terminal and Welcome side by side on arrival. On smaller
// screens Terminal shrinks first, so the two windows still don't overlap.
export function arrivalWindows(area) {
  const terminal = fitSize(appById.terminal, area);
  const welcome = fitSize(appById.welcome, area);
  const available = area.width - ICONS_WIDTH - GAP;
  const fitsSideBySide = available >= 420 + GAP + welcome.width;

  if (fitsSideBySide) {
    terminal.width = Math.min(terminal.width, available - GAP - welcome.width);
    // A narrower terminal wraps its buttons onto more rows, so it needs more height.
    if (terminal.width < 520) terminal.height = Math.min(540, area.height - GAP);
  }
  const groupWidth = terminal.width + GAP + welcome.width;
  const left = fitsSideBySide
    ? ICONS_WIDTH + Math.max(0, (available - groupWidth) / 2)
    : Math.max(0, area.width - terminal.width - GAP);
  const top = Math.max(GAP / 2, (area.height - terminal.height) / 3);

  return {
    terminal: { ...terminal, x: left, y: top },
    welcome: fitsSideBySide
      ? { ...welcome, x: left + terminal.width + GAP, y: top }
      : { ...welcome, ...keepInside(area.width, area.height, welcome.width, welcome.height, area) },
  };
}

// Each new window opens a little further along, so they don't stack exactly.
export function nextWindowPosition(count, size, area) {
  const step = 28 * (count % 6);
  return keepInside(ICONS_WIDTH + step, 12 + step, size.width, size.height, area);
}
