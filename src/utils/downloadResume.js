// Starts the resume download, the same way clicking a download link would.
import { profile } from "../data/content.js";

export function downloadResume() {
  const link = document.createElement("a");
  link.href = profile.resume;
  link.download = "";
  link.click();
}
