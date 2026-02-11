import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMates, searchMates } from "../api/mate";

// Infinite Scroll을 위한 Mate 목록 조회 훅
export function useMates(searchQuery: string = "") {
  return useInfiniteQuery({
    queryKey: ["mates", searchQuery],
    queryFn: ({ pageParam = 0 }) => {
      if (searchQuery) {
        return searchMates(searchQuery, pageParam);
      }
      return fetchMates(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      // hasMore가 true이면 다음 페이지 번호 반환, 아니면 undefined
      return lastPage.hasMore ? pages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000, // 5분
  });
}
