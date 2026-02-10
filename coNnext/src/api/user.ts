import api from "./api";

export const getMyInfo = () => {
  return api.get("/users/me");
};

// 커밋용 주석 추가