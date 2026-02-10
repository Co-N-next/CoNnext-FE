import { useQuery } from "@tanstack/react-query";
import { getFavoriteVenues } from "../../api/venue";
import type { GetFavoriteVenuesResponse } from "../../types/venue";

export const useFavoriteVenues = () => {
  return useQuery<GetFavoriteVenuesResponse>({
    queryKey: ["favoriteVenues"],
    queryFn: getFavoriteVenues,
  });
};
