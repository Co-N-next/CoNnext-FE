import { useNavigate } from "react-router-dom";

const EmptyTicketState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-30 mt-2 px-3">
      {/* 경고 아이콘 - 빨간색 원형 배경에 느낌표 */}
      <div className="relative mb-8">
        <div className="w-[70px] h-[70px] bg-[#FF484866] rounded-full flex items-center justify-center">
          <div className="text-[40px] font-bold text-[#FF4848]">!</div>
        </div>
      </div>

      {/* 안내 메시지 */}
      <h2 className="text-white text-[18px] font-semibold mb-1">
        예매된 공연이 없어요!
      </h2>
      
      {/* 서브 메시지 */}
      <p className="text-gray-400 text-[12px] text-center leading-relaxed mb-9">
        예매한 공연을 찾거나 예매 내역을 추가해주세요.
      </p>

      {/* 버튼 영역 */}
      <div className="w-full max-w-md flex-1 px-2 space-y-2">
        <button
          onClick={() => navigate("/home")}
          className="w-full bg-[#4A5568] hover:bg-[#5A6678] text-white p-[14px] rounded-[12px] font-bold text-[14px] leading-[1.2] transition flex items-center justify-center"
        >
          공연 찾기
        </button>
        <button
          onClick={() => navigate("/add")}
          className="w-full bg-[#7F5AFF] hover:bg-[#6B4DE6] text-white p-[14px] rounded-[12px] font-bold text-[14px] leading-[1.2] transition flex items-center justify-center gap-1"
        >
          예매 내역 추가하기
        </button>
      </div>
    </div>
  );
};

export default EmptyTicketState;
