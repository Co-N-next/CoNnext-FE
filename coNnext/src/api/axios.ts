// src/config/axios.ts
// ⚠️ 이 파일은 레거시입니다. api.ts의 apiClient를 사용하세요.
// 하드코딩된 Bearer 토큰을 제거했습니다.
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  // ❌ Authorization 하드코딩 제거 - 보안 위험
  // Access Token은 HttpOnly 쿠키 또는 reissue 로직으로 처리
});

export default api;
