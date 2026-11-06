// The maths for the camera. Given the window size and where the hero terminal sits, it works
// out where everything starts (seeing the whole room) and ends (the screen filling the page).

// The drawing's size, and where the main monitor's screen is inside it. See RoomScene.jsx.
export const SCENE = { width: 1600, height: 1800 };
export const SCREEN = { x: 500, y: 210, width: 600, height: 360 };

const SCREEN_CENTER = {
  x: SCREEN.x + SCREEN.width / 2,
  y: SCREEN.y + SCREEN.height / 2,
};

// The figure sits nearer the camera, so it grows faster and drops out of frame.
const FIGURE_ANCHOR = { x: 650, y: 900 };
const FIGURE_EXTRA_SCALE = 0.7;
const FIGURE_DROP = 0.35; // How far it falls, as a share of the window height.

export function computeLayout(windowWidth, windowHeight, terminalRect) {
  // Phones show a smaller monitor, so more of the room fits and the zoom feels bigger.
  const isNarrow = windowWidth < 760;
  const screenWidth = isNarrow
    ? windowWidth * 0.66
    : Math.min(windowWidth * 0.46, windowHeight * 0.62 * (SCREEN.width / SCREEN.height));

  const startScale = screenWidth / SCREEN.width;
  const screenHeight = SCREEN.height * startScale;
  const startCenter = { x: windowWidth / 2, y: windowHeight * (isNarrow ? 0.36 : 0.42) };

  // At the end the screen covers the whole window, whatever shape the window is.
  const endScale = Math.max(windowWidth / SCREEN.width, windowHeight / SCREEN.height) * 1.05;
  const endCenter = { x: windowWidth / 2, y: windowHeight / 2 };

  // The terminal starts small enough to fit the screen and ends at its real size on the page.
  const terminalStartScale = (screenWidth * 0.92) / terminalRect.width;
  const terminalStartHeight = Math.min(
    terminalRect.height,
    (screenHeight * 0.92) / terminalStartScale
  );

  return {
    startScale,
    endScale,
    startCenter,
    endCenter,
    windowHeight,
    terminal: {
      width: terminalRect.width,
      startHeight: terminalStartHeight,
      endHeight: terminalRect.height,
      startScale: terminalStartScale,
      startX: startCenter.x - (terminalRect.width * terminalStartScale) / 2,
      startY: startCenter.y - (terminalStartHeight * terminalStartScale) / 2,
      endX: terminalRect.left,
      endY: terminalRect.top,
    },
  };
}

const mix = (from, to, progress) => from + (to - from) * progress;

// Multiplying instead of adding makes the zoom feel like a steady push forward.
const mixScale = (from, to, progress) => from * (to / from) ** progress;

// progress goes from 0 (the whole room) to 1 (the screen fills the page).
function roomPosition(layout, progress) {
  const scale = mixScale(layout.startScale, layout.endScale, progress);
  const centerX = mix(layout.startCenter.x, layout.endCenter.x, progress);
  const centerY = mix(layout.startCenter.y, layout.endCenter.y, progress);
  return { scale, x: centerX - SCREEN_CENTER.x * scale, y: centerY - SCREEN_CENTER.y * scale };
}

export function roomTransform(layout, progress) {
  const { x, y, scale } = roomPosition(layout, progress);
  return `translate(${x}px, ${y}px) scale(${scale})`;
}

export function figureTransform(layout, progress) {
  const room = roomPosition(layout, progress);
  const scale = room.scale * (1 + FIGURE_EXTRA_SCALE * progress);
  // Keep the anchor point in place as the figure grows, then let it drop.
  const x = room.x + FIGURE_ANCHOR.x * (room.scale - scale);
  const y =
    room.y +
    FIGURE_ANCHOR.y * (room.scale - scale) +
    FIGURE_DROP * layout.windowHeight * progress;
  return `translate(${x}px, ${y}px) scale(${scale})`;
}

export function terminalTransform(layout, progress) {
  const { terminal } = layout;
  const x = mix(terminal.startX, terminal.endX, progress);
  const y = mix(terminal.startY, terminal.endY, progress);
  const scale = mixScale(terminal.startScale, 1, progress);
  return `translate(${x}px, ${y}px) scale(${scale})`;
}

export function terminalHeight(layout, progress) {
  return mix(layout.terminal.startHeight, layout.terminal.endHeight, progress);
}
