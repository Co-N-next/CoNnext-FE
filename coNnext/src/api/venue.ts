import { apiClient } from "../config/api";
import type {
  VenueResponse,
  Venue,
  Floor,
} from "../types/venue";
import {
  mapFacilityType,
  mapSectionType,
  getSectionColor,
} from "../types/venue";

// 공연장 지도 데이터 조회
export const fetchVenueMap = async (venueId: number): Promise<Venue> => {
  const response = await apiClient.get<{ payload: VenueResponse }>(
    `/venues/${venueId}/map`
  );

  const data = response.data.payload;

  // 백엔드 데이터를 프론트엔드 형식으로 변환
  const floors: Floor[] = data.floors.map((floorData) => ({
    floor: floorData.floor,
    sections: floorData.sections.map((section) => {
      const type = mapSectionType(section.type);
      return {
        id: section.sectionId,
        name: section.sectionId,
        type,
        color: getSectionColor(type),
        path: section.pathData,
        // x, y는 pathData에서 중앙 좌표를 계산하거나 백엔드에서 제공해야 함
        // 일단 undefined로 두면 HallMap에서 레이블을 표시하지 않음
      };
    }),
    facilities: floorData.facilities.map((facility) => ({
      id: String(facility.facilityId),
      type: mapFacilityType(facility.type, facility.name),
      name: facility.name,
      x: facility.x,
      y: facility.y,
    })),
  }));

  // 백엔드에서 null 값이 올 경우 기본값 설정
  // 모든 섹션의 좌표에서 bounding box 계산
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  
  floors.forEach(floor => {
    floor.sections.forEach(section => {
      // SVG path에서 좌표 추출 (음수 포함)
      const coords = section.path.match(/[-]?[\d.]+/g)?.map(Number) || [];
      for (let i = 0; i < coords.length; i += 2) {
        const x = coords[i];
        const y = coords[i + 1];
        if (!isNaN(x) && !isNaN(y)) {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    });
    
    // 시설물 좌표도 포함
    floor.facilities.forEach(facility => {
      minX = Math.min(minX, facility.x);
      minY = Math.min(minY, facility.y);
      maxX = Math.max(maxX, facility.x);
      maxY = Math.max(maxY, facility.y);
    });
  });

  // 여백 추가 (5% + 고정 여백 20px)
  const paddingPercent = 0.05;
  const paddingFixed = 20;
  const paddingX = (maxX - minX) * paddingPercent + paddingFixed;
  const paddingY = (maxY - minY) * paddingPercent + paddingFixed;
  
  const svgWidth = data.svgWidth || (maxX - minX + paddingX * 2);
  const svgHeight = data.svgHeight || (maxY - minY + paddingY * 2);
  const svgViewBoxX = minX - paddingX;
  const svgViewBoxY = minY - paddingY;
  
  const totalFloors = data.totalFloors || floors.length;

  // 디버깅: 실제 데이터 확인
  console.log("📊 Bounding Box:", { minX, minY, maxX, maxY });
  console.log("📐 SVG 크기:", { svgWidth, svgHeight, svgViewBoxX, svgViewBoxY });

  return {
    id: data.venueId,
    name: data.name,
    address: data.address,
    totalFloors,
    svgWidth,
    svgHeight,
    svgViewBoxX,
    svgViewBoxY,
    floors,
  };
};
