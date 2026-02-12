import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import ConcertCard from "../../components/ConcertCard";
import SelectBar from "../../components/SelectBar";
import TodayConcert from "../../components/TodayConcert";
import EmptyTicketState from "./components/EmptyTicketState";
import ReservationSkeleton from "../../components/skeleton/ReserveSkeleton";
import { useReservations, useDeleteReservation } from "../../hooks/useReservations";

const ReservationList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("public");

  // ✅ React Query 훅으로 데이터 가져오기
  const { data: allReservations = [], isLoading } = useReservations();
  const deleteReservationMutation = useDeleteReservation();

  // ✅ 삭제 함수 - 낙관적 업데이트 적용
  const handleDelete = async (reservationId: string) => {
    if (!window.confirm("정말 이 예매 내역을 삭제하시겠습니까?")) return;

    try {
      await deleteReservationMutation.mutateAsync(reservationId);
      // 성공 메시지는 낙관적 업데이트로 인해 즉시 UI에서 제거되므로 생략 가능
    } catch {
      // 에러는 이미 훅에서 처리되지만, 필요시 추가 처리
      alert("삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  // ✅ 날짜 비교 및 분류 로직
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}${mm}${dd}`; 
  };

  const normalizeDate = (dateStr: string) => {
    // "2025.11.25(월)" -> "20251125" 로 변환하여 비교
    return dateStr.replace(/[^0-9]/g, "").substring(0, 8);
  };

  const todayStr = getTodayString();

  // 오늘 공연
  const todayConcerts = allReservations.filter(
    (c) => normalizeDate(c.date) === todayStr
  );

  // 다가오는 공연 (오늘이 아닌 날짜)
  const futureConcerts = allReservations.filter(
    (c) => normalizeDate(c.date) !== todayStr
  );

  const isEmpty = allReservations.length === 0;

  // ---------------------------------------------------------
  // 렌더링
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#07132D] text-white">
      <div className="max-w-2xl mx-auto">
        <SelectBar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 로딩 중일 때 */}
        {isLoading ? (
          <ReservationSkeleton />
        ) : isEmpty ? (
          // 데이터가 없을 때
          <EmptyTicketState />
        ) : (
          // 데이터가 있을 때
          <div className="space-y-6 pb-24">
            
            {/* 1. Today's Concerts Section (오늘 공연) */}
            {todayConcerts.length > 0 && (
              <section className="pt-5 px-4">
                 {/* 오늘 공연은 보통 타이틀 없이 카드만 강조하거나, "오늘의 공연" 타이틀 추가 가능 */}
                <h2 className="text-[18px] font-bold mb-3 px-2">오늘의 공연</h2>
                <div className="space-y-4">
                  {todayConcerts.map((concert) => (
                    <div key={concert.id} className="relative">
                      <TodayConcert concert={concert} />
                      {/* 삭제 버튼 (오늘 공연은 삭제 못하게 할 수도 있음. 필요하면 추가) */}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 2. Booked Concerts Section (다가오는 공연) */}
            <section className="px-4">
              <h2 className="px-2 pt-1 text-[16px] font-normal mb-3">
                다가오는 공연
              </h2>
              
              <div className="space-y-4">
                {futureConcerts.map((concert) => (
                  <div key={concert.id} className="relative group">
                    {/* 공연 카드 */}
                    <ConcertCard concert={concert} />
                    
                    {/* ✅ 삭제 버튼 (카드 우측 상단에 배치) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // 카드 클릭 이벤트 방지
                        handleDelete(concert.id);
                      }}
                      disabled={deleteReservationMutation.isPending}
                      className="absolute top-3 right-3 w-8 h-8 bg-black/60 hover:bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="예매 내역 삭제"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </div>
                ))}

                {futureConcerts.length === 0 && todayConcerts.length === 0 && (
                   <div className="px-6 py-4 text-gray-400 text-center text-sm">
                     예매된 공연이 없습니다.
                   </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* Fixed Footer - 데이터가 있을 때만 표시 */}
        {!isEmpty && (
          <div className="bottom-0 left-0 right-0 px-5 py-6 bg-[#07132D] z-50">
            <div className="max-w-2xl mx-auto flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="w-[28%] bg-white text-[#07132D] p-[14px] rounded-[12px] font-bold text-[16px] leading-[1.2] transition flex items-center justify-center"
              >
                닫기
              </button>
              <button
                onClick={() => navigate("/add")}
                className="flex-1 bg-[#7F5AFF] text-white p-[14px] rounded-[12px] font-bold text-[16px] leading-[1.2] transition flex items-center justify-center gap-1"
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
