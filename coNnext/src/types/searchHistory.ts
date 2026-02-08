// SearchHistory쪽 API함수
// types/searchHistory.ts
//types/common.ts : 나중에 시간되면 공통으로 빼걸임
// 1️⃣ 검색 타입
export type SearchType = "CONCERT" | "VENUE";

// 2️⃣ 최근 검색어 한 개
export interface SearchHistoryItem {
  id: number;
  keyword: string;
  searchType: SearchType;
}

// 3️⃣ 최근 검색어 조회 응답
export interface GetSearchHistoryResponse {
  statusCode: number;
  message: string;
  pageInfo: {
    page: number;
    size: number;
    hasNext: boolean;
    totalElements: number;
    totalPages: number;
  };
  payload: SearchHistoryItem[];
}

// 4️⃣ 검색어 저장 요청
export interface PostSearchHistoryRequest {
  keyword: string;
  searchType: SearchType;
}

//단건삭제, 전체삭제를 만들지 않은이유?
//단건 삭제 / 전체 삭제는
// 타입을 안 만들어도 되는 게 아니라,
// “만들어도 얻는 정보가 없어서 안 만드는 것”이다
//->삭제된거는 굳이 또 쓸필요가 없어서 안만든다
