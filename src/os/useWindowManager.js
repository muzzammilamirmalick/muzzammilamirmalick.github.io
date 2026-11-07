// Keeps track of every open window: where it is, which is on top and which are minimized.
import { useReducer } from "react";
import { appById } from "./appList.js";
import { fitSize, keepInside, nextWindowPosition } from "./windowLayout.js";

function reducer(state, action) {
  const { windows, topZ } = state;
  const update = (id, changes) => windows.map((win) => (win.id === id ? { ...win, ...changes } : win));

  switch (action.type) {
    case "open": {
      const existing = windows.find((win) => win.id === action.id);
      if (existing) {
        return { topZ: topZ + 1, windows: update(action.id, { minimized: false, z: topZ + 1 }) };
      }
      const size = action.placement ?? fitSize(appById[action.id], action.area);
      const position = action.placement ?? nextWindowPosition(windows.length, size, action.area);
      const win = {
        id: action.id,
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
        z: topZ + 1,
        minimized: false,
        animateIn: true,
      };
      return { topZ: topZ + 1, windows: [...windows, win] };
    }
    case "close":
      return { topZ, windows: windows.filter((win) => win.id !== action.id) };
    case "minimize":
      return { topZ, windows: update(action.id, { minimized: true }) };
    case "focus": {
      // Nothing to do if it is already on top. This avoids needless redraws.
      const target = windows.find((win) => win.id === action.id);
      if (!target || target.z === topZ) return state;
      return { topZ: topZ + 1, windows: update(action.id, { z: topZ + 1 }) };
    }
    case "move":
      return { topZ, windows: update(action.id, { x: action.x, y: action.y }) };
    case "fitAll":
      // The browser window changed size, so bring everything back on screen.
      return {
        topZ,
        windows: windows.map((win) => {
          const width = Math.min(win.width, action.area.width);
          const height = Math.min(win.height, action.area.height);
          return { ...win, width, height, ...keepInside(win.x, win.y, width, height, action.area) };
        }),
      };
    default:
      return state;
  }
}

export function useWindowManager(initialWindows) {
  const [state, dispatch] = useReducer(reducer, {
    windows: initialWindows,
    topZ: 10 + initialWindows.length,
  });

  const visible = state.windows.filter((win) => !win.minimized);
  const topWindow = visible.reduce((top, win) => (!top || win.z > top.z ? win : top), null);

  return { windows: state.windows, topWindow, dispatch };
}
