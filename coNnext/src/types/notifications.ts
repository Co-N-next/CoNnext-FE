// types/notification.ts

//notifications/news: 내소식 전체 조회 응답값(반응값 없음)
export type NotificationCategory = "MATE" | "NOTICE" | "LOCATION";
export type NotificationActionType = "ACCEPT_REJECT" | "NONE";
export type NotificationActionStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface Notification {
  id: number;
  sender_id: number;
  sender_profile_img: string;
  title: string;
  content: string;
  createdAt: string;
  is_read: boolean;
  category: NotificationCategory;
  action_type: NotificationActionType;
  action_status: NotificationActionStatus;
  img?: string;
}

export interface NotificationPageInfo {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export interface NotificationListResponse {
  statusCode: number;
  message: string;
  pageInfo: NotificationPageInfo;
  payload: {
    news: Notification[];
  };
}

//notifications/news: 내소식 전체 조회 응답값(반응값 없음)
