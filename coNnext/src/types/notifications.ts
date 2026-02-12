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

//notifications/news/share-location
// 위치 공유 수락 요청
export interface AcceptLocationRequest {
  user_id: number;
  sender_id: number;
  action?: "REJECT";
}

// 위치 공유 수락 응답
export interface AcceptLocationResponse {
  statusCode: number;
  message: string;
}

//notifications/news/share-mate
// types/mate.ts
//친구 수락 요청
export interface AcceptMateRequest {
  user_id: number; // 현재 로그인한 사용자 (수락하는 사람)
  sender_id: number; // 요청을 보낸 사람
  action?: "REJECT";
}
//친구 수락 응답
export interface AcceptMateResponse {
  statusCode: number;
  message: string;
}

//notifications/notices
// =============================
// 공지사항 하나
// =============================
export interface Notice {
  id: number;
  sender_profile_img: string;
  title: string;
  content: string;
  createdAt: string;
  is_read: boolean;
}

// =============================
// 공지사항 전체 조회 응답
// =============================
export interface NoticeListResponse {
  statusCode: number;
  message: string;
  pageInfo: NotificationPageInfo; // 이미 정의한 거 재사용
  payload: {
    notices: Notice[];
  };
}