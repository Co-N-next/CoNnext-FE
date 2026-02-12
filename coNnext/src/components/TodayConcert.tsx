import { Share2, Pencil } from "lucide-react";
import type { Concert } from "../types/concert";
import { useNavigate } from "react-router-dom";

interface TodayConcertProps {
  concert: Concert;
}

const TodayConcert = ({ concert }: TodayConcertProps) => {
  const navigate = useNavigate();

  return (
    // 전체 컨테이너: 둥근 모서리와 넘치는 부분 숨김 처리
    <div className="px-6 w-full rounded-[20px] overflow-hidden shadow-lg">
      {/* --- [상단] 공연 정보 영역 (배경 이미지 적용) --- */}
      <div className="relative">
        {/* 배경 이미지 및 오버레이 */}
        <div className="absolute inset-0 z-0">
          <img
            src={concert.imageUrl}
            alt={concert.title}
            className="w-full h-full object-cover rounded-[10px]"
          />
          <div className="absolute inset-0 bg-[#07132D]/50" />{" "}
          {/* 어두운 오버레이 */}
        </div>

        {/* 콘텐츠 영역 (z-10으로 배경 위에 올림) */}
        <div className="relative z-10 pt-[26px] pr-[19px] pl-[20px] pb-[6px] text-white mb-2">
          {/* 헤더: 제목 + 아이콘 버튼 */}
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

          {/* 공연 타이틀 및 부제 */}
  

          {/* 상세 정보 리스트 (일시, 장소, 좌석) */}
          <div className="space-y-0.5">
            <div className="mb-2">
            <h3 className="text-[24px] font-normal font-family- leading-tight mb-1">
              {concert.title}
            </h3>
            <p className="text-[16px] font-normal text-gray-200">
              {concert.subtitle}
            </p>
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
              <span className="text-white font-normal">
                {concert.seat || "좌석 정보 없음"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- [하단] 버튼 영역 (별도 배경색 적용) --- */}
      <div className=" py-1 space-y-[8px]">
        <div className="flex gap-2">
          <button 
            onClick={() => navigate('/mate')}
            className="flex-1 bg-[#7F5AFF] hover:bg-indigo-700 text-white p-[10px] rounded-[10px] font-medium text-[12px] transition"
          >
            메이트 찾기
          </button>
          <button className="flex-1 bg-[#7F5AFF] hover:bg-indigo-700 text-white p-[10px] rounded-[10px] font-medium text-[12px] transition">
            지도 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodayConcert;
