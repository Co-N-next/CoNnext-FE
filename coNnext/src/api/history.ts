// ✅ 최종 추천 버전
import api from "./axios";  // 프로젝트의 다른 파일들과 일관성 유지
import type {
  GetSearchHistoryResponse,
  PostSearchHistoryRequest,
  SearchType,
} from "../types/searchHistory";

// 최근 검색어 조회
export const getSearchHistory = async (
  type: SearchType,
): Promise<GetSearchHistoryResponse> => {
  const { data } = await api.get("/searchHistory", {
    params: { type },
  });
  return data;
};

// 검색어 저장
export const postSearchHistory = async (body: PostSearchHistoryRequest) => {
  const { data } = await api.post("/searchHistory", body);
  return data;
};

// 검색어 하나 삭제
export const deleteSearchHistory = async (searchHistoryId: number) => {
  const { data } = await api.delete(`/searchHistory/${searchHistoryId}`);
  return data;
};

// 검색어 전체 삭제 (type별로)
export const deleteAllSearchHistory = async (type: SearchType) => {
  const { data } = await api.delete("/searchHistory/all", {
    params: { type },
  });
  return data;
};