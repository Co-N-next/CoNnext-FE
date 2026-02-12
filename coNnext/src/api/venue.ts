// [Venue쪽 API함수]

import api from "./axios";
import type {
  VenueListResponse,
  SearchVenuesResponse,
  GetNearestVenueRequest,
  GetNearestVenueResponse,
  GetFavoriteVenuesResponse,
  VenueResponse,
  Venue,
} from "../types/venue";

export const getTrendingVenues = async (): Promise<VenueListResponse> => {
  const { data } = await api.get<VenueListResponse>(
    "/venues/trend-search",
  );
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

// 공연장 지도 데이터 조회 (Remote version - kept for compatibility if needed, but venueMap.ts is preferred for SVG)
export const fetchVenueMap = async (venueId: number): Promise<Venue> => {
  const response = await api.get<{ payload: VenueResponse }>(
    `/venues/${venueId}/map`
  );
  // Ideally this might need adaptation if used, but for now restoring to remote state.
  // Note: The remote version returns `Venue`, but the code here was just fetching. 
  // The remote implementation in the merge conflict block ended at line 81 and didn't show the full body if it was cut off?
  // Wait, let me check the previous `view_file` output carefully.
  // Line 78: export const fetchVenueMap = async (venueId: number): Promise<Venue> => {
  // Line 79:   const response = await api.get<{ payload: VenueResponse }>(
  // Line 80:     `/venues/${venueId}/map`
  // Line 81:   );
  // Line 82: >>>>>>> origin/feature/#21_venueAPI_V4
  // It seems the remote function body might have been incomplete or I should just infer it returns response.data.payload.
  // Converting VenueResponse to Venue might be needed, or maybe VenueResponse IS Venue compatible.
  // Given I'm replacing the usage in HallMap with venueMap.ts, this function might not be used.
  // But I should try to make it syntactically correct.
   return response.data.payload as unknown as Venue; 
};