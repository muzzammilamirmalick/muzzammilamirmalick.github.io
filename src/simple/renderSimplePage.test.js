import { describe, expect, it } from "vitest";
import { profile } from "../data/content.js";
import { renderSimplePage } from "./renderSimplePage.js";

describe("renderSimplePage", () => {
  const html = renderSimplePage();

  it("includes my name and email", () => {
    expect(html).toContain(profile.name);
    expect(html).toContain(`mailto:${profile.email}`);
  });

  it("escapes special characters from content.js", () => {
    expect(html).toContain("Click &amp; Collect");
    expect(html).not.toContain("Click & Collect");
  });
});
