export interface Concert {
  id: string;
  title: string;
  subtitle: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  venueId?: number;
  seat: string;
  imageUrl: string;
}
export type ConcertData = {
  concertId?: number;
  detailId?: number;
  title: string;
  artist: string;
  place: string;
  venueId?: number;
  date: string;
  time: string;
  seat: string;
  poster: string;
};

export interface ConcertSchedule {
  detailId: number;
  startAt: string;       // ISO string
  round: number;
  runningTime: number;  // minutes
}

export interface ConcertItem {
  id: number;
  name: string;
  posterImage: string;
  ageRating: string;
  noticeUrl: string;
  price: string;
  reservationLink: string;
  schedules: ConcertSchedule[];
}

export interface PageInfo {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  pageInfo: PageInfo;
  payload: T;
}
