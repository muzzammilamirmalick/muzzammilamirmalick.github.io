import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "/" is correct because the site lives at the root of
// https://muzzammilmalick.github.io
export default defineConfig({
  plugins: [react()],
  base: "/",
});
