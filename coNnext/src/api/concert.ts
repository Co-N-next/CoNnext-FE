import { apiClient } from "../config/api";
import type { Concert } from "../types/concert";
import axios from "axios";

// ✅ 1. 백엔드에서 내려주는 JSON 데이터의 모양을 정의합니다.
// (보여주신 JSON 예시를 바탕으로 만들었습니다)
interface ConcertResponse {
  id: number;
  name: string;
  posterImage: string;
  ageRating?: string;
  price?: string;
  // JSON에는 없었지만 코드가 안 깨지게 선택적(?)으로 둡니다.
  artist?: string;     
  artistName?: string; 
  venueName?: string;
  venue?: string;
  
  // 스케줄 정보 (배열)
  schedules: {
    detailId: number;
    startAt: string; // "2026-02-07T19:21:24.568Z"
    round?: number;
    runningTime?: number;
  }[];
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
// item의 타입을 any가 아니라 위에서 만든 ConcertResponse로 지정!
const transformConcertData = (item: ConcertResponse): Concert => {
  // 1. 날짜/시간 추출
  // schedules가 없거나 비어있을 수 있으므로 안전하게 접근 (?.)`
  const firstSchedule = item.schedules?.[0];
  const { date, time } = parseDateTime(firstSchedule?.startAt || "");

  return {
    id: String(item.id),           // 숫자 id를 문자열로 변환
    title: item.name,              // JSON: name -> Frontend: title
    
    // API에 아티스트/장소 정보가 없을 경우 대비
    artist: item.artist || item.artistName || "",     
    venue: item.venueName || item.venue || "",   
    
    imageUrl: item.posterImage,    // JSON: posterImage -> Frontend: imageUrl
    
    // 날짜/시간 포맷팅
    date,
    time,
    
    // 프론트엔드 필수값 채우기 (빈 문자열)
    subtitle: "",
    seat: "" 
  };
};

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

// --- API 함수들 ---

// 1. 공연 검색
// GET /concerts/search?query=검색어
export const searchConcerts = async (keyword: string): Promise<Concert[]> => {
  // 응답 데이터가 { payload: ConcertResponse[] } 형태라고 타입을 지정
  const response = await apiClient.get<{ payload: ConcertResponse[] }>('/concerts/search', {
    params: { 
      query: keyword, 
      size: 20,       
    } 
  });
  
  // payload가 null일 수도 있으므로 빈 배열([])로 처리
  return (response.data.payload || []).map(transformConcertData);
};

// 2. 공연 상세 조회 (필요 시 사용)
// GET /concerts/{concertId}
export const fetchConcertInfo = async (concertId: string) => {
  // 단일 객체 반환이므로 { payload: ConcertResponse }
  const response = await apiClient.get<{ payload: ConcertResponse }>(`/concerts/${concertId}`);
  return transformConcertData(response.data.payload); 
};

// 3. 공연 상세 회차(스케줄) 조회
export const fetchConcertDetail = async (detailId: string) => {
    const response = await apiClient.get<{ payload: ConcertResponse }>(`/concerts/details/${detailId}`);
    
    // 백엔드 데이터를 우리가 쓰기 편한 형태로 가공
    return {
        schedules: (response.data.payload.schedules || []).map((sch: ConcertResponse['schedules'][number]) => ({
            ...parseDateTime(sch.startAt),
            detailId: sch.detailId
        }))
    };
};

export const getRecentConcerts = async () => {
  const res = await axios.get<ApiResponse<RecentConcert[]>>(
    "/concerts/recent"
  );
  return res.data;
};