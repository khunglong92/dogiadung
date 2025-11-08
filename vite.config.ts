import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import tailwindcss from "vite-plugin-tailwindcss";

export default defineConfig({
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
    outDir: "build",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes("node_modules")) {
            // React and React DOM
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            // TanStack Router
            if (id.includes("@tanstack/react-router")) {
              return "tanstack-router-vendor";
            }
            // TanStack Query
            if (id.includes("@tanstack/react-query")) {
              return "tanstack-query-vendor";
            }
            // Mantine UI
            if (id.includes("@mantine")) {
              return "mantine-vendor";
            }
            // Motion/Framer Motion
            if (id.includes("motion") || id.includes("framer-motion")) {
              return "motion-vendor";
            }
            // Lucide icons
            if (id.includes("lucide-react")) {
              return "icons-vendor";
            }
            // i18next
            if (id.includes("i18next") || id.includes("react-i18next")) {
              return "i18n-vendor";
            }
            // Other large libraries
            if (
              id.includes("sonner") ||
              id.includes("zod") ||
              id.includes("react-hook-form")
            ) {
              return "utils-vendor";
            }
            // Other node_modules
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    open: true,
  },
});
