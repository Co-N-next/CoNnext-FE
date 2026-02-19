import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Sparkles } from "lucide-react";
import ConcertCard from "../../components/ConcertCard";
import SelectBar from "../../components/common/SelectBar";
import TodayConcert from "../../components/TodayConcert";
import EmptyTicketState from "./components/EmptyTicketState";
import ReservationSkeleton from "../../components/skeleton/ReserveSkeleton";
import {
  useTodayReservations,
  useUpcomingReservations,
  useDeleteReservation,
} from "../../hooks/useReservations";
import bol4 from "../../assets/images/bol4.svg";
import seventeen from "../../assets/images/seventeen.svg";
import redvelvet from "../../assets/images/redvelvet.svg";

const TABS = [
  { key: "public", label: "예매된 공연" },
  { key: "pharmacy", label: "보관함" },
] as const;

type ReserveTab = (typeof TABS)[number]["key"];

const MOCK_TODAY_DATA = [
  {
    id: "mock-today-1",
    title: "2024 10CM 콘서트",
    subtitle: "",
    date: "2024.05.20",
    time: "19:00",
    venue: "KSPO DOME",
    seat: "",
    imageUrl: bol4,
    artist: "10CM",
  },
];

const MOCK_UPCOMING_DATA = [
  {
    id: "mock-future-1",
    title: "아이유 H.E.R 월드투어",
    subtitle: "",
    date: "2024.06.15",
    time: "18:00",
    venue: "서울월드컵경기장",
    seat: "",
    imageUrl: seventeen,
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
    imageUrl: redvelvet,
    artist: "DAY6",
  },
];

const ReservationList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ReserveTab>("public");
  const [isDemoMode, setIsDemoMode] = useState(false);

  const { data: realToday = [], isLoading: isLoadingToday } = useTodayReservations();
  const { data: realUpcoming = [], isLoading: isLoadingUpcoming } = useUpcomingReservations();
  const deleteReservationMutation = useDeleteReservation();

  const todayConcerts = isDemoMode ? MOCK_TODAY_DATA : realToday;
  const futureConcerts = isDemoMode ? MOCK_UPCOMING_DATA : realUpcoming;

  const isLoading = isLoadingToday || isLoadingUpcoming;
  const isEmpty = todayConcerts.length === 0 && futureConcerts.length === 0;

  const handleDelete = async (reservationId: string) => {
    if (reservationId.startsWith("mock-")) {
      window.alert("가진 데이터가 삭제되었습니다. 새로고침하면 다시 나타납니다.");
      return;
    }

    if (!window.confirm("정말 해당 예매 내역을 삭제하시겠습니까?")) return;

    try {
      await deleteReservationMutation.mutateAsync(reservationId);
    } catch {
      window.alert("삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-[#07132D] text-white relative">
      <div className="max-w-2xl mx-auto">
        <SelectBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

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

        {isLoading && !isDemoMode ? (
          <ReservationSkeleton />
        ) : isEmpty ? (
          <EmptyTicketState />
        ) : (
          <div className="space-y-6 pb-24">
            {todayConcerts.length > 0 && (
              <section>
                <div className="space-y-4">
                  {todayConcerts.map((concert) => (
                    <div key={concert.id} className="relative">
                      <TodayConcert concert={concert} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {futureConcerts.length > 0 && (
              <section className="px-4">
                <h2 className="px-2 pt-1 text-[18px] font-normal mb-3">다가오는 공연</h2>

                <div className="space-y-4">
                  {futureConcerts.map((concert) => (
                    <div key={concert.id} className="relative group">
                      <ConcertCard concert={concert} />

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          void handleDelete(concert.id);
                        }}
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
