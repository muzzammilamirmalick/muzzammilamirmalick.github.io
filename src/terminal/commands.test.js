import { describe, expect, it, vi } from "vitest";
import { commandNames, findMatches, isClearCommand, runCommand } from "./commands.js";

const fakeOs = () => ({ openApp: vi.fn(), reboot: vi.fn() });

describe("runCommand", () => {
  it("lists every visible command in help", () => {
    const lines = runCommand("help", fakeOs());
    expect(lines.map((line) => line.label)).toEqual(commandNames);
  });

  it("ignores capital letters and extra spaces", () => {
    expect(runCommand("  HELP ", fakeOs())).toEqual(runCommand("help", fakeOs()));
  });

  it("opens the matching app", () => {
    const os = fakeOs();
    runCommand("projects", os);
    expect(os.openApp).toHaveBeenCalledWith("projects", undefined);
  });

  it("runs hidden commands", () => {
    const os = fakeOs();
    runCommand("reboot", os);
    expect(os.reboot).toHaveBeenCalled();
  });

  it("does not treat built-in object names as commands", () => {
    const [line] = runCommand("constructor", fakeOs());
    expect(line.text).toMatch(/command not found/);
  });
});

describe("findMatches", () => {
  it("finds commands that start with what was typed", () => {
    expect(findMatches("pro")).toEqual(["projects"]);
  });

  it("returns nothing for empty input", () => {
    expect(findMatches("   ")).toEqual([]);
  });

  it("only suggests hidden commands after two letters", () => {
    expect(findMatches("s")).not.toContain("sudo hire muzzammil");
    expect(findMatches("su")).toContain("sudo hire muzzammil");
  });
});

describe("isClearCommand", () => {
  it("matches clear in any case", () => {
    expect(isClearCommand(" Clear ")).toBe(true);
    expect(isClearCommand("help")).toBe(false);
  });
});
