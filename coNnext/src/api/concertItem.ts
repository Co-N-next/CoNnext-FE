// src/api/concerts.ts
import api from "./axios";

/* ===== Types ===== */

export interface ConcertSchedule {
  detailId: number;
  startAt: string;
  round: number;
  runningTime: number;
}

export interface ConcertByIdPayload {
  id: number;
  name: string;
  posterImage: string;
  ageRating: string;
  noticeUrl: string;
  schedules: ConcertSchedule[];
}

export interface UpcomingConcert {
  concertId: number;
  detailId: number;
  concertName: string;
  posterImage: string;
  startAt: string;
  dday: string;
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

export interface ConcertDetailPayload {
  concertId: number;
  name: string;
  posterImage: string;
  ageRating: string;
  noticeUrl: string;
  detailId: number;
  startAt: string;
  runningTime: number;
  intermission: number;
  round: number;
}

/* ===== API ===== */

/** 최신 공연 10개 조회 */
export const getUpcomingConcerts = async (page: number = 0, size: number = 20) => {
  const res = await api.get<ApiResponse<UpcomingConcert[]>>(
    "/concerts/upcoming",
    { params: { page, size } }
  );
  return res.data;
};

/** 공연 상세 회차 조회 */
export const getConcertDetailById = async (detailId: number | string) => {
  const res = await api.get<ApiResponse<ConcertDetailPayload>>(
    `/concerts/details/${detailId}`
  );
  return res.data;
};

/** 공연 기본 정보 조회 (fallback용) */
export const getConcertById = async (concertId: number | string) => {
  const res = await api.get<ApiResponse<ConcertByIdPayload>>(
    `/concerts/${concertId}`
  );
  return res.data;
};
