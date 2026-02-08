import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../components/common/Search";
import before from "../../assets/logo/before.svg";
import PopularVenueTicker from "../../components/PopularVenueTicker";
import type { Venue } from "../../types/venue";
import {
  getSearchHistory,
  postSearchHistory,
  deleteSearchHistory,
  deleteAllSearchHistory,
} from "../../api/SearchHistory";

import { useGetList } from "../../hooks/queries/useGetList";
import useDebounce from "../../hooks/queries/useDebounce";
import VenueCard from "../../components/VenueCard";

const popularVenueMock = [
  { id: 1, name: "KSPO DOME" },
  { id: 2, name: "잠실 주경기장" },
  { id: 3, name: "고척 스카이돔" },
  { id: 4, name: "서울 월드컵 경기장" },
  { id: 5, name: "KSPO DOME" },
  { id: 6, name: "잠실 주경기장" },
  { id: 7, name: "고척 스카이돔" },
  { id: 8, name: "서울 월드컵 경기장" },
  { id: 9, name: "고척 스카이돔" },
  { id: 10, name: "서울 월드컵 경기장" },
];

const SearchHall = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [recentKeywords, setRecentKeywords] = useState<
    { id: number; keyword: string }[]
  >([]);
  const debouncedValue = useDebounce(search, 1000);

  const { data } = useGetList({
    search: debouncedValue,
  });

  const items: Venue[] = data?.payload ?? [];
  const totalCount = data?.pageInfo?.totalElements ?? 0;
  /* 최근 검색어 초기 로딩 */
  useEffect(() => {
    const fetchRecentKeywords = async () => {
      try {
        const res = await getSearchHistory("VENUE");

        setRecentKeywords(
          res.payload.slice(0, 7).map((item) => ({
            id: item.id,
            keyword: item.keyword,
          })),
        );
      } catch (e) {
        console.error(e);
      }
    };

    fetchRecentKeywords();
  }, []);

  /* 최근 검색어 저장 */
  useEffect(() => {
    if (!debouncedValue.trim()) return;

    // 🔒 이미 최근 검색어에 있으면 저장 안 함
    const exists = recentKeywords.some(
      (item) => item.keyword === debouncedValue,
    );
    if (exists) return;

    const saveKeyword = async () => {
      try {
        await postSearchHistory({
          keyword: debouncedValue,
          searchType: "VENUE",
        });

        // 다시 조회해서 최신 상태 동기화
        const res = await getSearchHistory("VENUE");
        setRecentKeywords(
          res.payload.map((item) => ({
            id: item.id,
            keyword: item.keyword,
          })),
        );
      } catch (e) {
        console.error(e);
      }
    };

    saveKeyword();
  }, [debouncedValue, recentKeywords]);
  /* 개별 삭제 */
  const handleRemoveKeyword = async (id: number) => {
    try {
      await deleteSearchHistory(id);

      setRecentKeywords((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  /* 전체 삭제 */
  const handleClearAll = async () => {
    try {
      await deleteAllSearchHistory("VENUE");
      setRecentKeywords([]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white px-4 py-6">
      {/* 상단 헤더 */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/find")}>
          <img src={before} alt="뒤로가기" className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">공연장 찾기</h1>
      </div>

      {/* 인기 공연장 */}
      <div className="mt-8">
        <PopularVenueTicker list={popularVenueMock} />
      </div>

      {/* 검색창 */}
      <div className="flex items-center gap-3 mb-4">
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* 최근 검색어 */}
      {search === "" && recentKeywords.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm text-gray-400">최근 검색</h2>
            <button
              onClick={handleClearAll}
              className="text-xs text-gray-500 hover:text-gray-300"
            >
              전체 삭제
            </button>
          </div>

          <ul className="space-y-2">
            {recentKeywords.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.keyword}</span>
                <button
                  onClick={() => handleRemoveKeyword(item.id)}
                  className="text-gray-500 hover:text-white"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 검색 결과 */}
      {/* 검색 결과 */}
      {debouncedValue && (
        <section className="mt-6">
          {/* 결과 개수 */}
          <div className="mb-3 ml-3 text-sm text-gray-400">
            검색 결과
            <span className="text-white font-medium">{totalCount}</span>건
          </div>

          {items.length === 0 ? (
            <div className="mt-10 text-center text-gray-400">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {items.map((item) => (
                <div key={item.id} className="scale-[0.95]">
                  <VenueCard
                    id={item.id}
                    name={item.name}
                    city={item.city}
                    imageUrl={item.imageUrl}
                    isToday={false}
                    isNew={false}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default SearchHall;
