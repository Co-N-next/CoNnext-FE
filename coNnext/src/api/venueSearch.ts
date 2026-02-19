// [Venue쪽 API함수]

import api from "./axios";
import type {
  VenueListResponse,
  SearchVenuesResponse,
  GetNearestVenueRequest,
  GetNearestVenueResponse,
  GetFavoriteVenuesResponse,
  FavoriteVenueActionResponse,
} from "../types/venueSearch";

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
): Promise<GetNearestVenueResponse | null> => {
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
  return data ?? null;
};


//venue/favoritte
export const getFavoriteVenues =
  async (): Promise<GetFavoriteVenuesResponse> => {
    const { data } =
      await api.get<GetFavoriteVenuesResponse>("/venues/favorites");
    return data;
  };

export const addFavoriteVenue = async (
  venueId: number,
): Promise<FavoriteVenueActionResponse> => {
  const { data } = await api.post<FavoriteVenueActionResponse>(
    `/venues/favorites/${venueId}`,
  );
  return data;
};

export const removeFavoriteVenue = async (
  venueId: number,
): Promise<FavoriteVenueActionResponse> => {
  const { data } = await api.delete<FavoriteVenueActionResponse>(
    `/venues/favorites/${venueId}`,
  );
  return data;
};
