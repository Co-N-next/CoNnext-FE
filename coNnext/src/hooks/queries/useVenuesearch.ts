import { useInfiniteQuery } from "@tanstack/react-query";
import { searchVenues } from "../../api/venueSearch";

/**
 * 공연장 검색 전용 hook(venue/search)
 * - 검색어 있을 때만 API 호출
 * - 서버 응답 전체 반환 (payload + pageInfo)
 */
export function useVenuesearch(params?: { search?: string }) {
  const search = params?.search?.trim();

  return useInfiniteQuery({
    queryKey: ["venue-search", search],
    queryFn: ({ pageParam = 0 }) => searchVenues(search as string, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pageInfo?.hasNext) return undefined;
      return (lastPage.pageInfo?.page ?? 0) + 1;
    },
    enabled: !!search,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
