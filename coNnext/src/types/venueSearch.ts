// 공연장 하나
export interface Venue {
  id: number;
  name: string;
  city: string;
  imageUrl: string;
  isToday?: boolean;
  isNew?: boolean;
}

// 페이지 정보
export interface PageInfo {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

// 서버 응답 전체 (인기 공연장)
export interface VenueListResponse {
  statusCode: number;
  message: string;
  pageInfo: PageInfo;
  payload: Venue[];
}

// 공연장 검색 응답
export interface SearchVenuesResponse {
  statusCode: number;
  message: string;
  pageInfo: PageInfo;
  payload: Venue[];
}

//근처공연장 타입정의
//mockdata일떄
// //요청
// export interface GetNearestVenueRequest {
//   latitude: number;
//   longitude: number;
//   radius?: number; // meter 단위, default = 500
// }
// //응답값
// export interface NearestVenuePayload {
//   id: number;
//   name: string;
// }

// export interface GetNearestVenueResponse {
//   statusCode: number;
//   message: string;
//   payload: NearestVenuePayload;
// }

// ===============================
// 근처 공연장 (Nearby / Nearest)
// ===============================

// 요청
export interface GetNearestVenueRequest {
  lat: number;
  lng: number;
  radius?: number; // meter 단위, default = 500
}

// 응답 payload (단일 공연장)
export interface NearestVenuePayload {
  id: number;
  name: string;
}

// 근처 공연장 응답
export interface GetNearestVenueResponse {
  statusCode: number;
  message: string;
  pageInfo: PageInfo;
  payload: NearestVenuePayload;
}
//===============================
// /venue/favorites
// ===============================

export interface FavoriteVenue {
  id: number;
  name: string;
  city: string;
  imageUrl: string;
}
export interface PageInfo {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}
export interface GetFavoriteVenuesResponse {
  statusCode: number;
  message: string;
  pageInfo: PageInfo;
  payload: FavoriteVenue[];
}