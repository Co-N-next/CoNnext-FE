import { useNavigate } from "react-router-dom";
import Search from "../../components/common/Search";
import { useTrendingVenues } from "../../hooks/queries/useTrendingVenues";
import { useGetNearestVenue } from "../../hooks/queries/useGetNearestVenue";
import { NearbyBanner } from "../../components/NearbyBanner";
import VenueCard from "../../components/VenueCard";
import PopularVenueTicker from "../../components/PopularVenueTicker";
import type { Venue } from "../../types/venue";

// ⭐ NEW
import { useFavoriteVenues } from "../../hooks/queries/useFavoriteVenues";

/* =========================
 * utils
 * ========================= */
const isToday = (date: string) => {
  const today = new Date().toISOString().slice(0, 10);
  return date === today;
};
// const todayVenueSummary = {
//   hasTodayVenue: true,
//   venue: {
//     name: "KSPO DOME",
//     city: "서울특별시 송파구",
//     image: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
//   },
// };
const FindHall = () => {
  const navigate = useNavigate();

  /* =========================
   * location (임시)
   * ========================= */
  const lat = 37.5665; // 서울 시청
  const lng = 126.978;
  const radius = 500;

  /* =========================
   * data fetching
   * ========================= */
  //인기 검색공연장(venue/trend-search)
  const {
    data: trendingData,
    isPending: isTrendingPending,
    isError: isTrendingError,
  } = useTrendingVenues();

  //근처 공연장 조회(venues/nearby)
  const { data: nearestVenueData, isLoading: isNearestLoading } =
    useGetNearestVenue({
      lat,
      lng,
      radius,
    });

  // ⭐ NEW: 즐겨찾기 공연장 쿼리
  const { data: favoriteData, isPending: isFavoritePending } =
    useFavoriteVenues();

  const venues: Venue[] = trendingData?.payload ?? [];

  // ⭐ NEW: 즐겨찾기용 데이터
  const favoriteVenues: Venue[] = favoriteData?.payload ?? [];

  /* =========================
   * loading / error
   * ========================= */
  if (isTrendingPending) {
    return <div className="mt-14 text-center text-white">Loading...</div>;
  }

  if (isTrendingError) {
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
        {/* <PopularVenueTicker
          list={venues.map((item) => ({
            id: item.id,
            name: item.name,
          }))}
        /> */}

        {/* =========================
         * Nearby Venue (실데이터)
         * ========================= */}
        {!isNearestLoading && nearestVenueData && (
          <div className="flex justify-center">
            <NearbyBanner
              venue={nearestVenueData.payload}
              radiusMeter={radius}
            />
          </div>
        )}

        {/* =========================
         * Today Venue
         * ========================= */}
        {/* {todayVenueSummary.hasTodayVenue && (
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
        )} */}

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
            {/* ⭐ NEW: 즐겨찾기 로딩 처리 */}
            {isFavoritePending && (
              <div className="text-sm text-gray-400">불러오는 중…</div>
            )}

            {/* ⭐ NEW: 즐겨찾기 데이터 사용 */}
            {favoriteVenues.map((item) => (
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

            {/* ⭐ NEW: 즐겨찾기 비어있을 때 */}
            {!isFavoritePending && favoriteVenues.length === 0 && (
              <div className="text-sm text-gray-500">
                즐겨찾기한 공연장이 없어요
              </div>
            )}
          </div>
        </section>

        {/* =========================
         * Popular Venues
         * ========================= */}
        <section>
          <h2 className="mb-1 text-[15px] font-semibold">인기 검색 공연장</h2>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hover">
            {/* ⭐ NEW: 인기 검색 로딩 상태 */}
            {isTrendingPending && (
              <div className="text-sm text-gray-400">불러오는 중…</div>
            )}

            {/* ⭐ NEW: 인기 검색 데이터 */}
            {!isTrendingPending &&
              venues.map((item) => (
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

            {/* ⭐ NEW: 인기 검색 결과 없음 */}
            {!isTrendingPending && venues.length === 0 && (
              <div className="text-sm text-gray-500">
                아직 인기 공연장이 없어요
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FindHall;
