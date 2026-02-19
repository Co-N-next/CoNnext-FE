import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchMyReservations, 
  fetchTodayReservations,
  deleteReservation, 
  createReservation,
  updateReservation
} from "../api/reservation";
import type { Concert } from "../types/concert";
import type { ReservationResponse } from "../types/reservation";

// Helper: 데이터 매핑 (백엔드 필드명 -> 프론트엔드 타입)
const mapReservationToConcert = (item: ReservationResponse): Concert => ({
  id: String(item.reservationId),
  title: item.concertTitle || item.title || "",
  subtitle: item.subtitle || "",
  artist: item.artist || "",
  date: item.concertDate || item.date || "",
  time: item.concertTime || item.time || "",
  venue: item.venue || "",
  venueId: item.venueId,
  seat: item.seatLocation || item.seat || "",
  imageUrl: item.posterUrl || item.imageUrl || "",
});

// 1. 다가오는 공연(내 예매 내역) 조회 훅
export function useUpcomingReservations() {
  return useQuery({
    queryKey: ["reservations", "upcoming"],
    queryFn: async () => {
      const data = await fetchMyReservations();
      return data.map(mapReservationToConcert);
    },
    staleTime: 3 * 60 * 1000, 
  });
}

// 2. 오늘 내 공연 조회 훅
export function useTodayReservations() {
  return useQuery({
    queryKey: ["reservations", "today"],
    queryFn: async () => {
      const data = await fetchTodayReservations();
      return data.map(mapReservationToConcert);
    },
    staleTime: 1 * 60 * 1000, // 오늘은 시간이 중요하므로 조금 더 짧게
  });
}

// 3. 예매 추가 Mutation
export function useCreateReservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
}

// 4. 예매 수정 Mutation
export function useUpdateReservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateReservation>[1] }) => 
      updateReservation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
}

// 5. 예매 삭제 Mutation 훅 (낙관적 업데이트 적용)
export function useDeleteReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationId: string) => deleteReservation(reservationId),
    
    // 낙관적 업데이트
    onMutate: async (reservationId) => {
      await queryClient.cancelQueries({ queryKey: ["reservations"] });

      const previousUpcoming = queryClient.getQueryData<Concert[]>(["reservations", "upcoming"]);
      const previousToday = queryClient.getQueryData<Concert[]>(["reservations", "today"]);

      // Upcoming에서 제거
      if (previousUpcoming) {
        queryClient.setQueryData<Concert[]>(
          ["reservations", "upcoming"],
          previousUpcoming.filter((item) => item.id !== reservationId)
        );
      }
      // Today에서 제거 (혹시 있다면)
      if (previousToday) {
        queryClient.setQueryData<Concert[]>(
          ["reservations", "today"],
          previousToday.filter((item) => item.id !== reservationId)
        );
      }

      return { previousUpcoming, previousToday };
    },

    onError: (_err, _reservationId, context) => {
      if (context?.previousUpcoming) {
        queryClient.setQueryData(["reservations", "upcoming"], context.previousUpcoming);
      }
      if (context?.previousToday) {
        queryClient.setQueryData(["reservations", "today"], context.previousToday);
      }
      console.error("예매 삭제 실패:", _err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
}
