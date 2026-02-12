import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptLocationRequest } from "../../api/notifications";

//위치 공유 뮤태이션
export const useAcceptLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptLocationRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", "news"],
      });
    },
  });
};

// 1️⃣ mutationFn 역할
// mutationFn: acceptLocationRequest

// 👉 버튼 눌렀을 때
// POST /notifications/news/share-location 실행하는 역할

// 즉,

// 위치공유 수락/거절을 서버에 보내는 트리거

// 2️⃣ onSuccess 역할
// queryClient.invalidateQueries({ queryKey: ["notifications"] });

// 👉 서버 상태가 바뀌었으니까
// 알림 목록을 다시 가져오라고 React Query에게 지시하는 것
