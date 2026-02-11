// [Venue쪽 API함수]

import { axiosInstance } from "./axios";
import type {
  VenueListResponse,
  SearchVenuesResponse,
  GetNearestVenueRequest,
  GetNearestVenueResponse,
  GetFavoriteVenuesResponse,
} from "../types/venue";

// 인기 검색 공연장 조회(venues/trend-search)
export const getTrendingVenues = async (): Promise<VenueListResponse> => {
  const { data } = await axiosInstance.get<VenueListResponse>(
    "/venues/trend-search",
  );
  return data;
};

//공연장검색(venue/search)
export const searchVenues = async (
  keyword: string,
  page: number = 0,
): Promise<SearchVenuesResponse> => {
  const { data } = await axiosInstance.get<SearchVenuesResponse>(
    "/venues/search",
    {
      params: { keyword, page },
    },
  );
  return data;
};

//근처 공연장 조회(venues/nearby)
export const getNearestVenue = async (
  params: GetNearestVenueRequest,
): Promise<GetNearestVenueResponse> => {
  const { data } = await axiosInstance.get<GetNearestVenueResponse>(
    "/venues/nearby",
    {
      params: {
        lat: params.lat,
        lng: params.lng,
        radius: params.radius ?? 500,
      },
    },
  );
  return data;
};

//venue/favoritte
export const getFavoriteVenues =
  async (): Promise<GetFavoriteVenuesResponse> => {
    const { data } =
      await axiosInstance.get<GetFavoriteVenuesResponse>("/venues/favorites");
    return data;
  };
