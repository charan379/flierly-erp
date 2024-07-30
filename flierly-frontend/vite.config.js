import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 10000,
  },
  plugins: [react()],
  resolve: {
    base: "/",
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
