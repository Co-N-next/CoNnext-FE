// 백엔드 예매 내역 응답 타입
export interface ReservationResponse {
  reservationId: number;
  concertTitle?: string;
  title?: string;
  subtitle?: string;
  artist: string;
  concertDate?: string;
  date?: string;
  concertTime?: string;
  time?: string;
  venue: string;
  venueId?: number;
  seatLocation?: string;
  seat?: string;
  posterUrl?: string;
  imageUrl?: string;
}
