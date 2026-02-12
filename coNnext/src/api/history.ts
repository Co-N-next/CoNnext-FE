import api from "axios"; // ✅ 아까 만든 인터셉터(http.ts) 사용

// 검색 기록 데이터 타입 정의
// (백엔드 스웨거 명세에 맞춤)
export interface SearchHistoryItem {
  searchHistoryId: number; // 백엔드 ID가 숫자라면 number, 문자라면 string
  keyword: string;
}

// 1. 최근 검색어 가져오기
// GET /searchHistory
export const fetchSearchHistory = async (): Promise<SearchHistoryItem[]> => {
  const response = await api.get("/searchHistory");
  
  // 백엔드 응답이 { payload: [...] } 또는 { result: [...] } 형태일 수 있음
  // 스웨거/콘솔 확인해서 맞는 걸로 쓰세요. 보통 payload나 result 안에 배열이 있습니다.
  return response.data.payload || response.data.result || [];
};

// 2. 검색어 저장하기
// POST /searchHistory
export const saveSearchHistory = async (keyword: string) => {
  const response = await api.post("/searchHistory", { keyword });
  return response.data;
};

// 3. 검색어 한 개 삭제하기
// DELETE /searchHistory/{searchHistoryId}
export const deleteSearchHistory = async (searchHistoryId: number) => {
  const response = await api.delete(`/searchHistory/${searchHistoryId}`);
  return response.data;
};

// 4. 검색어 전체 삭제하기
// DELETE /searchHistory/all
export const deleteAllSearchHistory = async () => {
  const response = await api.delete("/searchHistory/all");
  return response.data;
};