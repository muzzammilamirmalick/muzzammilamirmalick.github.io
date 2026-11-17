import { describe, expect, it } from "vitest";
import { arrivalWindows, fitSize, keepInside, nextWindowPosition } from "./windowLayout.js";

const area = { width: 1440, height: 784 };

describe("keepInside", () => {
  it("leaves a window alone when it already fits", () => {
    expect(keepInside(100, 100, 400, 300, area)).toEqual({ x: 100, y: 100 });
  });

  it("pulls a window back from the right and bottom edges", () => {
    expect(keepInside(1300, 700, 400, 300, area)).toEqual({ x: 1040, y: 484 });
  });

  it("never goes past the top left corner", () => {
    expect(keepInside(-50, -50, 400, 300, area)).toEqual({ x: 0, y: 0 });
  });
});

describe("fitSize", () => {
  it("shrinks a window that is bigger than the screen", () => {
    const small = { width: 500, height: 400 };
    expect(fitSize({ width: 800, height: 600 }, small)).toEqual({ width: 484, height: 384 });
  });
});

describe("nextWindowPosition", () => {
  it("steps each new window a little further along, then starts over", () => {
    const size = { width: 400, height: 300 };
    const first = nextWindowPosition(0, size, area);
    const second = nextWindowPosition(1, size, area);
    expect(second.x - first.x).toBe(28);
    expect(nextWindowPosition(6, size, area)).toEqual(first);
  });
});

describe("arrivalWindows", () => {
  it("puts Terminal and Welcome side by side without overlapping", () => {
    const { terminal, welcome } = arrivalWindows(area);
    expect(terminal.x + terminal.width).toBeLessThanOrEqual(welcome.x);
  });
});
