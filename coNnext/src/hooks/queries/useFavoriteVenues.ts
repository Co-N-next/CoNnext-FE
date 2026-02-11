import { useQuery } from "@tanstack/react-query";
import { getFavoriteVenues } from "../../api/venue";
import type { GetFavoriteVenuesResponse } from "../../types/venue";

//즐겨찾기 공연장 목록 조회
export const useFavoriteVenues = () => {
  return useQuery<GetFavoriteVenuesResponse>({
    queryKey: ["favoriteVenues"],
    queryFn: getFavoriteVenues,
  });
};
