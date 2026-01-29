import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import type { Concert } from "../../types/concert";

const AddDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const concert = location.state?.concert as Concert;

  // ✅ 화면 모드 상태 (false: 입력 모드, true: 확인 모드)
  const [isChecking, setIsChecking] = useState(false);

  // 입력값 관리 (상태가 유지되므로 왔다갔다 해도 데이터 안 날아감)
  const [selectedDate, setSelectedDate] = useState("2023.06.25(월)"); // 편의상 기본값 넣음
  const [seatInfo, setSeatInfo] = useState({
    floor: "",
    section: "",
    row: "",
    number: "",
  });

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

  // ------------------------------------------------------------------
  // 1. 확인 화면 (Check Mode) - isChecking이 true일 때 렌더링
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
              <h2 className="text-[16px] font-bold text-center mb-1">
                {concert.title}
              </h2>
              <p className="text-[15px] text-gray-300 mb-6">{concert.artist}</p>

              <div className="w-full">
                <div className="flex text-[13px] font-normal">
                  <span className="w-[50px] text-[#A1A1A1] flex-shrink-0">
                    일시
                  </span>
                  <span className="text-white">
                    {selectedDate} {concert.time}
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
          <div className="px-5 pb-40 w-full flex gap-3 ">
            <button
              onClick={() => navigate("/reserve")} // 최종 완료 시 메인으로
              className="flex-1 h-[40px] rounded-[10px] bg-[#7F5AFF] hover:bg-[#6B4DE6] text-white font-normal text-[13px]"
            >
              맞아요
            </button>
            <button
              onClick={() => setIsChecking(false)} // ✅ 다시 입력 화면으로 돌아가기
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
  // 2. 입력 화면 (Input Mode) - isChecking이 false일 때 렌더링
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
                  <span className="text-white">
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

        {/* 공연 일자 */}
        <div className="mb-8">
          <label className="block text-[15px] font-bold mb-3">
            공연 일자 선택
          </label>
          <input
            type="text"
            readOnly
            value={selectedDate}
            className="w-full h-[52px] bg-[#1E293B] border border-white/10 rounded-[10px] px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#7F5AFF] cursor-pointer"
          />
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
              className="w-[50px] px-[8px] py-[13px] flex items-center justify-end gap-[10px] rounded-[8px] border-[0.5px] border-[#A1A1A1] bg-[#222222]/50 text-white text-right placeholder-[#E8E8E8] outline-none focus:border-[#7F5AFF] focus:ring-1 focus:ring-[#7F5AFF]"
            />
            {/* 구역 */}
            <input
              type="text"
              placeholder="구역"
              value={seatInfo.section}
              onChange={(e) =>
                setSeatInfo({ ...seatInfo, section: e.target.value })
              }
              className="w-[73px]  px-[8px] py-[13px] flex items-center justify-end gap-[10px] rounded-[8px] border-[0.5px] border-[#A1A1A1] bg-[#222222]/50 text-white text-right placeholder-[#E8E8E8] outline-none focus:border-[#7F5AFF] focus:ring-1 focus:ring-[#7F5AFF]"
            />
            {/* 열 */}
            <input
              type="text"
              placeholder="열"
              value={seatInfo.row}
              onChange={(e) =>
                setSeatInfo({ ...seatInfo, row: e.target.value })
              }
              className="w-[84px] px-[8px] py-[13px] flex items-center justify-end gap-[10px] rounded-[8px] border-[0.5px] border-[#A1A1A1] bg-[#222222]/50 text-white text-right placeholder-[#E8E8E8] outline-none focus:border-[#7F5AFF] focus:ring-1 focus:ring-[#7F5AFF]"
            />
            {/* 번 */}
            <input
              type="text"
              placeholder="번"
              value={seatInfo.number}
              onChange={(e) =>
                setSeatInfo({ ...seatInfo, number: e.target.value })
              }
              className="w-[114px] px-[8px] py-[13px] flex items-center justify-end gap-[10px] rounded-[8px] border-[0.5px] border-[#A1A1A1] bg-[#222222]/50 text-white text-right placeholder-[#E8E8E8] outline-none focus:border-[#7F5AFF] focus:ring-1 focus:ring-[#7F5AFF]"
            />
          </div>
          <button
            onClick={() => setIsChecking(true)} // ✅ 확인 모드로 전환
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
