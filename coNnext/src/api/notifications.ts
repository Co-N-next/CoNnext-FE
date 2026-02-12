import api from "./axios";
import type {
  NotificationListResponse,
  NoticeListResponse,
  AcceptNotificationRequest,
  AcceptNotificationResponse,
} from "../types/notifications";

// 내소식 전체 조회 : /notifications/news
export const notifications = async (
  page: number = 0,
): Promise<NotificationListResponse> => {
  const { data } = await api.get("/notifications/news", {
    params: { page },
  });
  return data;
};

// 위치공유 요청 수락 : /notifications/news/share-locations
export const acceptLocationRequest = async (
  body: AcceptNotificationRequest,
): Promise<AcceptNotificationResponse> => {
  const { data } = await api.post("/notifications/news/share-locations", body);
  return data;
};

// 친구 요청 수락 : /notifications/news/share-mates
export const acceptMateRequest = async (
  body: AcceptNotificationRequest,
): Promise<AcceptNotificationResponse> => {
  const { data } = await api.post("/notifications/news/share-mates", body);
  return data;
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
