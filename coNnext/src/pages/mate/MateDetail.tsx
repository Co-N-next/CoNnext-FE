import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Star } from "lucide-react";
import ConcertCard from "../../components/ConcertCard";
import type { Concert } from "../../types/concert";

interface MateInfo {
  id: string;
  name: string;
  imageUrl: string;
}

const MateDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mateInfo = location.state?.mate as MateInfo | undefined;

  const [activeTab, setActiveTab] = useState<"reserved" | "saved">("reserved");
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock 데이터 - 추후 API로 교체
  const reservedConcerts: Concert[] = [
    {
      id: "1",
      title: "LE SSERAFIM TOUR 'EASY CRAZY HOT' ENCORE IN SEOUL",
      subtitle: "LE SSERAFIM (르세라핌)",
      artist: "LE SSERAFIM (르세라핌)",
      date: "2026.01.31(토)",
      time: "18:00",
      venue: "고척스카이돔",
      seat: "R석 2구역",
      imageUrl: "https://via.placeholder.com/120x160?text=Concert1",
    },
    {
      id: "2",
      title: "FAM+ILY : FAMILY : FAM I LOVE YOU",
      subtitle: "G-DRAGON (지드래곤)",
      artist: "G-DRAGON (지드래곤)",
      date: "2026.02.06(금)",
      time: "19:00",
      venue: "KSPO DOME",
      seat: "A석 1구역",
      imageUrl: "https://via.placeholder.com/120x160?text=Concert2",
    },
  ];

  const savedConcerts: Concert[] = [
    {
      id: "3",
      title: "2026 IU CONCERT",
      subtitle: "IU (아이유)",
      artist: "IU (아이유)",
      date: "2026.03.15(일)",
      time: "18:00",
      venue: "잠실실내체육관",
      seat: "VIP석",
      imageUrl: "https://via.placeholder.com/120x160?text=Concert3",
    },
  ];

  const displayConcerts = activeTab === "reserved" ? reservedConcerts : savedConcerts;

  if (!mateInfo) {
    return (
      <div className="min-h-screen bg-[#0E172A] text-white flex items-center justify-center">
        <p>메이트 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E172A] text-white">
      <div className="max-w-2xl mx-auto pb-20">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-[#0E172A] border-b border-[#1E293B]">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="text-white hover:text-gray-300 transition"
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-[18px] font-semibold">메이트 정보</h1>
            </div>
          </div>
        </header>

        {/* Profile Section */}
        <section className="py-8 px-4 flex flex-col items-center">
          {/* Profile Image */}
          <div className="relative mb-4">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-[#1E293B]">
              <img
                src={mateInfo.imageUrl}
                alt={mateInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name and Favorite */}
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-[20px] font-bold">{mateInfo.name}</h2>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="transition"
            >
              <Star
                size={20}
                className={isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}
              />
            </button>
          </div>

          {/* Tabs */}
          <div className="w-full flex border-b border-[#1E293B]">
            <button
              onClick={() => setActiveTab("reserved")}
              className={`flex-1 py-3 text-[15px] font-medium transition ${
                activeTab === "reserved"
                  ? "text-white border-b-2 border-[#7F5AFF]"
                  : "text-gray-400"
              }`}
            >
              예매된 공연
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex-1 py-3 text-[15px] font-medium transition ${
                activeTab === "saved"
                  ? "text-white border-b-2 border-[#7F5AFF]"
                  : "text-gray-400"
              }`}
            >
              보관함
            </button>
          </div>
        </section>

        {/* Concert Card Section */}
        <section className="px-4">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#7F5AFF]" />
              <span className="text-[14px] font-semibold text-white">concert card</span>
            </div>
          </div>

          {/* Concert List */}
          <div className="space-y-4">
            {displayConcerts.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p>{activeTab === "reserved" ? "예매된 공연이 없습니다" : "보관된 공연이 없습니다"}</p>
              </div>
            ) : (
              displayConcerts.map((concert) => (
                <ConcertCard
                  key={concert.id}
                  concert={concert}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MateDetail;
