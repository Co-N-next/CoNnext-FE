// hooks/queries/useMyNotifications.ts(notifications/news : 내소식전체조회)
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { notifications } from "../../../api/notifications";

export const useMyNotifications = (page: number) => {
  return useQuery({
    queryKey: ["notifications", "news", page],
    queryFn: () => notifications(page),
    placeholderData: keepPreviousData,
  });
};
