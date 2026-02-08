import { axiosInstance } from "./axios";
import type {
  GetSearchHistoryResponse,
  PostSearchHistoryRequest,
  SearchType,
} from "../types/searchHistory";

// 최근 검색어 조회
export const getSearchHistory = async (
  type: SearchType,
): Promise<GetSearchHistoryResponse> => {
  const { data } = await axiosInstance.get("/searchHistory", {
    params: { type },
  });

  return data;
};

// 검색어 저장
export const postSearchHistory = async (body: PostSearchHistoryRequest) => {
  const { data } = await axiosInstance.post("/searchHistory", body);
  return data;
};

// 검색어 하나 삭제
export const deleteSearchHistory = async (searchHistoryId: number) => {
  const { data } = await axiosInstance.delete(
    `/searchHistory/${searchHistoryId}`,
  );
  return data;
};

// 검색어 전체 삭제
export const deleteAllSearchHistory = async (type: SearchType) => {
  const { data } = await axiosInstance.delete("/searchHistory/all", {
    params: { type },
  });

  return data;
};
