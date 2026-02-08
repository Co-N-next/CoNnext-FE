// Venue쪽 API함수

import { axiosInstance } from "./axios";
import type { VenueListResponse, SearchVenuesResponse } from "../types/venue";
// 인기 검색 공연장 조회
export const getTrendingVenues = async (): Promise<VenueListResponse> => {
  const { data } = await axiosInstance.get<VenueListResponse>(
    "/venues/trend-search",
  );
  return data;
};

//공연장검색
export const searchVenues = async (
  query: string,
  page: number = 0,
): Promise<SearchVenuesResponse> => {
  const { data } = await axiosInstance.get<SearchVenuesResponse>(
    "/venues/search",
    {
      params: { query, page },
    },
  );

  return data;
};
