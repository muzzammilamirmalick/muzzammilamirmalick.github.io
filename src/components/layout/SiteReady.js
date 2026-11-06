// Tells components whether the site is showing yet. Headings use it so they
// don't type themselves out while the intro is still covering the page.
import { createContext } from "react";

export const SiteReady = createContext(true);
