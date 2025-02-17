import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
      "@i": new URL("./src/assets/images", import.meta.url).pathname,
      "@component": new URL("./src/component", import.meta.url).pathname,
      "@assets": new URL("./src/assets", import.meta.url).pathname,
      "@styles": new URL("./src/styles", import.meta.url).pathname,
      "@utils": new URL("./src/utils", import.meta.url).pathname,
    },
  },
});
