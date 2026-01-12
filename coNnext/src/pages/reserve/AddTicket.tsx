import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectBar from "../../components/SelectBar";
import { Search } from "lucide-react";

interface AddTicketProps {
  onBack?: () => void;
  onSubmit?: (reservationText: string) => void;
}

const AddTicket = ({ onBack, onSubmit }: AddTicketProps = {}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("public");
  // 입력 필드의 텍스트를 관리하는 state
  const [inputText, setInputText] = useState("");

  // 제출 버튼 핸들러 - 입력한 텍스트를 부모 컴포넌트로 전달
  const handleSubmit = () => {
    if (inputText.trim()) {
      // props로 전달된 onSubmit이 있으면 사용, 없으면 기본 동작
      if (onSubmit) {
        onSubmit(inputText);
      } else {
        console.log("입력한 예매 내역:", inputText);
        // TODO: 실제 예매 내역 저장 로직 구현
      }
      // 제출 후 입력 필드 초기화
      setInputText("");
      // 이전 화면으로 돌아가기 - props로 전달된 onBack이 있으면 사용, 없으면 라우터로 이동
      if (onBack) {
        onBack();
      } else {
        navigate("/reserve");
      }
    }
  };

  // 취소 버튼 핸들러 - props로 전달된 onBack이 있으면 사용, 없으면 라우터로 이동
  const handleCancel = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/reserve");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <div className="max-w-2xl mx-auto">
        <SelectBar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="">
          {/* 예매 내역 입력하기 제목 - 보라색 점선 테두리로 강조, 타이틀 아래에 배치 */}
          <h1 className="text-xl font-bold px-[24px] py-3 rounded-lg inline-block mt-4">
            예매 내역 추가하기
          </h1>

          {/* 입력 필드 섹션 */}
          <div className="p-4 space-y-2">
            <div>
              {/* 텍스트 입력 박스 - 큰 회색 입력 박스, 약간 둥근 모서리 */}
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="공연 이름 검색"
                className="flex-1 w-full max-h-[44px] bg-[#1E293B] border border-gray-700 rounded-[10px] p-[4px] gap-[4px] text-white text-[13px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
              <button onClick={() => console.log("검색!")}>
                <Search
                  size={18}
                  className="bg-[#7F5AFF] text-gray-500 hover:text-white transition-colors"
                />
              </button>
            </div>

            {/* 제출 버튼 - 입력 내용을 저장하고 이전 화면으로 돌아감 */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                disabled={!inputText.trim()}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTicket;
