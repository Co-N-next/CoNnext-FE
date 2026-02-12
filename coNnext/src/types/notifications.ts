// types/notification.ts

//notifications/news: 내소식 전체 조회 응답값
export type NotificationCategory = "MATE" | "NOTICE" | "LOCATION";
export type NotificationActionType = "ACCEPT_REJECT" | "NONE";
export type NotificationActionStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface Notification {
  id: number;
  senderId: number;
  senderProfileImg: string;
  title: string;
  content: string;
  createdAt: string;
  read: boolean;
  category: NotificationCategory;
  actionType: NotificationActionType;
  actionStatus: NotificationActionStatus;
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
    pageInfo: NotificationPageInfo;
    payload: {
      news: Notification[];
    };
  };
}

// =============================
// 위치 공유 수락 / 메이트 수락 공통
// POST /notifications/news/share-locations
// POST /notifications/news/share-mates
// =============================
export interface AcceptNotificationRequest {
  notificationId: number;
}

export interface AcceptNotificationResponse {
  statusCode: number;
  message: string;
  pageInfo: NotificationPageInfo;
  payload: Record<string, never>; // 빈 객체 {}
}

//notifications/notices
// =============================
// 공지사항 하나
// =============================
export interface Notice {
  id: number;
  senderProfileImg: string;
  title: string;
  content: string;
  createdAt: string;
  read: boolean;
}

// =============================
// 공지사항 전체 조회 응답
// =============================
export interface NoticeListResponse {
  statusCode: number;
  message: string;
  pageInfo: NotificationPageInfo;
  payload: {
    notices: Notice[];
  };
}
