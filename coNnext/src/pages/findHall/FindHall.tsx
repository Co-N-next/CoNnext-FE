import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

import { useGetList } from "../../hooks/queries/useGetList";
import { NearbyBanner } from "../../components/NearbyBanner";
import VenueCard from "../../components/VenueCard";

const FindHall = () => {
  const navigate = useNavigate();

  const {
    data = [],
    isPending,
    isError,
  } = useGetList({
    search: "",
  });

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
        <h1 className="mb-5 text-[25px] font-semibold">공연장 찾기</h1>

        {/* 근처 공연장 */}
        {nearbySummary.hasNearbyVenues && (
          <NearbyBanner
            count={nearbySummary.count}
            place={nearbySummary.nearestVenue.place}
          />
        )}

        {/* 검색창 (이동만) */}
        <div className="relative mt-6" onClick={() => navigate("/search")}>
          <input
            readOnly
            placeholder="공연장, 홀, 시설 검색"
            className="h-[56px] w-full rounded-xl bg-[#1F2A3A]
               pl-5 pr-16 text-white placeholder:text-gray-400
               cursor-pointer"
          />

          <div
            className="absolute right-2 top-1/2 -translate-y-1/2
               flex h-[40px] w-[40px] items-center justify-center
               rounded-lg bg-[#745AFF] pointer-events-none"
          >
            <IoSearch className="text-lg text-white" />
          </div>
        </div>

        {/* 즐겨찾기 */}
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

export default FindHall;
