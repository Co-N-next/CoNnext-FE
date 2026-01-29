<<<<<<< HEAD
import { useState } from "react";
import type { Concert } from "../../types/concert";
import ConcertCard from "../../components/ConcertCard";
import SelectBar from "../../components/SelectBar";
import AddTicket from "./AddTicket";
import { X } from "lucide-react";
import bol4 from "../../assets/images/bol4.svg";
import seventeen from "../../assets/images/seventeen.svg";
import { useNavigate } from "react-router-dom";
import TodayConcert from "../../components/TodayConcert";

const ReservationList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("public");

  // 예매 내역 입력 화면 표시 여부를 관리하는 state
  const [showAddTicket, setShowAddTicket] = useState(false);

  // 예매한 공연 목록을 state로 관리하여 추가/삭제 가능하도록 함
  const [bookedConcerts, setBookedConcerts] = useState<Concert[]>([]);

  const upcomingConcerts: Concert[] = [
    {
      id: "1",
      title: "어떤 콘서트 2025",
      subtitle: "",
      artist: "볼빨간사춘기",
      date: "2025.11.25(월)",
      time: "18:00",
      venue: "잠실야구장",
      seat: "1층 $구역 #열 &&번",
      imageUrl: bol4,
    },
  ];

  // 예매 내역 추가 함수 - 테스트용으로 임의의 예매 내역을 바로 추가
  const handleAddTicket = () => {
    const newReservation: Concert = {
      id: `reservation-${Date.now()}`,
      title: "2022 <BE THE SUN> IN SEOUL",
      subtitle: "",
      artist: "세븐틴 (SEVENTEEN)",
      date: "2022.06.25(월)",
      time: "18:00",
      venue: "고척스카이돔",
      seat: "1층 $구역 #열 &&번",
      imageUrl: seventeen,
    };
    setBookedConcerts([...bookedConcerts, newReservation]);
  };

  // 예매 내역 입력 화면에서 뒤로 돌아가는 함수
  const handleBackFromAddTicket = () => {
    setShowAddTicket(false);
  };

  // 예매 내역 제출 핸들러 - 입력한 텍스트를 기반으로 예매 내역 추가
  const handleSubmitReservation = (reservationText: string) => {
    // 입력한 텍스트를 기반으로 예매 내역 생성 (실제로는 서버 API 호출)
    const newReservation: Concert = {
      id: `reservation-${Date.now()}`,
      title: "2022 <BE THE SUN> IN SEOUL",
      subtitle: "",
      artist: "세븐틴 (SEVENTEEN)",
      date: "2022.06.25(월)",
      time: "18:00",
      venue: "고척스카이돔",
      seat: "1층 $구역 #열 &&번",
      imageUrl: seventeen,
    };
    setBookedConcerts([...bookedConcerts, newReservation]);
    console.log("입력한 예매 내역:", reservationText);
  };

  // 예매 내역 삭제 함수 - 선택한 예매 내역을 삭제
  const handleCancelReservation = (concertId: string) => {
    setBookedConcerts(
      bookedConcerts.filter((concert) => concert.id !== concertId)
    );
  };

  // 공연 찾기 버튼 클릭 핸들러 - 공연 검색 페이지로 이동하거나 공연 목록 표시
  const handleFindConcert = () => {
    console.log("공연 찾기 버튼 클릭");
    navigate("/add");
    // TODO: 실제 공연 검색 페이지로 라우팅하거나 공연 목록 모달 표시
  };

  // 공연 추가 버튼 클릭 핸들러 - 예매 내역 입력 화면으로 이동

  // 예매 내역 입력 화면이 표시되어야 할 때 해당 화면 렌더링
  if (showAddTicket) {
    return (
      <AddTicket
        onBack={handleBackFromAddTicket}
        onSubmit={handleSubmitReservation}
      />
    );
  }

  // 기본 예매 내역 목록 화면 렌더링
  return (
    <div className="min-h-screen bg-[#07132D] text-white">
      <div className="max-w-2xl mx-auto">
        <SelectBar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="space-y-6">
          {/* Today's Concerts Section */}
          <section>
            <h2 className="px-[24px] gap-[12px] py-4 text-[20px] font-semibold leading-[1.2]">
              오늘의 공연
            </h2>
            <div className="bg-gradient-to-b from-[#0E172A] to-[#2B1D5A] space-y-4">
              {upcomingConcerts.map((concert) => (
                <TodayConcert key={concert.id} concert={concert} />
              ))}
            </div>
          </section>

          {/* Booked Concerts Section - 예매한 공연 섹션 */}
          <section>
            <h2 className="px-6 pt-2 text-[18px] font-normal mb-4">
              다가오는 공연
            </h2>

            {/* 예매 내역이 있을 때: 예매 목록 표시 */}
            {bookedConcerts.length > 0 ? (
              <div className="space-y-4">
                {bookedConcerts.map((concert) => (
                  <div key={concert.id} className="relative">
                    <ConcertCard concert={concert} section="past" />
                    {/* 예매 취소 버튼 - 카드 상단 우측에 배치 */}
                    <button
                      onClick={() => handleCancelReservation(concert.id)}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 transition z-10"
                      aria-label="예매 취소"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              /* 예매 내역이 없을 때: 빈 상태 화면 표시 */
              <div className="flex flex-col items-center justify-center py-16 px-4">
                {/* 경고 아이콘 - 빨간색 원형 배경에 느낌표 */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-red-900/30 rounded-full flex items-center justify-center">
                    <div className="text-5xl font-bold text-red-500 mb-1">
                      !
                    </div>
                  </div>
                </div>

                {/* 안내 메시지 */}
                <p className="text-white text-[16px] font-medium mb-6">
                  예매한 공연이 없어요!
                </p>

                {/* 공연 찾기 버튼 - 회색 배경에 흰색 텍스트 */}
                <button
                  onClick={handleFindConcert}
                  className="bg-[#414141] hover:bg-gray-600 text-white w-full text-center text-[12px] px-8 py-3 rounded-lg font-medium transition"
                >
                  공연 찾기
                </button>
                <button
                  onClick={handleAddTicket}
                  className="mt-2 bg-[#7F5AFF] hover:bg-gray-600 text-white w-full text-center text-[12px] px-8 py-3 rounded-lg font-medium transition"
                >
                  예매 내역 추가하기
                </button>
              </div>
            )}

            {/* 테스트용 임의 버튼 섹션 - 예매 추가/삭제 테스트용 */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
=======
>>>>>>> 90d9491d37fe15f2f04a1d515ee33d890d73a1f7
