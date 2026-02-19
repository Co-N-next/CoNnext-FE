// types/notification.ts
import type { Notice } from "../components/NoticesCard";
export type { Notice };//notifications/news: 내소식 전체 조회 응답값(반응값 없음)
// ==============================
// Notification Enums
// ==============================

export type NotificationCategory =
  | "MATE"
  | "LOCATION"
  | "NOTICE";

export type NotificationActionType =
  | "NONE"
  | "ACCEPT_REJECT";

export type NotificationActionStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED";


// ==============================
// PageInfo
// ==============================

export interface PageInfo {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}


// ==============================
// Single Notification Item
// ==============================

export interface NewsItem {
  id: number;
  senderProfileImg: string;
  senderId: number;
  title: string;
  content: string;
  createdAt: string; // ISO Date string
  category: NotificationCategory;
  actionType: NotificationActionType;
  actionStatus: NotificationActionStatus;
  img: string;
  read: boolean;
}


// ==============================
// Inner Payload (news wrapper)
// ==============================

export interface MyNotificationInnerPayload {
  news: NewsItem[];
}


// ==============================
// Payload
// ==============================

export interface MyNotificationPayload {
  pageInfo: PageInfo;
  payload: MyNotificationInnerPayload;
}


// ==============================
// Final API Response
// ==============================

export interface MyNotificationResponse {
  statusCode: number;
  message: string;
  payload: MyNotificationPayload;
}
//notifications/news: 내소식 전체 조회 응답값(반응값 없음)


//notifications/notices

// 2️⃣ 페이지 정보
export interface PageInfo {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

// 3️⃣ notices 감싸는 payload
export interface NoticePayload {
  notices: Notice[];
}

// 4️⃣ payload 전체 구조
export interface NoticeResponsePayload {
  pageInfo: PageInfo;
  payload: NoticePayload;
}

// 5️⃣ 최종 API 응답 타입
export interface NoticeListResponse {
  statusCode: number;
  message: string;
  payload: NoticeResponsePayload;
}