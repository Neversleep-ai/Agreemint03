import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@app": path.resolve(__dirname, "./src/app"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks for better caching
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react"
            }
            if (id.includes("@tanstack/react-query")) {
              return "query"
            }
            if (id.includes("socket.io-client")) {
              return "socket"
            }
            if (id.includes("axios")) {
              return "http"
            }
            return "vendor"
          }

          // Feature-based chunks
          if (id.includes("features/contracts")) return "contracts"
          if (id.includes("features/negotiations")) return "negotiations"
          if (id.includes("features/agents")) return "agents"
          if (id.includes("shared")) return "shared"
        },
      },
    },
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/socket.io": {
        target: "http://localhost:8080",
        ws: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
      "zustand",
      "socket.io-client",
      "axios",
    ],
  },
})
