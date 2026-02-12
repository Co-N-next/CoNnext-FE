import { useNavigate } from "react-router-dom";
import { ChevronLeft, Share2, Pencil } from "lucide-react";

import type { Concert } from "../../types/concert";
import bol4 from "../../assets/images/bol4.svg";

// TODO: 백엔드 API가 준비되면 아래와 같이 React Query 훅을 사용하도록 변경
// import { useQuery } from "@tanstack/react-query";
// import { fetchConcertMates } from "../../api/mate";
// 
// const { data: mates, isLoading } = useQuery({
//   queryKey: ["concertMates", concertId],
//   queryFn: () => fetchConcertMates(concertId),
// });

// Mock Data for "Today's Concert"
const MOCK_CONCERT: Concert = {
  id: "1",
  title: "볼빨간사춘기 첫 팬미팅 [Wild and Free]",
  subtitle: "",
  artist: "볼빨간사춘기",
  date: "2025.11.25(월)",
  time: "18:00",
  venue: "KSPO DOME",
  seat: "1층 S구역 #열 &&번",
  imageUrl: bol4,
};

// Mock Data for "Today's Mates"
const MOCK_MATES = [
  {
    id: 1,
    name: "도둑맞은 고양이",
    location: "C구역 a열 t번",
    avatar: "🐱",
    color: "#E0D4FC",
  },
  {
    id: 2,
    name: "도둑맞은 고양이",
    location: "C구역 a열 t번",
    avatar: "🐱",
    color: "#E0D4FC",
  },
  {
    id: 3,
    name: "도둑맞은 고양이",
    location: "C구역 a열 t번",
    avatar: "🐱",
    color: "#E0D4FC",
  },
  {
    id: 4,
    name: "도둑맞은 고양이",
    location: "C구역 a열 t번",
    avatar: "🐱",
    color: "#E0D4FC",
  },
  {
    id: 5,
    name: "도둑맞은 고양이",
    location: "C구역 a열 t번",
    avatar: "🐱",
    color: "#E0D4FC",
  },
];

const MateMore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0E172A] text-white flex justify-center">
        <div className="w-full max-w-[450px] flex flex-col relative pb-10">
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-[18px] font-semibold">메이트 더보기</h1>
      </div>

      <div className="space-y-6">
    <div className="px-6 w-full rounded-[20px] overflow-hidden">
      {/* --- [상단] 공연 정보 영역 (배경 이미지 적용) --- */}
      <div className="relative">
        {/* 배경 이미지 및 오버레이 */}
        <div className="absolute inset-0 z-0">
          <img
            src={MOCK_CONCERT.imageUrl}
            alt={MOCK_CONCERT.title}
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
            <h3 className="text-[16px] font-normal font-family- leading-tight mb-1">
              {MOCK_CONCERT.title}
            </h3>
            <p className="text-[12px] font-normal text-gray-200">
              {MOCK_CONCERT.subtitle}
            </p>
          </div>
            <div className="flex text-[13px]">
              <span className="w-12 text-gray-300 flex-shrink-0">일시</span>
              <span className="text-white font-normal">
                {MOCK_CONCERT.date} {MOCK_CONCERT.time}
              </span>
            </div>
            <div className="flex text-[13px]">
              <span className="w-12 text-gray-300 flex-shrink-0">장소</span>
              <span className="text-white font-normal">{MOCK_CONCERT.venue}</span>
            </div>
            <div className="flex text-[13px]">
              <span className="w-12 text-gray-300 flex-shrink-0">좌석</span>
              <span className="text-white font-normal">
                {MOCK_CONCERT.seat || "좌석 정보 없음"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

        {/* Today's Mates List */}
        <div className="px-4">
          <h2 className="text-[18px] font-bold mb-4 px-2">오늘의 메이트</h2>
          <div className="flex flex-col">
            {MOCK_MATES.map((mate, index) => (
              <div
                key={mate.id + "-" + index} // simple unique key for mock data
                className="flex items-center gap-2 py-1 border-b border-white/5 last:border-none px-2"
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#E0D4FC] flex items-center justify-center text-2xl border border-[#7F5AFF]">
                  {mate.avatar}
                </div>
                
                {/* Info */}
                <div className="flex flex-col">
                  <span className="text-[15px] font-medium text-white">{mate.name}</span>
                  <span className="text-[12px] text-gray-400 font-light">{mate.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MateMore;
