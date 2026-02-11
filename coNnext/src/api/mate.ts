import { apiClient } from "../config/api";

// Mate 타입 정의
export interface MateResponse {
  id: string;
  name: string;
  imageUrl: string;
  location?: string;
}

export interface MatesPageResponse {
  mates: MateResponse[];
  hasMore: boolean;
  nextCursor?: string;
}

// 메이트 목록 조회 (페이지네이션)
export const fetchMates = async (
  page: number = 0,
  size: number = 12
): Promise<MatesPageResponse> => {
  try {
    const response = await apiClient.get<{ payload: MatesPageResponse }>("/mates", {
      params: { page, size },
    });
    return response.data.payload;
  } catch (error) {
    console.error("메이트 목록 조회 실패:", error);
    // TODO: 백엔드 API가 준비되기 전까지 Mock 데이터 반환
    return {
      mates: [],
      hasMore: false,
    };
  }
};

// 메이트 검색
export const searchMates = async (
  query: string,
  page: number = 0,
  size: number = 12
): Promise<MatesPageResponse> => {
  try {
    const response = await apiClient.get<{ payload: MatesPageResponse }>(
      "/mates/search",
      {
        params: { query, page, size },
      }
    );
    return response.data.payload;
  } catch (error) {
    console.error("메이트 검색 실패:", error);
    // TODO: 백엔드 API가 준비되기 전까지 Mock 데이터 반환
    return {
      mates: [],
      hasMore: false,
    };
  }
};

// 특정 공연의 메이트 목록 조회
export const fetchConcertMates = async (
  concertId: string
): Promise<MateResponse[]> => {
  try {
    const response = await apiClient.get<{ payload: MateResponse[] }>(
      `/concerts/${concertId}/mates`
    );
    return response.data.payload;
  } catch (error) {
    console.error("공연 메이트 조회 실패:", error);
    // TODO: 백엔드 API가 준비되기 전까지 Mock 데이터 반환
    return [];
  }
};

// 메이트 상세 정보 조회
export const fetchMateDetail = async (mateId: string) => {
  try {
    const response = await apiClient.get<{ payload: MateResponse }>(
      `/mates/${mateId}`
    );
    return response.data.payload;
  } catch (error) {
    console.error("메이트 상세 정보 조회 실패:", error);
    throw error;
  }
};
