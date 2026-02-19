import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../components/common/Search";
import { useTrendingVenues } from "../../hooks/queries/useTrendingVenues";
import { useGetNearestVenue } from "../../hooks/queries/useGetNearestVenue";
import { NearbyBanner } from "../../components/NearbyBanner";
import VenueCard from "../../components/VenueCard";
import { useFavoriteVenues } from "../../hooks/queries/useFavoriteVenues";
import type { Venue } from "../../types/venueSearch";

const DEFAULT_LOCATION = { lat: 37.5665, lng: 126.978 };
const DEFAULT_RADIUS = 500;

const FindHall = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(DEFAULT_LOCATION);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        // Keep default location when geolocation is unavailable.
      },
      { enableHighAccuracy: true, timeout: 5000 },
    );
  }, []);

  const {
    data: trendingData,
    isPending: isTrendingPending,
    isError: isTrendingError,
  } = useTrendingVenues();

  console.log("🧭 lat:", lat, "lng:", lng);

  const {
    data: nearestVenueData,
    isLoading: isNearestLoading,
    isError: isNearestError,
  } = useGetNearestVenue({
    lat: location.lat,
    lng: location.lng,
    radius: DEFAULT_RADIUS,
  });

  const {
    data: favoriteData,
    isPending: isFavoritePending,
    isError: isFavoriteError,
  } = useFavoriteVenues();

  const venues: VenueListItem[] = trendingData?.payload ?? [];

  return (
    <div className="flex min-h-screen justify-center bg-[#0a0f1f] text-white">
      <div className="w-full max-w-[600px] space-y-4 px-2.5 py-2.5">
        <h1 className="text-[18px] font-semibold">공연장 찾기</h1>

        {!isNearestLoading && !isNearestError && nearestVenueData?.payload && (
          <div className="flex justify-center">
            <NearbyBanner
              venue={nearestVenueData.payload}
              radiusMeter={DEFAULT_RADIUS}
            />
          </div>
        )}

        {!isNearestLoading && !nearestVenueData?.payload && (
          <div className="rounded-xl bg-[#1B2540] p-4 text-sm text-gray-300">
            근처에 공연장이 없습니다.
          </div>
        )}

        <Search readOnly onClick={() => navigate("/search")} />

        <section>
          <h2 className="mb-1 text-[15px] font-semibold">즐겨찾기</h2>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {isFavoritePending && (
              <div className="text-sm text-gray-400">불러오는 중...</div>
            )}

            {isFavoriteError && (
              <div className="text-sm text-red-400">
                즐겨찾기를 불러오지 못했습니다.
              </div>
            )}

            {!isFavoritePending &&
              !isFavoriteError &&
              (favoriteData?.payload ?? []).map((item) => (
                <div key={item.id} className="min-w-[150px]">
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => navigate(`/map/${item.id}`)}
                  >
                    <VenueCard
                      id={item.id}
                      name={item.name}
                      city={item.city}
                      imageUrl={item.imageUrl}
                      isToday={true}
                      isNew={false}
                    />
                  </button>
                </div>
              ))}

            {!isFavoritePending &&
              !isFavoriteError &&
              (favoriteData?.payload ?? []).length === 0 && (
                <div className="text-sm text-gray-500">
                  즐겨찾기 공연장이 없습니다.
                </div>
              )}
          </div>
        </section>

        <section>
          <h2 className="mb-1 text-[15px] font-semibold">인기 공연장</h2>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {isTrendingPending && (
              <div className="text-sm text-gray-400">불러오는 중...</div>
            )}

            {isTrendingError && (
              <div className="text-sm text-red-400">
                공연장을 불러오지 못했습니다.
              </div>
            )}

            {!isTrendingPending &&
              !isTrendingError &&
              venues.map((item) => (
                <div key={item.id} className="min-w-[150px]">
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => navigate(`/map/${item.id}`)}
                  >
                    <VenueCard
                      id={item.id}
                      name={item.name}
                      city={item.city}
                      imageUrl={item.imageUrl}
                      isToday={true}
                      isNew={false}
                    />
                  </button>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FindHall;
