import { apiClient } from "../config/api";
import type { ReservationResponse } from "../types/reservation";

// 1. 내 예매 내역 조회 (다가오는 공연)
// GET /reservations
export const fetchMyReservations = async (): Promise<ReservationResponse[]> => {
  const response = await apiClient.get<{ result: ReservationResponse[] }>('/reservations');
  return response.data.result; 
};

// 2. 오늘 내 공연 조회
// GET /concerts/today
export const fetchTodayReservations = async (): Promise<ReservationResponse[]> => {
  // 응답 구조가 { result: ... } 인지 { payload: ... } 인지 확인 필요. 
  // 다른 API들과 일관성을 위해 체크. 우선 result로 가정하거나 any로 처리 후 확인.
  // 문서상 "GET https://api.con-next.xyz/concerts/today"
  const response = await apiClient.get<{ result: ReservationResponse[] }>('/concerts/today');
  return response.data.result;
};

// 3. 예매 내역 추가
// POST /reservations
export const createReservation = async (data: {
  concertId: number;
  concertDate: string;
  concertTime: string;
  seatLocation: string;
}) => {
  const response = await apiClient.post('/reservations', data);
  return response.data;
};

// 4. 예매 내역 수정
// PATCH /reservations/{reservationId}
export const updateReservation = async (reservationId: string, data: {
  concertDate?: string;
  concertTime?: string;
  seatLocation?: string;
}) => {
  const response = await apiClient.patch(`/reservations/${reservationId}`, data);
  return response.data;
};

// 5. 예매 내역 삭제
// DELETE /reservations/{reservationId}
export const deleteReservation = async (reservationId: string) => {
  const response = await apiClient.delete(`/reservations/${reservationId}`);
  return response.data;
};