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

//요청
export interface GetNearestVenueRequest {
  latitude: number;
  longitude: number;
  radius?: number; // meter 단위, default = 500
}
//응답값
export interface NearestVenuePayload {
  id: number;
  name: string;
}

export interface GetNearestVenueResponse {
  statusCode: number;
  message: string;
  payload: NearestVenuePayload;
}
