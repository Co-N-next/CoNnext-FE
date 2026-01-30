import { useQuery } from "@tanstack/react-query";
import { getList } from "../../pages/findHall/FindHall_list";

/**
 * 🔹 지금은 구조 연습용
 * 🔹 타입 / 공통 상수 / enum 다 빼고
 * 🔹 이 파일 하나만 봐도 이해되게
 * 쿼리는 정보를 구분하는게 아니라 전체 데이터 그대로 클라이언트에게 전달
 */
export function useGetList(params?: {
  // 공연장 목록 물어보는 전용함수 만들겠다.
  cursor?: number;
  limit?: number;
  search?: string;
  order?: string; //  검색 / 정렬 같은 걸 받을 자리”
}) {
  return useQuery({
    //return useQuery 👉 “서버한테 질문 하나 던질게” 이 안에 들어가는 건 전부👉 “이 질문의 규칙들”
    // 🔥 QUERY_KEY 상수 안 쓰고 그냥 문자열
    queryKey: ["lp-list", params?.search, params?.order], //“이 질문의 이름은 ‘lp-list + 검색조건 + 정렬조건’이야”

    // 🔥 PaginationDto 안 씀
    queryFn: () => getList(), // 👉 실제로 서버에게 물어보는 행동 “getList() 실행해서공연장 목록 받아와”(list.ts파일)

    // ✅ 캐시 전략 (그냥 그대로 둬도 됨)
    staleTime: 1000 * 60 * 5, // 5분 👉 5분 동안은 ‘이 데이터 최신이야’라고 믿겠다 화면 왔다 갔다 해도다시 서버에 안 물어봄
    gcTime: 1000 * 60 * 10, // 10분 👉 10분 지나면 이 질문 기억에서 지운다

    // 🔥 서버 응답에서 data만 뽑아줌
    select: (data) => data.data,
  });
}

// 2️⃣ select: (res: any) => res.data

// 👉 서버 응답에서 ‘진짜 필요한 것만 꺼내겠다’

// 서버는 이렇게 줌:

// {
//   status,
//   message,
//   data: [...]
// }

// 근데 화면은 data만 필요함

// 그래서:

// “포장 뜯고 내용물만 줘”
