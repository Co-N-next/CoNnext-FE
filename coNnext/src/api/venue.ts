// [Venue쪽 API함수]

import api from "./axios";
import type {
  VenueListResponse,
  SearchVenuesResponse,
  GetNearestVenueRequest,
  GetNearestVenueResponse,
  GetFavoriteVenuesResponse,
  VenueResponse,
  Venue,
  Floor,
} from "../types/venue";
import {
  mapFacilityType,
  mapSectionType,
  getSectionColor,
} from "../types/venue";

// 인기 검색 공연장 조회(venues/trend-search)
export const getTrendingVenues = async (): Promise<VenueListResponse> => {
  const { data } = await api.get<VenueListResponse>(
    "/venues/trend-search",
  );
  return data;
};

//공연장검색(venue/search)
export const searchVenues = async (
  query: string,
  page: number = 0,
): Promise<SearchVenuesResponse> => {
  const { data } = await api.get<SearchVenuesResponse>(
    "/venues/search",
    {
      params: { query, page },
    },
  );
  return data;
};

//근처 공연장 조회(venues/nearby)
export const getNearestVenue = async (
  params: GetNearestVenueRequest,
): Promise<GetNearestVenueResponse> => {
  console.log("🔥 nearby API 호출됨", params);
  const { data } = await api.get<GetNearestVenueResponse>(
    "/venues/nearby",
    {
      params: {
        lat: params.lat,
        lng: params.lng,
        radius: params.radius ?? 500,
      },
    },
  );
  return data;
};

//venue/favoritte
export const getFavoriteVenues =
  async (): Promise<GetFavoriteVenuesResponse> => {
    const { data } =
      await api.get<GetFavoriteVenuesResponse>("/venues/favorites");
    return data;
  };

// 공연장 지도 데이터 조회
export const fetchVenueMap = async (venueId: number): Promise<Venue> => {
  const response = await api.get<{ payload: VenueResponse }>(
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
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  
  floors.forEach(floor => {
    floor.sections.forEach(section => {
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
    
    floor.facilities.forEach(facility => {
      minX = Math.min(minX, facility.x);
      minY = Math.min(minY, facility.y);
      maxX = Math.max(maxX, facility.x);
      maxY = Math.max(maxY, facility.y);
    });
  });

  const paddingPercent = 0.05;
  const paddingFixed = 20;
  const paddingX = (maxX - minX) * paddingPercent + paddingFixed;
  const paddingY = (maxY - minY) * paddingPercent + paddingFixed;
  
  const svgWidth = data.svgWidth || (maxX - minX + paddingX * 2);
  const svgHeight = data.svgHeight || (maxY - minY + paddingY * 2);
  const svgViewBoxX = minX - paddingX;
  const svgViewBoxY = minY - paddingY;
  
  const totalFloors = data.totalFloors || floors.length;

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
