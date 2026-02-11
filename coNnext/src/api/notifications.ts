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