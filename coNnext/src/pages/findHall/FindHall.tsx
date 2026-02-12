import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../components/common/Search";
import { useTrendingVenues } from "../../hooks/queries/useTrendingVenues";
import { useGetNearestVenue } from "../../hooks/queries/useGetNearestVenue";
import { NearbyBanner } from "../../components/NearbyBanner";
import VenueCard from "../../components/VenueCard";
// import PopularVenueTicker from "../../components/PopularVenueTicker";
import type { VenueListItem } from "../../types/venue";

// ⭐ NEW
import { useFavoriteVenues } from "../../hooks/queries/useFavoriteVenues";

/* =========================
 * utils
 * ========================= */
const isToday = (date: string) => {
  const today = new Date().toISOString().slice(0, 10);
  return date === today;
};

// 오늘의 공연장 목데이터 (API 명세 미정)
const todayVenueSummary = {
  hasTodayVenue: true,
  venue: {
    id: 999,
    name: "KSPO DOME",
    city: "서울특별시 송파구",
    imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
  },
};

const FindHall = () => {
  const navigate = useNavigate();

  /* =========================
   * 실제 사용자 위치
   * ========================= */
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("📍 위치 가져옴:", pos.coords.latitude, pos.coords.longitude);
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      (err) => {
        console.warn("❌ 위치 권한 거부 또는 오류:", err.message);
      }
    );
  }, []);

  /* =========================
   * data fetching
   * ========================= */
  //인기 검색공연장(venue/trend-search)
  const {
    data: trendingData,
    isPending: isTrendingPending,
    isError: isTrendingError,
  } = useTrendingVenues();

  console.log("🧭 lat:", lat, "lng:", lng);

  //근처 공연장 조회(venues/nearby)
  const { data: nearestVenueData, isLoading: isNearestLoading } =
    useGetNearestVenue({
      lat: lat ?? 0,
      lng: lng ?? 0,
    });

  // // ⭐ NEW: 즐겨찾기 공연장 쿼리
  const { data: favoriteData, isPending: isFavoritePending } =
    useFavoriteVenues();

  const venues: VenueListItem[] = trendingData?.payload ?? [];

  // // ⭐ NEW: 즐겨찾기용 데이터
  const favoriteVenues: VenueListItem[] = favoriteData?.payload ?? [];

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
        {/* ⏳ 로딩 */}
        {isTrendingPending && (
          <div className="mt-6 text-center text-gray-400">불러오는 중…</div>
        )}
        {/* ❌ 에러 */}
        {isTrendingError && (
          <div className="mt-6 text-center text-red-400">
            데이터를 불러오지 못했어요
          </div>
        )}{" "}
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
        {!isNearestLoading && nearestVenueData?.payload && (
          <div className="flex justify-center">
            <NearbyBanner
              venue={nearestVenueData.payload}
            />
          </div>
        )}
        {/* =========================
         * Today Venue (목데이터 — API 미정)
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
                  id={todayVenueSummary.venue.id}
                  name={todayVenueSummary.venue.name}
                  city={todayVenueSummary.venue.city}
                  imageUrl={todayVenueSummary.venue.imageUrl}
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
        {/* ========================= Favorite Venues =========================// */}
        <section>
          <h2 className="mb-1 text-[15px] font-semibold">즐겨찾기</h2>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hover">
            {isFavoritePending && (
              <div className="text-sm text-gray-400">불러오는 중…</div>
            )}

            {favoriteVenues.map((item) => (
              <div key={item.id} className="w-[130px] shrink-0">
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
            {/* ⏳ 로딩 메시지 (리스트 위에 얹기) */}
            {isTrendingPending && (
              <div className="text-sm text-gray-400">불러오는 중…</div>
            )}

            {/* ✅ 리스트는 항상 렌더 */}
            {venues.map((item) => (
              <div key={item.id} className="w-[130px] shrink-0">
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

            {/* 📭 결과 없음 (로딩 끝난 뒤에만) */}
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
