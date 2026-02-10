//import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import type { Concert } from "../../types/tickets";
import RV from "../../assets/dumy/ReVel.svg";

/* ===== 더미 데이터 ===== */
const concertData: Concert & {
  date: string;
  time: string;
  rating: string;
  duration: string;
  venueName: string;
  venueLocation: string;
  venueImage: string;
  artistImage?: string;
} = {
  id: 1,
  title: "볼빨간사춘기 첫 팬미팅",
  subtitle: "[Wild and Free]",
  artist: "볼빨간사춘기",
  poster: RV,
  dDay: 0,
  isNew: false,
  views: 3200,
  date: "2024.12.15 (일)",
  time: "19:00",
  rating: "전체관람가",
  duration: "총 90분",
  venueName: "KSPO DOME",
  venueLocation: "서울특별시 송파구",
  venueImage: RV,
};

export default function ConcertInfo() {
  //const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <div className="w-full max-w-[450px] mx-auto">
        <div className="relative">
          <div className="relative h-[500px] w-full overflow-hidden">
            <img
              src={concertData.poster}
              alt={concertData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90" />
            <div className="absolute bottom-6 left-4 flex flex-col gap-3">

              <div className="w-24 h-32 rounded-lg overflow-hidden border-2 border-white/50 shadow-lg">
                <img
                  src={concertData.poster}
                  alt={concertData.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div>
                  <h2 className="text-lg font-semibold leading-tight text-[18px]">
                    {concertData.title} {concertData.subtitle}
                  </h2>
                  <p className="text-sm mt-1 text-[16px]">{concertData.artist}</p>
                </div>

                <div className="flex  items-center text-sm text-[13px]">
                  <span className="font-medium text-[#A1A1A1] w-16">일시</span>
                  <span className="font-normal">{concertData.date} {concertData.time}</span>
                </div>

                {/* 장소 */}
                <div className="flex items-center text-sm text-[13px]">
                  <span className="font-medium text-[#A1A1A1] w-16">장소</span>
                  <span className="font-normal">{concertData.venueName}</span>
                </div>

                {/* 관람등급 */}
                <div className="flex items-center text-sm text-[13px]">
                  <span className="font-medium text-[#A1A1A1] w-16">관람등급</span>
                  <span className="font-normal">{concertData.rating}</span>
                </div>

                {/* 관람시간 */}
                <div className="flex items-center text-sm text-[13px]">
                  <span className="font-medium text-[#A1A1A1] w-16">관람시간</span>
                  <span className="font-normal">{concertData.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 공연장 정보 ===== */}
        <div className="px-4 py-6 border-t border-gray-800">
          <h3 className="text-lg font-semibold text-[16px]">공연장 정보</h3>
          <div className="relative">
            <img
              src={concertData.venueImage}
              alt={concertData.venueName}
              className="w-full h-48 rounded-xl object-cover"
            />
            <span className="absolute top-3 left-3 rounded-full bg-[#8B7CFF] px-3 py-1 text-xs font-semibold text-white">
              Today
            </span>
          </div>
          <div className="mt-3">
            <p className="text-sm text-gray-400">{concertData.venueLocation}</p>
            <p className="text-base font-semibold mt-1">
              {concertData.venueName}
            </p>
          </div>
        </div>

        {/* ===== 아티스트 정보 ===== */}
        <div className="px-4 py-6 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-4">아티스트 정보</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
              <span className="text-gray-500 text-xs">이미지</span>
            </div>
          </div>
          <p className="text-base text-gray-400">아이린</p>
        </div>

        {/* ===== 공지사항 바로가기 ===== */}
        <div className="px-4 py-6 border-t border-gray-800 pb-20">
          <button
            className="flex items-center gap-2 text-base hover:opacity-80 transition-opacity"
          >
            <span>공지사항 전체 보기</span>
            <ExternalLink size={18} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}