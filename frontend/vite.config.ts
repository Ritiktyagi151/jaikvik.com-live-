import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  // Yeh line add karein taaki Vite sahi folder se .env uthaye
  envDir: "./", 
  server: {
    host: "0.0.0.0",
    port: 7777,
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
});