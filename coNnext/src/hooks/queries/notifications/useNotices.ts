// hooks/queries/notifications/useNotices.ts (notifications/notices : 공지사항 전체조회)
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotices } from "../../../api/notifications";

export const useNotices = (page: number) => {
  return useQuery({
    queryKey: ["notifications", "notices", page],
    queryFn: () => fetchNotices(page),
    placeholderData: keepPreviousData,
  });
};
