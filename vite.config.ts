/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this app from a /Microsoft_Authentication_Sample_React/ sub-path,
// so the build output must reference assets relative to that base, not the domain root.
export default defineConfig({
  base: "/Microsoft_Authentication_Sample_React/",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    css: true,
  },
});
