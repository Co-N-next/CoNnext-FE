import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import type { Concert } from "../../types/concert";
import { fetchConcertDetail } from "../../api/concert"; // ✅ API 함수 임포트
import { createReservation } from "../../api/reservation";

const AddDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const concert = location.state?.concert as Concert;

  // ✅ 화면 모드 상태 (false: 입력 모드, true: 확인 모드)
  const [isChecking, setIsChecking] = useState(false);

  // ✅ API에서 받아온 회차(스케줄) 목록 상태
  const [schedules, setSchedules] = useState<{ date: string; time: string }[]>([]);
  
  // 사용자가 선택한 스케줄의 인덱스 (-1이면 선택 안함)
  const [selectedScheduleIndex, setSelectedScheduleIndex] = useState<number>(-1);

  // 화면에 표시할 날짜 텍스트 (기본값은 공연 정보의 날짜, 선택 시 변경됨)
  const [displayDate, setDisplayDate] = useState(concert?.date || ""); 

  const [seatInfo, setSeatInfo] = useState({
    floor: "",
    section: "",
    row: "",
    number: "",
  });

  // ✅ 1. 화면 진입 시 공연 회차 정보(날짜 목록) 가져오기
  useEffect(() => {
    const loadDetails = async () => {
      if (concert?.id) {
        try {
          // API 호출: 공연 상세(회차) 정보 조회
          const data = await fetchConcertDetail(concert.id);
          
          // 백엔드 응답 구조에 따라 schedules 설정 (예: data.schedules가 배열이라고 가정)
          // 만약 API가 아직 없다면 빈 배열로 두거나 더미데이터를 넣어서 테스트하세요.
          setSchedules(data.schedules || []); 
          
        } catch (error) {
          console.error("상세 정보 로딩 실패:", error);
        }
      }
    };
    loadDetails();
  }, [concert]);

  // 방어 코드
  if (!concert) {
    return (
      <div className="min-h-screen bg-[#0F1320] text-white flex items-center justify-center">
        잘못된 접근입니다.
      </div>
    );
  }

  // 좌석 정보 텍스트 조합
  const fullSeatString = `${seatInfo.floor}층 ${seatInfo.section}구역 ${seatInfo.row}열 ${seatInfo.number}번`;

  // ✅ 2. 최종 저장 ('맞아요' 버튼 클릭 시)
  const handleConfirm = async () => {
    try {
      // 선택된 스케줄이 있다면 그 정보를, 없다면 기본 공연 정보를 사용
      // (날짜 포맷은 백엔드 요구사항에 맞춰 "YYYY-MM-DD" 형태로 변환 필요할 수 있음)
      const currentSchedule = selectedScheduleIndex !== -1 ? schedules[selectedScheduleIndex] : null;
      
      const finalDate = currentSchedule?.date || concert.date; // 예: "2025-11-25"
      const finalTime = currentSchedule?.time || concert.time; // 예: "18:00"

      // API 호출: 예매 내역 저장
      await createReservation({
        concertId: Number(concert.id),
        concertDate: finalDate,
        concertTime: finalTime,
        seatLocation: fullSeatString,
      });

      // 성공 시 목록 페이지로 이동
      navigate("/reserve");
      
    } catch (error) {
      console.error("예매 내역 저장 실패:", error);
      alert("저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // ------------------------------------------------------------------
  // 3. 확인 화면 (Check Mode) - isChecking이 true일 때 렌더링
  // ------------------------------------------------------------------
  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#0E172A] text-white font-sans flex flex-col">
        <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
          {/* 헤더 */}
          <div className="flex items-center gap-2 px-4 py-3 mb-2">
            <button onClick={() => setIsChecking(false)} className="p-1">
              <ChevronLeft size={24} className="text-white" />
            </button>
            <h1 className="text-lg font-bold">예매 내역 추가하기</h1>
          </div>

          {/* 안내 멘트 */}
          <div className="px-6 py-3 mb-8">
            <p className="text-[13px] font-normal leading-relaxed text-gray-200">
              예매한 공연의 상세 예약 정보를 확인해주세요.
              <br />
              공연의 상세 예약 정보가 모두 맞다면{" "}
              <span className="text-[#8e7aff] font-normal">맞아요</span> 버튼을
              눌러주세요.
              <br />
              아니라면{" "}
              <span className="text-gray-400 font-normal">수정할래요</span>{" "}
              버튼을 눌러주세요.
            </p>
          </div>

          {/* 중앙 카드 영역 */}
          <div className="px-5 flex-1 flex flex-col justify-center ">
            <div className="px-[46px] py-[24px] bg-[#1E293B] rounded-[24px] p-6 flex flex-col items-center shadow-2xl border border-white/5">
              {/* 포스터 */}
              <div className="w-[140px] h-[186px] rounded-[10px] overflow-hidden shadow-lg ">
                <img
                  src={concert.imageUrl}
                  alt={concert.title}
                  className="w-full h-full text-[16px] object-cover"
                />
              </div>

              {/* 정보 */}
              <h2 className="text-[16px] font-bold text-center mb-1 mt-4">
                {concert.title}
              </h2>
              <p className="text-[15px] text-gray-300 mb-6">{concert.artist}</p>

              <div className="w-full space-y-2">
                <div className="flex text-[13px] font-normal">
                  <span className="w-[50px] text-[#A1A1A1] flex-shrink-0">
                    일시
                  </span>
                  <span className="text-white">
                    {/* 선택된 날짜와 시간 표시 */}
                    {displayDate} {selectedScheduleIndex !== -1 ? schedules[selectedScheduleIndex].time : concert.time}
                  </span>
                </div>
                <div className="flex text-[13px]">
                  <span className="w-[50px] text-[#A1A1A1] flex-shrink-0">
                    장소
                  </span>
                  <span className="text-white">{concert.venue}</span>
                </div>
                <div className="flex text-[13px]">
                  <span className="w-[50px] text-[#A1A1A1] flex-shrink-0">
                    좌석
                  </span>
                  {/* 입력값이 없으면 빈칸 처리 */}
                  <span className="text-white">
                    {seatInfo.floor ? fullSeatString : "좌석 정보 없음"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="px-5 pb-40 w-full flex gap-3 mt-8">
            <button
              onClick={handleConfirm} // ✅ 최종 저장 API 호출
              className="flex-1 h-[40px] rounded-[10px] bg-[#7F5AFF] hover:bg-[#6B4DE6] text-white font-normal text-[13px]"
            >
              맞아요
            </button>
            <button
              onClick={() => setIsChecking(false)}
              className="flex-1 h-[40px] rounded-[10px] bg-[#3C3E4F] hover:bg-[#343644] text-gray-300 font-normal text-[13px]"
            >
              수정할래요
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // 4. 입력 화면 (Input Mode) - isChecking이 false일 때 렌더링
  // ------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0E172A] text-white font-sans flex flex-col">
      {/* --- 상단 영역 (배경색이 살짝 다름) --- */}
      <div className="bg-[#1E293B] rounded-b-[24px] ">
        {/* 헤더 */}
        <div className="bg-[#0E172A] flex items-center gap-2 px-4 py-4 mb-2">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft size={24} className="text-white" />
          </button>
          <h1 className="text-white font-['Pretendard'] text-[18px] font-normal leading-[120%]">
            예매 내역 추가하기
          </h1>
        </div>

        {/* 공연 정보 요약 카드 */}
        <div className="py-[20px] px-[24px] flex gap-[27px]">
          {/* 포스터 */}
          <div className="w-[84px] h-[112px] rounded-[8px] flex-shrink-0 ">
            <img
              src={concert.imageUrl}
              alt={concert.title}
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>

          {/* 텍스트 정보 */}
          <div className="flex flex-col justify-center ">
            <h2 className="text-[13px] font-bold leading-tight mb-1">
              {concert.title}
            </h2>
            <p className="text-[13px] font-medium text-gray-300 mb-1">
              {concert.artist}
            </p>
            <div className="space-y-0.5 text-[13px] text-gray-400">
              <div className="flex">
                <span className="w-8 flex-shrink-0">일시</span>
                <div className="flex flex-col flex-1 px-6">
                  <span className=" text-white">
                    {concert.date} {concert.time}
                  </span>
                </div>
              </div>
              <div className="flex pb-2">
                <span className="w-8 flex-shrink-0">장소</span>
                <span className="text-gray-200 px-6">{concert.venue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 입력 폼 영역 */}
      <div className="px-5 mt-8 flex-1 flex flex-col">
        <div className="mb-8">
          <p className="text-[15px] text-gray-200 leading-relaxed">
            예매하신 공연의 상세 예약 정보를 입력해주세요.
            <br />
            공연 일자와 좌석을 선택해주세요.
          </p>
        </div>

        {/* ✅ 공연 일자 선택 (Select Box로 변경) */}
        <div className="mb-8">
          <label className="block text-[15px] font-bold mb-3">
            공연 일자 선택
          </label>
          <div className="relative">
            <select
              value={selectedScheduleIndex}
              onChange={(e) => {
                const idx = Number(e.target.value);
                setSelectedScheduleIndex(idx);
                // 선택한 날짜로 표시 텍스트 업데이트
                if (idx !== -1 && schedules[idx]) {
                    setDisplayDate(schedules[idx].date);
                } else {
                    setDisplayDate(concert.date);
                }
              }}
              className="w-full h-[52px] bg-[#1E293B] border border-white/10 rounded-[10px] px-4 text-white focus:outline-none focus:border-[#7F5AFF] cursor-pointer appearance-none"
            >
              <option value={-1}>
                {schedules.length > 0 ? "날짜를 선택해주세요" : "로딩 중이거나 날짜 정보가 없습니다"}
              </option>
              {schedules.map((schedule, index) => (
                <option key={index} value={index} className="bg-[#1E293B]">
                  {schedule.date} {schedule.time}
                </option>
              ))}
            </select>
            {/* 커스텀 화살표 아이콘 (선택 사항) */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
               <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* 좌석 선택 */}
        <div className="mb-8">
          <label className="block text-[15px] font-bold mb-3">좌석 선택</label>
          <div className="flex flex-row gap-[8px] h-[42px] text-[13px]">
            {/* 층 */}
            <input
              type="text"
              placeholder="층"
              value={seatInfo.floor}
              onChange={(e) =>
                setSeatInfo({ ...seatInfo, floor: e.target.value })
              }
              className="w-[55px] px-[8px] py-[13px] flex items-center justify-end gap-[10px] rounded-[8px] border-[0.5px] border-[#A1A1A1] bg-[#1E293B] text-white text-right placeholder-[#E8E8E8] outline-none focus:border-[#7F5AFF] focus:ring-1 focus:ring-[#7F5AFF]"
            />
            {/* 구역 */}
            <input
              type="text"
              placeholder="구역"
              value={seatInfo.section}
              onChange={(e) =>
                setSeatInfo({ ...seatInfo, section: e.target.value })
              }
              className="w-[80px] px-[8px] py-[13px] flex items-center justify-end gap-[10px] rounded-[8px] border-[0.5px] border-[#A1A1A1] bg-[#1E293B] text-white text-right placeholder-[#E8E8E8] outline-none focus:border-[#7F5AFF] focus:ring-1 focus:ring-[#7F5AFF]"
            />
            {/* 열 */}
            <input
              type="text"
              placeholder="열"
              value={seatInfo.row}
              onChange={(e) =>
                setSeatInfo({ ...seatInfo, row: e.target.value })
              }
              className="w-[90px] px-[8px] py-[13px] flex items-center justify-end gap-[10px] rounded-[8px] border-[0.5px] border-[#A1A1A1] bg-[#1E293B] text-white text-right placeholder-[#E8E8E8] outline-none focus:border-[#7F5AFF] focus:ring-1 focus:ring-[#7F5AFF]"
            />
            {/* 번 */}
            <input
              type="text"
              placeholder="번"
              value={seatInfo.number}
              onChange={(e) =>
                setSeatInfo({ ...seatInfo, number: e.target.value })
              }
              className="w-full px-[8px] py-[13px] flex items-center justify-end gap-[10px] rounded-[8px] border-[0.5px] border-[#A1A1A1] bg-[#1E293B] text-white text-right placeholder-[#E8E8E8] outline-none focus:border-[#7F5AFF] focus:ring-1 focus:ring-[#7F5AFF]"
            />
          </div>
          
          <button
            onClick={() => {
                // 선택된 날짜가 있는지 체크 (선택사항)
                // if (selectedScheduleIndex === -1 && schedules.length > 0) {
                //    alert("공연 일자를 선택해주세요.");
                //    return;
                // }
                setIsChecking(true);
            }} 
            className="w-full h-[56px] rounded-[12px] bg-[#7F5AFF] hover:bg-[#6B4DE6] text-white font-bold text-[16px] transition-colors mt-8 mb-8"
          >
            입력 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDetail;