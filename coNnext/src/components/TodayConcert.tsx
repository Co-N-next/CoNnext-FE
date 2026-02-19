import { Share2, Pencil } from "lucide-react";
import type { Concert } from "../types/concert";
import { useNavigate } from "react-router-dom";
import { resolveVenueId } from "../utils/venueNavigation";

interface TodayConcertProps {
  concert: Concert;
}

const TodayConcert = ({ concert }: TodayConcertProps) => {
  const navigate = useNavigate();

  const handleViewMap = async () => {
    const venueId = await resolveVenueId(concert.venue, concert.venueId);
    if (!venueId) {
      window.alert("공연장 지도를 찾을 수 없습니다.");
      return;
    }
    navigate(`/map/${venueId}`);
  };

  return (
    <div className="px-6 w-full rounded-[20px] overflow-hidden shadow-lg">
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <img
            src={concert.imageUrl}
            alt={concert.title}
            className="w-full h-full object-cover rounded-[10px]"
          />
          <div className="absolute inset-0 bg-[#07132D]/50" />
        </div>

        <div className="relative z-10 pt-[26px] pr-[19px] pl-[20px] pb-[6px] text-white mb-2">
          <div className="flex justify-between items-start mb-12">
            <h2 className="text-[22px] font-bold leading-tight">오늘의 공연</h2>
            <div className="flex gap-2">
              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/30 transition">
                <Share2 size={20} className="text-white" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/30 transition">
                <Pencil size={20} className="text-white" />
              </button>
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="mb-2">
              <h3 className="text-[24px] font-normal leading-tight mb-1">{concert.title}</h3>
              <p className="text-[16px] font-normal text-gray-200">{concert.subtitle}</p>
            </div>
            <div className="flex text-[13px]">
              <span className="w-12 text-gray-300 flex-shrink-0">일시</span>
              <span className="text-white font-normal">
                {concert.date} {concert.time}
              </span>
            </div>
            <div className="flex text-[13px]">
              <span className="w-12 text-gray-300 flex-shrink-0">장소</span>
              <span className="text-white font-normal">{concert.venue}</span>
            </div>
            <div className="flex text-[13px]">
              <span className="w-12 text-gray-300 flex-shrink-0">좌석</span>
              <span className="text-white font-normal">{concert.seat || "좌석 정보 없음"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-1 space-y-[8px]">
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/mate")}
            className="flex-1 bg-[#7F5AFF] hover:bg-indigo-700 text-white p-[10px] rounded-[10px] font-medium text-[12px] transition"
          >
            메이트 찾기
          </button>
          <button
            onClick={() => void handleViewMap()}
            className="flex-1 bg-[#7F5AFF] hover:bg-indigo-700 text-white p-[10px] rounded-[10px] font-medium text-[12px] transition"
          >
            지도 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodayConcert;
