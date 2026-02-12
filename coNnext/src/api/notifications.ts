import type {
  AcceptLocationRequest,
  AcceptMateRequest,
  NoticeListResponse,
} from "../types/notifications";
// api/notification.ts

// 내소식 전체 조회 : /notifications/news
import api from "./axios";
import type { NotificationListResponse } from "../types/notifications";

export const notifications = async (
  page: number = 0,
): Promise<NotificationListResponse> => {
  const { data } = await api.get("/notifications/news", {
    params: { page },
  });
  return data;
};

//위치공유요청 수락 거절
export const acceptLocationRequest = async (body: AcceptLocationRequest) => {
  return api.post("/notifications/news/share-location", body);
};

//친구 요청 수락 거절
export const acceptMateRequest = async (body: AcceptMateRequest) => {
  return api.post("/notifications/news/share-mate", body);
};

// 공지사항 전체 조회 : /notifications/notices
export const fetchNotices = async (
  page: number = 0,
): Promise<NoticeListResponse> => {
  const { data } = await api.get("/notifications/notices", {
    params: { page },
  });
  return data;
};
