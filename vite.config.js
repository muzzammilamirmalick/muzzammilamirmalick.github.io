import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { renderSimplePage } from "./src/simple/renderSimplePage.js";

// Fills simple.html with content when Vite serves or builds it.
// Vite restarts itself when content.js changes, so Simple view stays up to date.
function simplePagePlugin() {
  return {
    name: "simple-page",
    transformIndexHtml(html) {
      return html.replace("<!-- simple-page-content -->", renderSimplePage());
    },
  };
}

// base "/" is correct because the site lives at the root of
// https://muzzammilamirmalick.github.io
export default defineConfig({
  plugins: [react(), simplePagePlugin()],
  base: "/",
  build: {
    // The site has two pages: MuzzOS (index.html) and Simple view (simple.html).
    rollupOptions: {
      input: {
        main: "index.html",
        simple: "simple.html",
      },
    },
  },
});
