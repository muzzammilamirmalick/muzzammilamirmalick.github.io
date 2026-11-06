// Copies the email address and shows a small toast message.
import { toast } from "sonner";
import { profile } from "../data/content.js";

export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email);
    toast("Email copied");
  } catch {
    // Some browsers block the clipboard. Open the visitor's email app instead.
    window.location.href = `mailto:${profile.email}`;
  }
}
