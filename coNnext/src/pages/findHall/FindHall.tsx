import { useNavigate } from "react-router-dom";
import Search from "../../components/common/Search";
import { useTrendingVenues } from "../../hooks/queries/useTrendingVenues";
import { NearbyBanner } from "../../components/NearbyBanner";
import VenueCard from "../../components/VenueCard";
import PopularVenueTicker from "../../components/PopularVenueTicker";
import type { Venue } from "../../types/venue";
/* =========================
 * utils
 * ========================= */
const isToday = (date: string) => {
  const today = new Date().toISOString().slice(0, 10);
  return date === today;
};

/* =========================
 * mock / summary data
 * ========================== */
const nearbySummary = {
  hasNearbyVenues: true,
  count: 2,
  nearestVenue: {
    id: 12,
    place: "잠실 주경기장",
    distanceKm: 0.8,
  },
};

// ⛔ 기존 popularVenueMock 유지 (구조 최대한 유지)
// const popularVenueMock = [ ... ];

const todayVenueSummary = {
  hasTodayVenue: true,
  venue: {
    name: "KSPO DOME",
    city: "서울특별시 송파구",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
  },
};

const FindHall = () => {
  const navigate = useNavigate();

  /* =========================
   * data fetching
   * ========================= */
  const { data, isPending, isError } = useTrendingVenues();

  const venues: Venue[] = data?.payload ?? []; /* =========================
   * loading / error
   * ========================= */
  if (isPending) {
    return <div className="mt-14 text-center text-white">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-14 text-center text-white">Error</div>;
  }

  /* =========================
   * render
   * ========================= */
  //임시
  console.log("trending venues data:", data);
  console.log("payload length:", venues.length);

  return (
    <div className="min-h-screen bg-[#0a0f1f] text-white flex justify-center">
      <div className="w-full max-w-[600px] px-2.5 py-2.5 space-y-4">
        {/* =========================
         * Header
         * ========================= */}
        {/* 임시 */}
        <p className="text-white text-sm">venues count: {venues.length}</p>
        <h1 className="text-[18px] font-semibold">공연장 찾기</h1>

        {/* =========================
         * Popular Rolling
         * ========================= */}
        {/* 🔥 변경: mock → 서버 데이터 기반으로 name만 가공 */}
        <PopularVenueTicker
          list={venues.map((item) => ({
            id: item.id,
            name: item.name,
          }))}
        />

        {/* =========================
         * Nearby Venue
         * ========================= */}
        {nearbySummary.hasNearbyVenues && (
          <div className="flex justify-center">
            <NearbyBanner
              radiusMeter={nearbySummary.count}
              place={nearbySummary.nearestVenue.place}
            />
          </div>
        )}

        {/* =========================
         * Today Venue
         * ========================= */}
        {todayVenueSummary.hasTodayVenue && (
          <section>
            <h2 className="mb-4 text-[15px] font-semibold">오늘의 공연장</h2>

            <div className="flex justify-center">
              <div
                className="w-[400px] h-[180px]
                [&_div:first-child]:h-[120px]
                [&_div:first-child]:aspect-auto"
              >
                <VenueCard
                  id={0} // 임시값 (mock)
                  name={todayVenueSummary.venue.name}
                  city={todayVenueSummary.venue.city}
                  imageUrl={todayVenueSummary.venue.image}
                  isToday={true}
                  isNew={false}
                />
              </div>
            </div>
          </section>
        )}

        {/* =========================
         * Search
         * ========================= */}
        <Search readOnly onClick={() => navigate("/search")} />

        {/* =========================
         * Favorite Venues
         * ========================= */}
        <section>
          <h2 className="mb-1 text-[15px] font-semibold">즐겨찾기</h2>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hover">
            {/* 🔥 변경: 서버 데이터 필드명에 맞춤 */}
            {venues.map((item) => (
              <div key={item.id} className="min-w-[110px]">
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
          </div>
        </section>

        {/* =========================
         * Popular Venues
         * ========================= */}
        <section>
          <h2 className="mb-1 text-[15px] font-semibold">인기 검색 공연장</h2>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hover">
            {/* 🔥 변경: 위 섹션과 동일하게 서버 데이터 사용 */}
            {venues.map((item) => (
              <div key={item.id} className="min-w-[110px]">
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default FindHall;
