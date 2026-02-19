import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Sparkles } from "lucide-react"; // 아이콘 추가
import ConcertCard from "../../components/ConcertCard";
import SelectBar from "../../components/SelectBar";
import TodayConcert from "../../components/TodayConcert";
import EmptyTicketState from "./components/EmptyTicketState";
import ReservationSkeleton from "../../components/skeleton/ReserveSkeleton";
import { useTodayReservations, useUpcomingReservations, useDeleteReservation } from "../../hooks/useReservations";
import bol4 from "../../assets/images/bol4.svg";
import seventeen from "../../assets/images/seventeen.svg";
import redvelvet from "../../assets/images/redvelvet.svg";

// ✅ [MOCK DATA 1] 오늘 공연 데이터 예시
const MOCK_TODAY_DATA = [
  {
    id: "mock-today-1",
    title: "2024 10CM 콘서트",
    subtitle: "",
    date: "2024.05.20",
    time: "19:00",
    venue: "KSPO DOME",
    seat: "",
    imageUrl: bol4, // 👈 여기에 이미지 경로를 넣어주세요
    artist: "10CM",
  },
];

// ✅ [MOCK DATA 2] 다가오는 공연 데이터 예시
const MOCK_UPCOMING_DATA = [
  {
    id: "mock-future-1",
    title: "아이유 H.E.R 월드투어",
    subtitle: "",
    date: "2024.06.15",
    time: "18:00",
    venue: "서울월드컵경기장",
    seat: "",
    imageUrl: seventeen, // 👈 여기에 이미지 경로를 넣어주세요
    artist: "아이유",
  },
  {
    id: "mock-future-2",
    title: "데이식스 콘서트 <Welcome to the Show>",
    subtitle: "",
    date: "2024.07.21",
    time: "17:00",
    venue: "잠실실내체육관",
    seat: "",
    imageUrl: redvelvet, // 👈 여기에 이미지 경로를 넣어주세요
    artist: "DAY6",
  },
];

const ReservationList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("public");
  
  // ✅ [추가] Mock 데이터 활성화 여부 State
  const [isDemoMode, setIsDemoMode] = useState(false);

  // React Query 훅
  const { data: realToday = [], isLoading: isLoadingToday } = useTodayReservations();
  const { data: realUpcoming = [], isLoading: isLoadingUpcoming } = useUpcomingReservations();
  
  const deleteReservationMutation = useDeleteReservation();
  
  // ✅ [로직 변경] 데모 모드면 Mock 데이터를, 아니면 실제 데이터를 사용
  const todayConcerts = isDemoMode ? MOCK_TODAY_DATA : realToday;
  const futureConcerts = isDemoMode ? MOCK_UPCOMING_DATA : realUpcoming;

  const isLoading = isLoadingToday || isLoadingUpcoming;
  const isEmpty = todayConcerts.length === 0 && futureConcerts.length === 0;

  // 삭제 함수
  const handleDelete = async (reservationId: string) => {
    // Mock 데이터일 경우 처리
    if (reservationId.startsWith("mock-")) {
        alert("가짜 데이터가 삭제되었습니다! (새로고침하면 다시 생깁니다)");
        return;
    }

    if (!window.confirm("정말 이 예매 내역을 삭제하시겠습니까?")) return;

    try {
      await deleteReservationMutation.mutateAsync(reservationId);
    } catch {
      alert("삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  // ---------------------------------------------------------
  // 렌더링
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#07132D] text-white relative">
      <div className="max-w-2xl mx-auto">
        <SelectBar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ✅ [추가] Mock 데이터 토글 버튼 (개발용) */}
        <div className="flex justify-end px-4 mt-2 mb-2">
            <button 
                onClick={() => setIsDemoMode(!isDemoMode)}
                className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 transition-all ${
                    isDemoMode 
                    ? "bg-[#7F5AFF] text-white font-bold" 
                    : "bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700"
                }`}
            >
                <Sparkles size={12} />
                {isDemoMode ? "테스트 데이터 끄기" : "테스트 데이터 보기"}
            </button>
        </div>

        {/* 로딩 중일 때 */}
        {isLoading && !isDemoMode ? ( // 데모 모드일 땐 로딩 안 보여줌
          <ReservationSkeleton />
        ) : isEmpty ? (
          // 데이터가 없을 때
          <EmptyTicketState />
        ) : (
          // 데이터가 있을 때
          <div className="space-y-6 pb-24">
            
            {/* 1. Today's Concerts Section (오늘 공연) */}
            {todayConcerts.length > 0 && (
              <section className="">
                <div className="space-y-4">
                  {todayConcerts.map((concert) => (
                    <div key={concert.id} className="relative">
                      <TodayConcert concert={concert} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 2. Booked Concerts Section (다가오는 공연) */}
            {futureConcerts.length > 0 && (
              <section className="px-4">
                <h2 className="px-2 pt-1 text-[18px] font-normal mb-3">
                  다가오는 공연
                </h2>
                
                <div className="space-y-4">
                  {futureConcerts.map((concert) => (
                    <div key={concert.id} className="relative group">
                      {/* 공연 카드 */}
                      <ConcertCard concert={concert} />
                      
                      {/* 삭제 버튼 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(concert.id);
                        }}
                        // Mock 데이터일 땐 disabled 해제 (테스트용)
                        disabled={!isDemoMode && deleteReservationMutation.isPending}
                        className="absolute top-3 right-3 w-8 h-8 bg-black/60 hover:bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="예매 내역 삭제"
                      >
                        <X size={16} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Fixed Footer - 예매 내역이 있거나 테스트 데이터 모드일 때만 표시 */}
        {!isEmpty && (
          <div className="bottom-0 left-0 right-0 px-5 py-6 bg-[#07132D]/90 backdrop-blur-md z-50 border-t border-white/5">
              <div className="max-w-2xl mx-auto flex gap-3">
                <button
                  onClick={() => navigate("/home")}
                  className="w-[28%] bg-white text-[#07132D] p-[14px] rounded-[12px] font-bold text-[16px] leading-[1.2] transition flex items-center justify-center hover:bg-gray-200"
                >
                  닫기
                </button>
                <button
                  onClick={() => navigate("/add")}
                  className="flex-1 bg-[#7F5AFF] text-white p-[14px] rounded-[12px] font-bold text-[16px] leading-[1.2] transition flex items-center justify-center gap-1 hover:bg-[#6b4bd0]"
                >
                  + 예매 내역 추가하기
                </button>
              </div>
          </div>
        )}
        
      </div>
    </div>
  );
        
 
};

export default ReservationList;