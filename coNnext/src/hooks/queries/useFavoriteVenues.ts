import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addFavoriteVenue,
  getFavoriteVenues,
  removeFavoriteVenue,
} from "../../api/venueSearch";
import type { GetFavoriteVenuesResponse } from "../../types/venueSearch";

//즐겨찾기 공연장 목록 조회
export const useFavoriteVenues = () => {
  return useQuery<GetFavoriteVenuesResponse>({
    queryKey: ["favoriteVenues"],
    queryFn: getFavoriteVenues,
  });
};

export const useAddFavoriteVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (venueId: number) => addFavoriteVenue(venueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteVenues"] });
    },
  });
};

export const useRemoveFavoriteVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (venueId: number) => removeFavoriteVenue(venueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteVenues"] });
    },
  });
};
