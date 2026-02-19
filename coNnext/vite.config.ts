import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const proxy = {
  "/api": {
    target: "https://api.con-next.xyz",
    changeOrigin: true,
    secure: true,
    rewrite: (path: string) => path.replace(/^\/api/, ""),
  },
  "/oauth2": {
    target: "https://api.con-next.xyz",
    changeOrigin: true,
    secure: true,
  },
  "/login/oauth2": {
    target: "https://api.con-next.xyz",
    changeOrigin: true,
    secure: true,
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy,
  },
  preview: {
    proxy,
  },
});
