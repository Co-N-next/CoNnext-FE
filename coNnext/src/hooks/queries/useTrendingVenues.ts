// 공연장 찾기 - 즐겨찾기용 쿼리

import { useQuery } from "@tanstack/react-query";
import { getTrendingVenues } from "../../api/venue";

export function useTrendingVenues() {
  return useQuery({
    queryKey: ["venues-trending"],
    queryFn: getTrendingVenues,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
