import { apiClient } from "../config/api";
import type { Concert } from "../types/concert";

// ✅ 1. 공연 기본 조회 응답 타입
interface ConcertResponse {
  id: number;
  name: string;
  posterImage: string;
  ageRating?: string;
  noticeUrl?: string;
  price?: string;
  reservationLink?: string;
  
  // 스케줄 정보 (배열)
  schedules: {
    detailId: number;
    startAt: string; // "2026-02-11T08:49:27.096Z"
    round?: number;
    runningTime?: number;
  }[];
}

// ✅ 2. 공연 상세 회차 조회 응답 타입
interface ConcertDetailResponse {
  concertId: number;
  name: string;
  posterImage: string;
  ageRating?: string;
  noticeUrl?: string;
  detailId: number;
  startAt: string; // "2026-02-11T08:49:27.105Z"
  runningTime?: number;
  intermission?: number; // 인터미션 시간 (분)
  round?: number;
}

// --- [Helper] 유틸 함수 ---
// ISO 날짜 문자열을 파싱하는 유틸 함수
const parseDateTime = (isoString: string) => {
  if (!isoString) return { date: "", time: "" };
  const [datePart, timePart] = isoString.split("T");
  return {
    date: datePart || "",
    time: timePart ? timePart.slice(0, 5) : ""
  };
};

// --- [Helper] 데이터 변환 함수 ---
const transformConcertData = (item: ConcertResponse): Concert => {
  // 1. 날짜/시간 추출
  const firstSchedule = item.schedules?.[0];
  const { date, time } = parseDateTime(firstSchedule?.startAt || "");

  return {
    id: String(item.id),
    title: item.name,
    artist: "", // 기본 조회에는 artist 정보가 없음
    venue: "",  // 기본 조회에는 venue 정보가 없음
    imageUrl: item.posterImage,
    date,
    time,
    subtitle: "",
    seat: "" 
  };
};

// 공연 상세 회차 데이터 변환
// const transformConcertDetailData = (item: ConcertDetailResponse): Concert => {
//   const { date, time } = parseDateTime(item.startAt || "");

//   return {
//     id: String(item.concertId),
//     title: item.name,
//     artist: "", // 상세 조회에도 artist 정보가 없으므로 빈값
//     venue: "",  // 상세 조회에도 venue 정보가 없으므로 빈값
//     imageUrl: item.posterImage,
//     date,
//     time,
//     subtitle: `${item.round || 1}회차`,
//     seat: ""
//   };
// };

// --- API 함수들 ---

// 1. 공연 검색
// GET /concerts/search?query=검색어
export const searchConcerts = async (keyword: string): Promise<Concert[]> => {
  const response = await apiClient.get<{ result: ConcertResponse[] }>('/concerts/search', {
    params: { 
      query: keyword, 
    } 
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (response.data as any).result || (response.data as any).payload || [];
  return data.map(transformConcertData);
};

// 2. 상세 정보 조회 (기본)
// GET /concerts/{concertId}
export const fetchConcertInfo = async (concertId: string) => {
  const response = await apiClient.get<{ result: ConcertResponse }>(`/concerts/${concertId}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (response.data as any).result || (response.data as any).payload;
  return transformConcertData(data); 
};

// 3. 공연 상세 회차(스케줄) 조회
// GET /concerts/details/{detailId}
export const fetchConcertDetail = async (detailId: string) => {
  const response = await apiClient.get<{ result: ConcertDetailResponse }>(`/concerts/details/${detailId}`);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (response.data as any).result || (response.data as any).payload;
  const { date, time } = parseDateTime(data.startAt);
  
  return {
    concertId: data.concertId,
    detailId: data.detailId,
    name: data.name,
    posterImage: data.posterImage,
    ageRating: data.ageRating,
    noticeUrl: data.noticeUrl,
    round: data.round,
    runningTime: data.runningTime,
    intermission: data.intermission,
    date,
    time,
    startAt: data.startAt
  };
};

// --- [New] 검색 기록 API ---

// 4. 최근 검색어 조회
// GET /searchHistory
export const fetchSearchHistory = async () => {
    const response = await apiClient.get<{ result: string[] }>('/searchHistory');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (response.data as any).result || (response.data as any).payload || [];
};

// 5. 최근 검색어 저장
// POST /searchHistory
export const saveSearchHistory = async (keyword: string) => {
    const response = await apiClient.post('/searchHistory', { keyword });
    return response.data;
};

// 6. 최근 검색어 단일 삭제
// DELETE /searchHistory/{id}
export const deleteSearchHistory = async (id: number) => {
    const response = await apiClient.delete(`/searchHistory/${id}`);
    return response.data;
};

// 7. 최근 검색어 전체 삭제
// DELETE /searchHistory/all
export const deleteAllSearchHistory = async () => {
    const response = await apiClient.delete('/searchHistory/all');
    return response.data;
};