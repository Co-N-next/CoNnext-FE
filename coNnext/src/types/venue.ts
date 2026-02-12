// ===============================
// FindHall 관련 타입 (공연장 목록/검색)
// ===============================

// 공연장 카드 (목록용)
export interface VenueListItem {
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
  payload: VenueListItem[];
}

// 공연장 검색 응답
export interface SearchVenuesResponse {
  statusCode: number;
  message: string;
  pageInfo: PageInfo;
  payload: VenueListItem[];
}

//근처공연장 타입정의

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

export interface GetFavoriteVenuesResponse {
  statusCode: number;
  message: string;
  pageInfo: PageInfo;
  payload: FavoriteVenue[];
}

// ===============================
// 좌석 배치도 관련 타입 (SVG/Floor)
// ===============================

// 백엔드 API 응답 타입
export interface VenueResponse {
  venueId: number;
  name: string;
  address: string;
  totalFloors: number;
  totalViews: number;
  svgWidth: number;
  svgHeight: number;
  floors: FloorResponse[];
}

export interface FloorResponse {
  floor: number;
  sections: SectionResponse[];
  facilities: FacilityResponse[];
}

export interface SectionResponse {
  sectionId: string;
  type: "SEAT" | "STAGE" | "VIP";
  pathData: string;
}

export interface FacilityResponse {
  facilityId: number;
  type: "TOILET" | "ENTRANCE" | "STORE";
  name: string;
  floor: number;
  x: number;
  y: number;
}

// 프론트엔드에서 사용할 변환된 타입
export interface Venue {
  id: number;
  name: string;
  address: string;
  totalFloors: number;
  svgWidth: number;
  svgHeight: number;
  svgViewBoxX?: number;
  svgViewBoxY?: number;
  floors: Floor[];
}

export interface Floor {
  floor: number;
  sections: Section[];
  facilities: Facility[];
}

export interface Section {
  id: string;
  name: string;
  type: "floor" | "stand" | "vip" | "stage";
  color: string;
  path: string;
  x?: number;
  y?: number;
}

export interface Facility {
  id: string;
  type: "entrance" | "womenRestroom" | "menRestroom" | "convenience";
  name: string;
  x: number;
  y: number;
}

// 백엔드 시설 타입을 프론트엔드 타입으로 매핑하는 헬퍼 함수
export const mapFacilityType = (
  backendType: string,
  name: string
): Facility["type"] => {
  if (backendType === "TOILET") {
    // 이름으로 남/여 구분
    if (name.includes("여자") || name.includes("여성")) {
      return "womenRestroom";
    }
    return "menRestroom";
  }
  if (backendType === "ENTRANCE") {
    return "entrance";
  }
  if (backendType === "STORE") {
    return "convenience";
  }
  return "convenience"; // 기본값
};

// 백엔드 섹션 타입을 프론트엔드 타입으로 매핑
export const mapSectionType = (backendType: string): Section["type"] => {
  switch (backendType) {
    case "STAGE":
      return "stage";
    case "VIP":
      return "vip";
    case "SEAT":
      return "floor"; // 기본 좌석은 floor로 매핑
    default:
      return "floor";
  }
};

// 섹션 타입에 따른 색상 지정
export const getSectionColor = (type: Section["type"]): string => {
  switch (type) {
    case "stage":
      return "#1E293B";
    case "vip":
      return "#EF4444"; // 빨간색 (VIP)
    case "floor":
      return "#CCCCCC"; // 보라색 (일반 좌석)
    case "stand":
      return "#D1D5DB"; // 회색 (스탠드)
    default:
      return "#D1D5DB";
  }
};


// 네 맞아요! 양쪽 다 
// Venue
// 라는 이름으로 인터페이스가 정의되어 있어서 이름이 겹쳤거든요:

// HEAD (내 브랜치)의 
// Venue
// : { id, name, city, imageUrl } — 공연장 카드/목록용
// main의 
// Venue
// : { id, name, address, totalFloors, svgWidth, floors... } — 좌석 배치도용
// 하나의 파일에 같은 이름의 interface가 2개 있으면 에러나니까, 목록용을 
// VenueListItem
// 으로 이름 변경한 거예요.