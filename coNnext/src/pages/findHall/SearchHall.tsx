import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../components/common/Search";
import before from "../../assets/logo/before.svg";
import PopularVenueTicker from "../../components/PopularVenueTicker";

import { useGetList } from "../../hooks/queries/useGetList";
import useDebounce from "../../hooks/queries/useDebounce";
import VenueCard from "../../components/VenueCard";

const MAX_RECENT = 7;
const RECENT_KEYS = [
  "최근 검색어1",
  "최근 검색어2",
  "최근 검색어3",
  "최근 검색어4",
  "최근 검색어5",
  "최근 검색어6",
];

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
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);

  const debouncedValue = useDebounce(search, 1000);

  const { data = [] } = useGetList({
    search: debouncedValue,
  });

  /* ✅ 검색 결과 공통 처리 (지금 / 나중 API 대비) */
  const items = (data as any)?.items ?? data;
  const totalCount = (data as any)?.totalCount ?? items.length;

  /* 최근 검색어 초기 로딩 */
  useEffect(() => {
    const keywords = RECENT_KEYS.map((key) => localStorage.getItem(key)).filter(
      Boolean,
    ) as string[];

    setRecentKeywords(keywords.slice(0, MAX_RECENT));
  }, []);

  /* 최근 검색어 저장 */
  useEffect(() => {
    if (!debouncedValue.trim()) return;

    const filtered = recentKeywords.filter((k) => k !== debouncedValue);
    const next = [debouncedValue, ...filtered].slice(0, MAX_RECENT);

    RECENT_KEYS.forEach((key) => localStorage.removeItem(key));
    next.forEach((keyword, index) => {
      localStorage.setItem(`최근 검색어${index + 1}`, keyword);
    });

    setRecentKeywords(next);
  }, [debouncedValue]);

  /* 개별 삭제 */
  const handleRemoveKeyword = (target: string) => {
    const filtered = recentKeywords.filter((k) => k !== target);

    RECENT_KEYS.forEach((key) => localStorage.removeItem(key));
    filtered.forEach((keyword, index) => {
      localStorage.setItem(`최근 검색어${index + 1}`, keyword);
    });

    setRecentKeywords(filtered);
  };

  /* 전체 삭제 */
  const handleClearAll = () => {
    RECENT_KEYS.forEach((key) => localStorage.removeItem(key));
    setRecentKeywords([]);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white px-4 py-6">
      {/* 상단 헤더 */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <img src={before} alt="뒤로가기" className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">공연장 찾기</h1>
      </div>

      {/* 인기 공연장 */}
      <div className="mt-5">
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
            {recentKeywords.map((keyword) => (
              <li key={keyword} className="flex justify-between items-center">
                <span>{keyword}</span>
                <button
                  onClick={() => handleRemoveKeyword(keyword)}
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
      {search && (
        <section className="mt-6">
          {/* 결과 개수 */}
          <div className="mb-3 ml-3 text-sm text-gray-400">
            검색 결과
            <span className="text-white font-medium">{totalCount}</span>건
          </div>

          <div className="grid grid-cols-2 gap-3">
            {items.map((item: any) => (
              <div key={item.id} className="scale-[0.95]">
                <VenueCard
                  image={item.image}
                  title={item.title}
                  place={item.place}
                  isToday={false}
                  isNew={item.isNew}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SearchHall;
