import axios from "axios";

const api = axios.create({
  baseURL: "https://api.con-next.xyz",
  withCredentials: true, // ⭐⭐⭐ 쿠키 받기 필수
});

export default api;
