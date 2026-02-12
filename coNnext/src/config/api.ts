import axios from "axios";

// API 기본 URL 설정
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "/api" : "https://api.con-next.xyz");

// axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  // headers: {
  //   'Content-Type': 'application/json',
  // }
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6IkFDQ0VTUyIsInJvbGUiOiJVU0VSIiwibWVtYmVySWQiOjEsImlhdCI6MTc3MDg3NTkyMiwiZXhwIjo0OTI0NDc1OTIyfQ.ioSE66SW-EIrHqwfrBS3xBEbxYTcclwcz3la4ICUux-3vDVNqzd7-BT7FbhQSq8qZyiATCgjkCLOu-tYqwVCzw",
  },
});

// 요청 인터셉터 (필요시 토큰 추가 등)
apiClient.interceptors.request.use(
  (config) => {
    // 추후 인증 토큰이 필요한 경우 여기서 추가
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (전역 에러 처리)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 전역 에러 처리 로직
    if (error.response?.status === 401) {
      // 인증 실패 처리
      console.error('인증 실패');
    } else if (error.response?.status === 500) {
      console.error('서버 오류');
    }
    return Promise.reject(error);
  }
);
