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
