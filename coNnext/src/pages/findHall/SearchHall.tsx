//api정리 (venuesearch - 검색시 나오는 카드리스트)
//(trend-search가 위엘 롤링되는거 )
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../components/common/Search";
import before from "../../assets/logo/before.svg";
import PopularVenueTicker from "../../components/PopularVenueTicker";
import { useVenuesearch } from "../../hooks/queries/useVenuesearch";
import {
  getSearchHistory,
  postSearchHistory,
  deleteSearchHistory,
  deleteAllSearchHistory,
} from "../../api/SearchHistory";
import VenueCard from "../../components/VenueCard";
import { useTrendingVenues } from "../../hooks/queries/useTrendingVenues";

import useDebounce from "../../hooks/queries/useDebounce";

const SearchHall = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [recentKeywords, setRecentKeywords] = useState<
    { id: number; keyword: string }[]
  >([]);

  const debouncedValue = useDebounce(search, 1000);
  const { data, isLoading } = useVenuesearch({
    search: debouncedValue,
    page: 0,
  });
  const { data: trendingData, isLoading: isTrendingLoading } =
    useTrendingVenues();

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
        {isTrendingLoading ? (
          <p className="text-sm text-gray-400">인기 공연장 불러오는 중...</p>
        ) : (
          <PopularVenueTicker
            list={
              trendingData?.payload.map((venue) => ({
                id: venue.id,
                name: venue.name,
              })) ?? []
            }
          />
        )}
      </div>

      {/* 검색창
   - Search 컴포넌트에는 API를 직접 연결하지 않음
   - 입력값(search)이 디바운스 → 값 변경 시 useVenuesearch 쿼리 실행
*/}
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
      {search && (
        <section className="mt-6 grid grid-cols-2 gap-3">
          {isLoading && (
            <p className="col-span-2 text-sm text-gray-400">검색 중...</p>
          )}

          {data?.payload.map((item) => (
            <div key={item.id} className="scale-[0.95]">
              <VenueCard
                id={item.id}
                name={item.name}
                city={item.city}
                imageUrl={item.imageUrl}
                isToday={true}
                isNew={false}
              />
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default SearchHall;
