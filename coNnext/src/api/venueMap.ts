import { apiClient } from "../config/api";
import type { 
  Venue, 
  Floor, 
  VenueLayoutApiData, 
  VenueApiSection, 
  VenueApiFacility, 
  VenueApiFloor,
  PathfindingResult,
  PathfindingQueryRequest,
  PathfindingBodyRequest,
  PathfindingToFacilityRequest,
} from "../types/venue";
import {
  mapFacilityType,
  mapSectionType,
  getSectionColor,
} from "../types/venue";

export const fetchVenueMap = async (venueId: number): Promise<Venue> => {
  console.log(`🔍 [Debug] API 호출 시작: venueId=${venueId}`);

  const response = await apiClient.get<{ payload?: VenueLayoutApiData; result?: VenueLayoutApiData } & VenueLayoutApiData>(`/venues/${venueId}/layout`);
  const rawData = response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: VenueLayoutApiData = rawData.payload || rawData.result || rawData;

  // 데이터 방어 로직
  if (!data) {
    throw new Error("❌ API 응답이 비어있습니다.");
  }

  // 전체 지도 크기(ViewBox) 계산용 변수
  let globalMinX = Infinity, globalMinY = Infinity, globalMaxX = -Infinity, globalMaxY = -Infinity;

  // 1. 층(Floor) 목록 정리
  // venue.totalFloors가 0이어도, sections에 있는 floor 정보를 긁어모읍니다.
  const floorSet = new Set<number>();
  
  // sections에서 층 정보 수집
  (data.sections || []).forEach((s: VenueApiSection) => {
    if (s.floor) floorSet.add(Number(s.floor));
  });
  
  // floors 배열에서 층 정보 수집
  (data.floors || []).forEach((f: VenueApiFloor) => {
    if (f.floor) floorSet.add(Number(f.floor));
  });

  // 층이 하나도 없으면 기본 1층으로 간주
  if (floorSet.size === 0) floorSet.add(1);
  
  const sortedFloorNums = Array.from(floorSet).sort((a: number, b: number) => a - b);

  // 2. 층별 데이터 변환
  const floors: Floor[] = sortedFloorNums.map((floorNum: number) => {
    
    // 해당 층에 맞는 섹션 찾기 (data.sections가 평탄화된 배열로 올 경우 대비)
    let rawSections: VenueApiSection[] = [];
    if (data.sections) {
      rawSections = data.sections.filter((s) => Number(s.floor) === floorNum);
    } else if (data.floors) {
      const floorData = data.floors.find((f) => Number(f.floor) === floorNum);
      rawSections = floorData ? (floorData.sections || []) : [];
    }

    // 섹션 변환
    const sections = rawSections.map((section) => {
      const type = mapSectionType(section.type);
      
      // ✅ [핵심] 1. svgPath가 있으면 그걸 쓰고, 없으면 vertices를 찾는다.
      let finalPath = section.svgPath || section.pathData || section.path || "";

      // ✅ [핵심] 2. vertices(점)가 있다면 선으로 이어준다.
      if (!finalPath && section.vertices && section.vertices.length > 0) {
        // vertices: [{x:10, y:10}, {x:20, y:20} ...]
        // 변환: "M 10 10 L 20 20 ... Z"
        finalPath = section.vertices.map((v, i) => {
          const command = i === 0 ? "M" : "L"; // 첫 점은 이동(Move), 나머지는 선(Line)
          return `${command} ${v.x} ${v.y}`;
        }).join(" ") + " Z"; // Z는 닫기(마무리)
      }

      // 3. 좌표 범위 계산 (ViewBox용)
      let sectionMinX = Infinity, sectionMinY = Infinity, sectionMaxX = -Infinity, sectionMaxY = -Infinity;
      
      if (finalPath) {
        const coords = finalPath.match(/[-]?\d+(\.\d+)?/g)?.map(Number) || [];
        for (let i = 0; i < coords.length; i += 2) {
          const x = coords[i];
          const y = coords[i+1];
          if (!isNaN(x) && !isNaN(y)) {
            // 섹션별 범위
            if (x < sectionMinX) sectionMinX = x;
            if (y < sectionMinY) sectionMinY = y;
            if (x > sectionMaxX) sectionMaxX = x;
            if (y > sectionMaxY) sectionMaxY = y;
            // 전체 지도 범위
            if (x < globalMinX) globalMinX = x;
            if (y < globalMinY) globalMinY = y;
            if (x > globalMaxX) globalMaxX = x;
            if (y > globalMaxY) globalMaxY = y;
          }
        }
      }

      // 중앙 좌표 (API가 준 centerX가 있으면 그거 쓰고, 없으면 계산)
      const centerX = section.centerX ?? ((sectionMinX !== Infinity) ? (sectionMinX + sectionMaxX) / 2 : 0);
      const centerY = section.centerY ?? ((sectionMinY !== Infinity) ? (sectionMinY + sectionMaxY) / 2 : 0);

      return {
        id: String(section.sectionId),
        name: String(section.sectionId),
        type: type,
        color: getSectionColor(type),
        path: finalPath, // 만들어진 경로 할당
        x: centerX,
        y: centerY,
      };
    });

    // 시설물 찾기 (로직 동일)
    let rawFacilities: VenueApiFacility[] = [];
    if (data.facilities) {
      rawFacilities = data.facilities.filter((f) => Number(f.floor) === floorNum);
    } else if (data.floors) {
      const floorData = data.floors.find((f) => Number(f.floor) === floorNum);
      rawFacilities = floorData ? (floorData.facilities || []) : [];
    }

    const facilities = rawFacilities.map((facility) => ({
      id: String(facility.facilityId || facility.id),
      type: mapFacilityType(facility.type, facility.name),
      name: facility.name,
      x: facility.x,
      y: facility.y,
    }));

    return {
      floor: floorNum,
      sections,
      facilities,
    };
  });

  // 3. ViewBox 자동 설정
  let finalWidth = 1000, finalHeight = 800;
  let finalViewBoxX = 0, finalViewBoxY = 0;

  // 좌표가 하나라도 있으면 자동 계산값 사용
  if (globalMinX !== Infinity) {
    const padding = 100;
    finalViewBoxX = globalMinX - padding;
    finalViewBoxY = globalMinY - padding;
    finalWidth = (globalMaxX - globalMinX) + (padding * 2);
    finalHeight = (globalMaxY - globalMinY) + (padding * 2);
    console.log(`✅ [Debug] 지도 크기 자동 계산됨: ${finalWidth}x${finalHeight} (Vertices 기반)`);
  } else if (data.venue?.svgWidth && data.venue?.svgHeight) {
    finalWidth = data.venue.svgWidth;
    finalHeight = data.venue.svgHeight;
  }

  return {
    id: data.venue?.venueId || venueId,
    name: data.venue?.name || "공연장",
    address: data.venue?.address || "",
    totalFloors: floors.length,
    svgWidth: finalWidth,
    svgHeight: finalHeight,
    svgViewBoxX: finalViewBoxX,
    svgViewBoxY: finalViewBoxY,
    floors: floors,
  };
};

type ApiWrapped<T> = {
  payload?: T;
  result?: T;
} & T;

const normalizePathfindingResponse = (
  raw: ApiWrapped<PathfindingResult>,
): PathfindingResult => {
  return raw.payload || raw.result || raw;
};

export const getPathByQuery = async (
  venueId: number,
  params: PathfindingQueryRequest,
): Promise<PathfindingResult> => {
  const response = await apiClient.get<ApiWrapped<PathfindingResult>>(
    `/venues/${venueId}/pathfinding/path`,
    { params },
  );
  return normalizePathfindingResponse(response.data);
};

export const postPathByBody = async (
  venueId: number,
  body: PathfindingBodyRequest,
): Promise<PathfindingResult> => {
  const response = await apiClient.post<ApiWrapped<PathfindingResult>>(
    `/venues/${venueId}/pathfinding/path`,
    body,
  );
  return normalizePathfindingResponse(response.data);
};

export const getPathToFacility = async (
  venueId: number,
  facilityId: number,
  params: PathfindingToFacilityRequest,
): Promise<PathfindingResult> => {
  const response = await apiClient.get<ApiWrapped<PathfindingResult>>(
    `/venues/${venueId}/pathfinding/to-facility/${facilityId}`,
    { params },
  );
  return normalizePathfindingResponse(response.data);
};
