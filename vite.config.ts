import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [react(), TanStackRouterVite(), tailwindcss()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@admin": path.resolve(__dirname, "./src/page/admin"),
    },
  },
  build: {
    target: "esnext",
    outDir: "dist",
    chunkSizeWarningLimit: 1500, // Adjusted chunk size warning limit
  },
  server: {
    port: 3000,
    open: true,
  },
});
