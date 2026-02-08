import { useQuery } from "@tanstack/react-query";
import { searchVenues } from "../../api/venue";

/**
 * 공연장 검색 전용 hook
 * - 검색어 있을 때만 API 호출
 * - 서버 응답 전체 반환 (payload + pageInfo)
 */
export function useGetList(params?: { search?: string; page?: number }) {
  const search = params?.search?.trim();

  return useQuery({
    queryKey: ["venue-search", search, params?.page],

    queryFn: () => searchVenues(search as string, params?.page ?? 0),

    enabled: !!search,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
