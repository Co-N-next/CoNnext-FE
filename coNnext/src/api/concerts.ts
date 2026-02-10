// src/api/concerts.ts
import { api } from "./api";

/* ===== Types ===== */

export interface ConcertSchedule {
  detailId: number;
  startAt: string;
  round: number;
  runningTime: number;
}

export interface RecentConcert {
  id: number;
  name: string;
  posterImage: string;
  ageRating: string;
  noticeUrl: string;
  price: string;
  reservationLink: string;
  schedules: ConcertSchedule[];
}

export interface PageInfo {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  pageInfo: PageInfo;
  payload: T;
}

/* ===== API ===== */

/** 최신 공연 10개 조회 */
export const getRecentConcerts = async () => {
  const res = await api.get<ApiResponse<RecentConcert[]>>(
    "/concerts/recent"
  );
  return res.data;
};
