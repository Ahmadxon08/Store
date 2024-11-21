import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext", // Top-level await qo'llab-quvvatlash uchun eng yuqori darajani tanlang
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext", // Esbuild uchun ham to'g'ri target tanlash
    },
  },
});
