import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMyReservations, deleteReservation } from "../api/reservation";
import type { Concert } from "../types/concert";
import type { ReservationResponse } from "../types/reservation";

// 예매 목록 조회 훅
export function useReservations() {
  return useQuery({
    queryKey: ["reservations"],
    queryFn: async () => {
      const data = await fetchMyReservations();
      
      // 데이터 매핑 (백엔드 필드명 -> 프론트엔드 타입)
      const mappedData = data.map((item: ReservationResponse): Concert => ({
        id: String(item.reservationId),
        title: item.concertTitle || item.title || "",
        subtitle: item.subtitle || "",
        artist: item.artist || "",
        date: item.concertDate || item.date || "",
        time: item.concertTime || item.time || "",
        venue: item.venue || "",
        seat: item.seatLocation || item.seat || "",
        imageUrl: item.posterUrl || item.imageUrl || "",
      }));

      return mappedData;
    },
    staleTime: 3 * 60 * 1000, // 3분 - 예매 목록은 자주 변경되지 않으므로
  });
}

// 예매 삭제 Mutation 훅 (낙관적 업데이트 적용)
export function useDeleteReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationId: string) => deleteReservation(reservationId),
    
    // 낙관적 업데이트: 삭제 요청 전에 UI를 먼저 업데이트
    onMutate: async (reservationId) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: ["reservations"] });

      // 이전 데이터 백업
      const previousReservations = queryClient.getQueryData<Concert[]>(["reservations"]);

      // 낙관적으로 UI 업데이트 (해당 항목 제거)
      if (previousReservations) {
        queryClient.setQueryData<Concert[]>(
          ["reservations"],
          previousReservations.filter((item) => item.id !== reservationId)
        );
      }

      // 롤백을 위한 이전 데이터 반환
      return { previousReservations };
    },

    // 에러 발생 시 롤백
    onError: (_err, _reservationId, context) => {
      if (context?.previousReservations) {
        queryClient.setQueryData(["reservations"], context.previousReservations);
      }
      console.error("예매 삭제 실패:", _err);
    },

    // 성공 또는 실패 시 쿼리 무효화 (서버 데이터와 동기화)
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
}
