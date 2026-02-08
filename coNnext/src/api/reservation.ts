import { apiClient } from "../config/api";
import type { ReservationResponse } from "../types/reservation";

// 내 예매 내역 조회
export const fetchMyReservations = async (): Promise<ReservationResponse[]> => {
  const response = await apiClient.get<{ result: ReservationResponse[] }>('/reservations');
  // 백엔드 응답 구조({ result: [...] })에 맞춰 수정
  // 만약 result가 없다면 response.data.payload 등을 확인해야 합니다.
  return response.data.result; 
};

// 예매 내역 삭제
export const deleteReservation = async (reservationId: string) => {
  const response = await apiClient.delete(`/reservations/${reservationId}`);
  return response.data;
};

// ✅ [추가됨] 예매 내역 추가 (저장)
// POST /reservations
export const createReservation = async (data: {
  concertId: number;     // 공연 ID (숫자)
  concertDate: string;   // "2025-11-25"
  concertTime: string;   // "18:00"
  seatLocation: string;  // "1층 A구역..."
}) => {
  const response = await apiClient.post('/reservations', data);
  return response.data;
};