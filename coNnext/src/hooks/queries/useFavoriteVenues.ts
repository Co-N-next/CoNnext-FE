import { useQuery } from "@tanstack/react-query";
import { getFavoriteVenues } from "../../api/venueSearch";
import type { GetFavoriteVenuesResponse } from "../../types/venueSearch";

//즐겨찾기 공연장 목록 조회
export const useFavoriteVenues = () => {
  return useQuery<GetFavoriteVenuesResponse>({
    queryKey: ["favoriteVenues"],
    queryFn: getFavoriteVenues,
  });
};
