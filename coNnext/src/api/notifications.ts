// api/notification.ts

// 내소식 전체 조회 : /notifications/news
import api from "./axios";
import type { MyNotificationResponse, NoticeListResponse } from "../types/notifications";

export const notifications = async (
  page: number = 0,
): Promise<MyNotificationResponse> => {
  const { data } = await api.get("/notifications/news", {
    params: { page },
  });
  return data;
};

//notifications/notices
export const getNotices = async (): Promise<NoticeListResponse> => {
  const response = await api.get("/notifications/notices", {
    params: { page: 0, size: 20 },
  });
  return response.data;
};