import { useNavigate } from "react-router-dom";
import Search from "../../components/common/Search";

import { useGetList } from "../../hooks/queries/useGetList";
import { NearbyBanner } from "../../components/NearbyBanner";
import VenueCard from "../../components/VenueCard";
import PopularVenueTicker from "../../components/PopularVenueTicker";

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
  const {
    data = [],
    isPending,
    isError,
  } = useGetList({
    search: "",
  });

  /* =========================
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
  return (
    <div className="min-h-screen bg-[#0a0f1f] text-white flex justify-center">
      <div className="w-full max-w-[600px] px-2.5 py-2.5 space-y-4">
        {/* =========================
         * Header
         * ========================= */}
        <h1 className="text-[18px] font-semibold">공연장 찾기</h1>
        {/* =========================
         * Popular Rolling
         * ========================= */}
        <PopularVenueTicker list={popularVenueMock} />
        {/* =========================
         * Nearby Venue
         * ========================= */}
        {nearbySummary.hasNearbyVenues && (
          <div className="flex justify-center">
            <NearbyBanner
              count={nearbySummary.count}
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
                  image={todayVenueSummary.venue.image}
                  title={todayVenueSummary.venue.name}
                  place={todayVenueSummary.venue.city}
                  isToday={undefined}
                  isNew={undefined}
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
            {data.map((item: any) => (
              <div key={item.id} className="min-w-[110px]">
                <VenueCard
                  image={item.image}
                  title={item.title}
                  place={item.place}
                  isToday={isToday(item.date)}
                  isNew={item.isNew}
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
            {data.map((item: any) => (
              <div key={item.id} className="min-w-[110px]">
                <VenueCard
                  image={item.image}
                  title={item.title}
                  place={item.place}
                  isToday={isToday(item.date)}
                  isNew={item.isNew}
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
