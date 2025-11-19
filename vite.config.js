import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("antd")) return "antd";
            if (id.includes("jodit-react")) return "jodit";
            return "vendor";
          }
        },
      },
    },
  },
  server : {
    host: '0.0.0.0',
    port: 5137
  }
});
