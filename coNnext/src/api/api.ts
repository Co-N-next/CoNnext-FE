// src/api/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.con-next.xyz",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

