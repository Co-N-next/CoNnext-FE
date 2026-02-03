import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

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

const SearchHall = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);

  const debouncedValue = useDebounce(search, 1000);

  const { data = [] } = useGetList({
    search: debouncedValue,
  });

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

  /* 전체 삭제 ✅ (이게 빠져 있었음) */
  const handleClearAll = () => {
    RECENT_KEYS.forEach((key) => localStorage.removeItem(key));
    setRecentKeywords([]);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white px-4 py-6">
      {/* 상단 검색 */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)}>←</button>

        <div className="relative flex-1">
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="공연장, 홀, 시설 검색"
            className="h-[56px] w-full rounded-xl bg-[#1F2A3A]
                       pl-5 pr-14 outline-none"
          />

          <IoSearch className="absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
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
        <section className="mt-6 grid grid-cols-2 gap-3">
          {data.map((item: any) => (
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
        </section>
      )}
    </div>
  );
};

export default SearchHall;
