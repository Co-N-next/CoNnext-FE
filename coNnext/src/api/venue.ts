// [Venue쪽 API함수]

import api from "./axios";
import type {
  VenueListResponse,
  SearchVenuesResponse,
  GetNearestVenueRequest,
  GetNearestVenueResponse,
  GetFavoriteVenuesResponse,
} from "../types/venue";

// 인기 검색 공연장 조회(venues/trend-search)
export const getTrendingVenues = async (): Promise<VenueListResponse> => {
  const { data } = await api.get<VenueListResponse>(
    "/venues/trend-search",
  );
  return data;
};

// 홈 공연장 조회 (/venues)
export const getHomeVenues = async (): Promise<VenueListResponse> => {
  const { data } = await api.get<VenueListResponse>("/venues");
  return data;
};

//공연장검색(venue/search)
export const searchVenues = async (
  query: string,
  page: number = 0,
): Promise<SearchVenuesResponse> => {
  const { data } = await api.get<SearchVenuesResponse>(
    "/venues/search",
    {
      params: { query, page },
    },
  );
  return data;
};

//근처 공연장 조회(venues/nearby)
export const getNearestVenue = async (
  params: GetNearestVenueRequest,
): Promise<GetNearestVenueResponse> => {
  console.log("🔥 nearby API 호출됨", params);
  const { data } = await api.get<GetNearestVenueResponse>(
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
      await api.get<GetFavoriteVenuesResponse>("/venues/favorites");
    return data;
  };
