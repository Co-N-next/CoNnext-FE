//인기 검색 공연장 조회(venue/trend-srarch)

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
