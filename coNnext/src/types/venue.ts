// 공연장 하나
export interface Venue {
  id: number;
  name: string;
  city: string;
  imageUrl: string;
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
