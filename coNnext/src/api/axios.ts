import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.con-next.xyz/v1",
});
