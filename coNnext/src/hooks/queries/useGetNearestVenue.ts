// src/hooks/queries/useGetNearestVenue.ts
import { useQuery } from "@tanstack/react-query";
import { getNearestVenue } from "../../api/venue";
import type {
  GetNearestVenueRequest,
  GetNearestVenueResponse,
} from "../../types/venue";

export const useGetNearestVenue = (params: GetNearestVenueRequest) => {
  return useQuery<GetNearestVenueResponse>({
    queryKey: ["nearestVenue", params.lat, params.lng, params.radius ?? 500],
    queryFn: () => getNearestVenue(params),

    // 좌표 없으면 실행 안 함
    enabled: Boolean(params.lat && params.lng),

    // 근처 공연장 없음(204) 상황에서 재시도 의미 없음
    retry: false,
  });
};
