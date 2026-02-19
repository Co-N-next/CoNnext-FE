// src/config/api.ts
import axios from "axios";

const isLocalHost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  (isLocalHost ? "/api" : "https://api.con-next.xyz");

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// ?�?� Access Token 메모�??�???�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// HttpOnly 쿠키가 ?�닌 ?�답 ?�더�??�는 Access Token??메모리에 보�?
let accessToken: string | null = localStorage.getItem("accessToken");

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
  }
};

export const getAccessToken = () => accessToken;

// ?�?� ?�발�?중복 방�? ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
let isReissuing = false;
let reissueSubscribers: Array<(success: boolean) => void> = [];

const subscribeReissue = (cb: (success: boolean) => void) => {
  reissueSubscribers.push(cb);
};

const notifyReissueSubscribers = (success: boolean) => {
  reissueSubscribers.forEach((cb) => cb(success));
  reissueSubscribers = [];
};

// ?�?� ?�청 ?�터?�터: ?�?�된 Access Token???�더???�동 첨�? ?�?�
apiClient.interceptors.request.use(
  (config) => {
    const url = config.url ?? "";
    const isPublicAuthEndpoint =
      url.includes("/auth/login/local") ||
      url.includes("/auth/signup/local") ||
      url.includes("/auth/signup/social") ||
      url.includes("/auth/signup-info/social") ||
      url.includes("/auth/email/availability") ||
      url.includes("/auth/terms");

    if (accessToken && !isPublicAuthEndpoint) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ?�?� ?�답 ?�터?�터 ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
apiClient.interceptors.response.use(
  (response) => {
    // ?�답 ?�더??authorization???�으�??�??(로그??reissue ?�답)
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
        // reissue: Refresh Token(쿠키)?�로 ??Access Token 발급
        await apiClient.post("/auth/reissue");
        // reissue ?�답 ?�더?�서???�큰 ?�??(?�터?�터가 ?�동 처리)
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
      console.error("?�버 ?�류");
    }

    return Promise.reject(error);
  }
);

