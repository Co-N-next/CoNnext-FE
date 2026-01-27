import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5"; //커밋

import { useGetList } from "../../hooks/queries/useGetList";
import useDebounce from "../../hooks/queries/useDebounce";

import { NearbyBanner } from "../../components/NearbyBanner";
import VenueCard from "../../components/VenueCard";

const MAX_RECENT = 7;
const RECENT_KEYS = [
  "최근 검색어1",
  "최근 검색어2",
  "최근 검색어3",
  "최근 검색어4",
  "최근 검색어5",
  "최근 검색어6",
  "최근 검색어7",
  "최근 검색어8",
  "최근 검색어9",
];

const ConcertList = () => {
  /* =========================
     STATE
  ========================= */
  const [search, setSearch] = useState("");
  const [showRecent, setShowRecent] = useState(false);
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false); // ✅ 추가

  const debouncedValue = useDebounce(search, 1000);

  /* =========================
     DATA FETCH
  ========================= */
  const {
    data = [],
    isPending,
    isError,
  } = useGetList({
    search: debouncedValue,
  });

  /* =========================
     LOCAL STORAGE INIT (ONCE)
  ========================= */
  useEffect(() => {
    if (!localStorage.getItem("최근 검색어1")) {
      localStorage.setItem("최근 검색어1", "KSPO DOME");
      localStorage.setItem("최근 검색어2", "잠실 주 경기장");
      localStorage.setItem("최근 검색어3", "고척 스카이돔");
      localStorage.setItem("최근 검색어4", "KSPO DOME");
      localStorage.setItem("최근 검색어5", "명화 라이브홀");
      localStorage.setItem("최근 검색어6", "예술의 전당");
      localStorage.setItem("최근 검색어7", "세종문화회관");
      localStorage.setItem("최근 검색어8", "코엑스 오디토리움");
      localStorage.setItem("최근 검색어9", "고척 스카이돔");
    }

    const keywords = RECENT_KEYS.map((key) => localStorage.getItem(key)).filter(
      Boolean,
    ) as string[];

    setRecentKeywords(keywords.slice(0, MAX_RECENT));
  }, []);

  /* =========================
     UTIL
  ========================= */
  const isToday = (date: string) => {
    const today = new Date().toISOString().slice(0, 10);
    return date === today;
  };

  const nearbySummary = {
    hasNearbyVenues: true,
    count: 2,
    nearestVenue: {
      id: 12,
      place: "잠실 주경기장",
      distanceKm: 0.8,
    },
  };
  /* =========================
   RECENT SEARCH HANDLERS ✅ (추가)
========================= */
  const syncRecentKeywords = () => {
    const keywords = RECENT_KEYS.map((key) => localStorage.getItem(key)).filter(
      Boolean,
    ) as string[];

    setRecentKeywords(keywords.slice(0, MAX_RECENT));
  };

  // ✅ 전체 삭제
  const handleClearAll = () => {
    if (recentKeywords.length === 0) {
      setShowEmptyMessage(true); // 이미 비어있을 때
      return;
    }

    RECENT_KEYS.forEach((key) => localStorage.removeItem(key));
    setRecentKeywords([]);
    setShowEmptyMessage(true); // 삭제 후 메시지 표시
  };

  // ✅ 낱개 삭제
  const handleRemoveKeyword = (target: string) => {
    const filtered = recentKeywords.filter((k) => k !== target);

    // 기존 키 전부 삭제
    RECENT_KEYS.forEach((key) => localStorage.removeItem(key));

    // 다시 1번부터 저장
    filtered.forEach((keyword, index) => {
      localStorage.setItem(`최근 검색어${index + 1}`, keyword);
    });

    setRecentKeywords(filtered);
  };

  /* =========================
     RENDER STATES
  ========================= */
  if (isPending) {
    return <div className="mt-20 text-center text-white">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-20 text-center text-white">Error</div>;
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white flex justify-center">
      <div className="w-full max-w-[600px] px-4 py-6">
        {/* 제목 */}
        <h1 className="mb-5 text-[25px] leading-[30px] font-semibold">
          공연장 찾기
        </h1>

        {/* 근처 공연장 */}
        {nearbySummary.hasNearbyVenues && (
          <NearbyBanner
            count={nearbySummary.count}
            place={nearbySummary.nearestVenue.place}
          />
        )}

        <div className="relative mt-6">
          {/* 검색 */}
          <input
            className="h-[56px] w-full rounded-xl bg-[#1F2A3A] pl-5 pr-16
                   text-white placeholder:text-gray-400 outline-none"
            value={search}
            placeholder="공연장, 홀, 시설 검색"
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setShowRecent((prev) => !prev)} // ⭐ 핵심
          />

          {/* 검색 버튼 */}
          <button
            type="button"
            aria-label="검색"
            className="absolute right-2 top-1/2 -translate-y-1/2
                   flex h-[40px] w-[40px] items-center justify-center
                   rounded-lg bg-[#745AFF]"
          >
            <IoSearch className="text-lg text-white" />
          </button>

          {showRecent && (
            <section
              className="absolute z-20 mt-2 w-full
                bg-[#111827] p-4 shadow-lg"
            >
              <div className="flex items-center justify-between text-sm text-gray-400">
                {recentKeywords.length > 0 && (
                  <>
                    <span>최근 검색</span>
                    <button className="text-xs" onClick={handleClearAll}>
                      전체 삭제
                    </button>
                  </>
                )}
              </div>

              {/* ✅ 최근 검색어 없음 */}
              {recentKeywords.length === 0 ? (
                <div className="mt-4 text-center text-sm text-gray-500">
                  최근 검색어가 없습니다
                </div>
              ) : (
                <ul className="mt-3 space-y-2">
                  {recentKeywords.map((keyword, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-sm text-white">{keyword}</span>
                      <button
                        className="text-gray-500 text-sm"
                        onClick={() => handleRemoveKeyword(keyword)}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </div>
        {/* 지금 많이 찾는 */}
        <section className="mt-8">
          <h2 className="mb-4 text-[20px] font-semibold">즐겨찾기</h2>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {data.map((item: any) => (
              <VenueCard
                key={item.id}
                image={item.image}
                title={item.title}
                place={item.place}
                isToday={isToday(item.date)}
                isNew={item.isNew}
              />
            ))}
          </div>
        </section>

        {/* 인기 검색 공연장 */}
        <section className="mt-10">
          <h2 className="mb-4 text-[20px] font-semibold">인기 검색 공연장</h2>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {data.map((item: any) => (
              <VenueCard
                key={item.id}
                image={item.image}
                title={item.title}
                place={item.place}
                isToday={isToday(item.date)}
                isNew={item.isNew}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ConcertList;
