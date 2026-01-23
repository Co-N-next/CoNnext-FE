import { useGetList } from "../../hooks/queries/useGetList";
import { useState } from "react";
import { NearbyBanner } from "../../components/NearbyBanner";
import VenueCard from "../../components/VenueCard";
import { IoSearch } from "react-icons/io5";
import useDebounce from "../../hooks/queries/useDebounce";

const ConcertList = () => {
  const [search, setSearch] = useState("");
  const [showRecent, setShowRecent] = useState(false); // ✅ 최근 검색어 표시 여부
  const debouncedValue = useDebounce(search, 800);

  const {
    data = [],
    isPending,
    isError,
  } = useGetList({
    search: debouncedValue,
  });

  /* =========================
     UI 테스트용 최근 검색어 세팅
     (이미 있으면 다시 안 넣음)
  ========================= */
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

  /* =========================
     최근 검색어 (UI 전용)
  ========================= */
  const MAX_RECENT = 5;

  const recentKeywords = [
    localStorage.getItem("최근 검색어1"),
    localStorage.getItem("최근 검색어2"),
    localStorage.getItem("최근 검색어3"),
    localStorage.getItem("최근 검색어4"),
    localStorage.getItem("최근 검색어5"),
    localStorage.getItem("최근 검색어6"),
    localStorage.getItem("최근 검색어7"),
    localStorage.getItem("최근 검색어8"),
    localStorage.getItem("최근 검색어9"),
  ]
    .filter(Boolean)
    .slice(0, MAX_RECENT);

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

  if (isPending) {
    return <div className="mt-20 text-center text-white">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-20 text-center text-white">Error</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white flex justify-center">
      <div className="w-full max-w-[600px] px-4 py-6">
        {/* 제목 */}
        <h1 className="mb-5 text-[25px] leading-[30px] font-semibold">
          공연장 찾기
        </h1>

        {/* 근처 공연장 배너 */}
        {nearbySummary.hasNearbyVenues && (
          <NearbyBanner
            count={nearbySummary.count}
            place={nearbySummary.nearestVenue.place}
          />
        )}

        {/* 검색 영역 */}
        <div
          className="relative mt-6"
          onMouseEnter={() => setShowRecent(true)}
          onMouseLeave={() => setShowRecent(false)}
        >
          <input
            className="h-[56px] w-full rounded-xl bg-[#1F2A3A] pl-5 pr-16 text-white
                       placeholder:text-gray-400 outline-none"
            value={search}
            placeholder="공연장, 홀, 시설 검색"
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowRecent(true)}
            onBlur={() => setShowRecent(false)}
          />

          <button
            type="button"
            aria-label="검색"
            className="absolute right-2 top-1/2 -translate-y-1/2
                       flex h-[40px] w-[40px] items-center justify-center
                       rounded-lg bg-[#745AFF] hover:bg-[#5f49e6] transition-colors"
          >
            <IoSearch className="text-lg text-white" />
          </button>

          {/* ===== 최근 검색 ===== */}
          {showRecent && recentKeywords.length > 0 && (
            <section
              className="absolute z-20 mt-2 w-full
                         rounded-xl bg-[#111827] p-4 shadow-lg"
            >
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>최근 검색</span>
                <button className="text-xs">전체 삭제</button>
              </div>

              <ul className="mt-3 space-y-2">
                {recentKeywords.map((keyword, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between
                               rounded-lg bg-[#1F2A3A] px-4 py-3"
                  >
                    <span className="text-sm">{keyword}</span>
                    <button className="text-gray-500 text-sm">✕</button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* ===== 지금 많이 찾는 ===== */}
        <section className="mt-8">
          <h2 className="mb-4 text-[20px] leading-[24px] font-semibold">
            지금 많이 찾는
          </h2>

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

        {/* ===== 인기 검색 공연장 ===== */}
        <section className="mt-10">
          <h2 className="mb-4 text-[20px] leading-[24px] font-semibold">
            인기 검색 공연장
          </h2>

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
