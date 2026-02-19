import { useQuery } from "@tanstack/react-query";
import { getNotices } from "../../../api/notifications";
import type { Notice } from "../../../types/notifications";

import type { NoticeListResponse } from "../../../types/notifications";

export const useNotices = () => {
  return useQuery<NoticeListResponse, Error, Notice[]>({
    queryKey: ["notices"],
    queryFn: getNotices,
    select: (data) => data.payload.payload.notices,
  });
};