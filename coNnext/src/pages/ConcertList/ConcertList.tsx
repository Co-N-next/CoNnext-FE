import { useGetList } from "../../hooks/queries/useGetList";
import { useState } from "react";
import { NearbyBanner } from "../../components/NearbyBanner";
import VenueCard from "../../components/VenueCard";
import { IoSearch } from "react-icons/io5"; // Ionicons (모바일 감성)

const ConcertList = () => {
  const [search, setSearch] = useState("유정");

  const { data, isPending, isError } = useGetList({ search });

  const today = new Date().toLocaleDateString("sv-SE");

  const isToday = (date: string) => {
    const itemDate = new Date(date).toISOString().split("T")[0];
    return itemDate === today;
  };

  const nearbySummary = {
    hasNearbyVenues: true, // 아직 거리계산 안함
    count: 2,
    nearestVenue: {
      id: 12,
      place: "잠실 주경기장",
      distanceKm: 0.8,
    },
  };

  if (isPending) {
    return <div className="mt-20">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-20">Error</div>;
  }

  return (
    <>
      {/* 가로 768이상 부터 반응형 */}
      <div className="relative w-full max-w-[600px] mt-6 mb-6 px-4 md:px-0 md:mx-auto">
        <h1 className="text-[25px] leading-[30px] font-semibold text-white mb-5">
          공연장 찾기
        </h1>

        {nearbySummary.hasNearbyVenues && (
          <NearbyBanner
            count={nearbySummary.count}
            place={nearbySummary.nearestVenue.place}
          />
        )}

        <div className="relative w-full max-w-[600px] mt-6 mb-6">
          <input
            className="w-full h-[56px] rounded-xl bg-[#1F2A3A] pl-5 pr-16 text-white placeholder:text-gray-400 outline-none"
            value={search}
            placeholder="공연장, 홀, 시설 검색"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[40px] w-[40px] rounded-lg bg-[#745AFF] flex items-center justify-center">
            <IoSearch className="text-white text-lg" />
          </button>
        </div>
      </div>

      <h2 className="text-[20px] leading-[24px] font-semibold text-white">
        지금 많이 찾는
      </h2>
      <div className="w-full">
        <div className="mt-4 flex gap-4 overflow-x-auto custom-scrollbar">
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
      </div>
      <h2 className="text-[20px] leading-[24px] font-semibold text-white">
        인기 검색 공연장
      </h2>
      {/* ✅ 가로 스크롤 리스트 (overflow-x-auto:스크롤바 생성담당)*/}
      <div className="w-full">
        <div className="flex gap-4 px-4 overflow-x-auto scrollbar-hide">
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
      </div>
    </>
  );
};

export default ConcertList;
