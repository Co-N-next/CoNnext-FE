import { apiClient } from "../config/api";

// ------------------------------------------------------------------
// [타입 정의]
// ------------------------------------------------------------------

export interface MateResponse {
  id: string;
  name: string;
  imageUrl: string;
  location?: string;
  // 필요 시 명세에 맞춰 필드 추가 (ex: age, gender 등)
}

export interface MateProfileResponse extends MateResponse {
  description?: string;
  tags?: string[];
  favoriteGenres?: string[];
}

export interface MatesPageResponse {
  mates: MateResponse[];
  hasMore: boolean;
  nextCursor?: string; // 커서 기반 페이지네이션일 경우
  totalCount?: number; // 전체 개수가 올 경우
}

// ------------------------------------------------------------------
// [조회 API (GET)]
// ------------------------------------------------------------------

// 1. 메이트 목록 조회 (GET /mates)
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
    return { mates: [], hasMore: false };
  }
};

// 2. 메이트 검색 (GET /mates/search)
export const searchMates = async (
  query: string,
  page: number = 0,
  size: number = 12
): Promise<MatesPageResponse> => {
  try {
    const response = await apiClient.get<{ payload: MatesPageResponse }>(
      "/mates/search",
      { params: { query, page, size } }
    );
    return response.data.payload;
  } catch (error) {
    console.error("메이트 검색 실패:", error);
    return { mates: [], hasMore: false };
  }
};

// 3. 메이트 프로필 조회 (GET /mates/{mateId}/profile)
// (기존 fetchMateDetail 대신 명세에 있는 이 함수를 메인으로 사용하세요)
export const getMateProfile = async (mateId: string): Promise<MateProfileResponse> => {
  try {
    const response = await apiClient.get<{ payload: MateProfileResponse }>(
      `/mates/${mateId}/profile`
    );
    return response.data.payload;
  } catch (error) {
    console.error("메이트 프로필 조회 실패:", error);
    throw error;
  }
};

// 4. 자주 찾는 메이트 목록 조회 (GET /mates/favorite)
export const getFavoriteMates = async (): Promise<MateResponse[]> => {
  try {
    const response = await apiClient.get<{ payload: MateResponse[] }>("/mates/favorite");
    return response.data.payload;
  } catch (error) {
    console.error("자주 찾는 메이트 조회 실패:", error);
    return [];
  }
};

// 5. 오늘의 공연 메이트 (GET /mates/today)
export const getTodayMates = async (): Promise<MateResponse[]> => {
  try {
    const response = await apiClient.get<{ payload: MateResponse[] }>("/mates/today");
    return response.data.payload;
  } catch (error) {
    console.error("오늘의 메이트 조회 실패:", error);
    return [];
  }
};

// ------------------------------------------------------------------
// [관리 API (POST, DELETE)]
// ------------------------------------------------------------------

// 6. 메이트 요청 (POST /mates/request)
export const requestMate = async (nickname: string) => {
  const response = await apiClient.post(`/mates/request`, { nickname });
  return response.data;
};

// 7. 메이트 요청 수락 (POST /mates/{mateId}/accept)
export const acceptMate = async (mateId: string) => {
  const response = await apiClient.post(`/mates/${mateId}/accept`);
  return response.data;
};

// 8. 메이트 요청 거절 (POST /mates/{mateId}/reject)
export const rejectMate = async (mateId: string) => {
  const response = await apiClient.post(`/mates/${mateId}/reject`);
  return response.data;
};

// 9. 자주 찾는 메이트 추가 (POST /mates/{mateId}/favorite)
export const addFavoriteMate = async (mateId: string) => {
  const response = await apiClient.post(`/mates/${mateId}/favorite`);
  return response.data;
};

// 10. 자주 찾는 메이트 제거 (DELETE /mates/{mateId}/favorite)
export const removeFavoriteMate = async (mateId: string) => {
  const response = await apiClient.delete(`/mates/${mateId}/favorite`);
  return response.data;
};

// 11. 메이트 삭제 (DELETE /mates/{mateId})
export const deleteMate = async (mateId: string) => {
  const response = await apiClient.delete(`/mates/${mateId}`);
  return response.data;
};