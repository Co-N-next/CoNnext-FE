// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.con-next.xyz",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      /**
       * OAuth2 소셜 로그인 진입점
       * 브라우저를 소셜 로그인 페이지로 보내는 역할
       * ⚠️ followRedirects 사용 X - 브라우저가 리다이렉트를 직접 따라가야
       *    쿠키(Signup Token / Refresh Token)가 브라우저에 정상 전달됨
       */
      "/oauth2": {
        target: "https://api.con-next.xyz",
        changeOrigin: true,
        secure: true,
      },
      /**
       * OAuth2 콜백 프록시 (필수!)
       * 소셜 로그인 후 카카오/구글/네이버가 백엔드로 code를 전달하는 경로
       * 이 프록시가 없으면 브라우저가 Vite 개발서버에서 401을 받음
       * 백엔드가 처리 후 /signup/terms 또는 /home 으로 리다이렉트함
       */
      "/login/oauth2": {
        target: "https://api.con-next.xyz",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
