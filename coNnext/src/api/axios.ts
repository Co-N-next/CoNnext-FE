import axios from "axios";
import { API_BASE_URL } from "../config/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
   headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6IkFDQ0VTUyIsInJvbGUiOiJVU0VSIiwibWVtYmVySWQiOjEsImlhdCI6MTc3MDg3NTkyMiwiZXhwIjo0OTI0NDc1OTIyfQ.ioSE66SW-EIrHqwfrBS3xBEbxYTcclwcz3la4ICUux-3vDVNqzd7-BT7FbhQSq8qZyiATCgjkCLOu-tYqwVCzw",
  },
});

export default api;