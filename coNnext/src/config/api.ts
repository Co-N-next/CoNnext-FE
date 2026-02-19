// src/config/api.ts
import axios from "axios";

export const API_BASE_URL = import.meta.env.DEV
  ? "/api"
  : "https://api.con-next.xyz";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// ── Access Token 메모리 저장 ──────────────────────────────
// HttpOnly 쿠키가 아닌 응답 헤더로 오는 Access Token을 메모리에 보관
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

// ── 재발급 중복 방지 ──────────────────────────────────────
let isReissuing = false;
let reissueSubscribers: Array<(success: boolean) => void> = [];

const subscribeReissue = (cb: (success: boolean) => void) => {
  reissueSubscribers.push(cb);
};

const notifyReissueSubscribers = (success: boolean) => {
  reissueSubscribers.forEach((cb) => cb(success));
  reissueSubscribers = [];
};

// ── 요청 인터셉터: 저장된 Access Token을 헤더에 자동 첨부 ──
apiClient.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── 응답 인터셉터 ─────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => {
    // 응답 헤더에 authorization이 있으면 저장 (로그인/reissue 응답)
    const authHeader =
      response.headers["authorization"] || response.headers["Authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      setAccessToken(token);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/reissue") &&
      !originalRequest.url?.includes("/auth/signup-info/social") &&
      !originalRequest.url?.includes("/auth/signup/social")
    ) {
      originalRequest._retry = true;

      if (isReissuing) {
        return new Promise((resolve, reject) => {
          subscribeReissue((success) => {
            if (success) resolve(apiClient(originalRequest));
            else reject(error);
          });
        });
      }

      isReissuing = true;
      try {
        // reissue: Refresh Token(쿠키)으로 새 Access Token 발급
        const res = await apiClient.post("/auth/reissue");
        // reissue 응답 헤더에서도 토큰 저장 (인터셉터가 자동 처리)
        const newToken = getAccessToken();
        if (newToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        }
        notifyReissueSubscribers(true);
        return apiClient(originalRequest);
      } catch (reissueError) {
        notifyReissueSubscribers(false);
        setAccessToken(null);
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("userNickname");
        window.location.href = "/login";
        return Promise.reject(reissueError);
      } finally {
        isReissuing = false;
      }
    }

    if (error.response?.status === 500) {
      console.error("서버 오류");
    }

    return Promise.reject(error);
  }
);