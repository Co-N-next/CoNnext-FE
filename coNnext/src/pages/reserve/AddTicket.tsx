import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectBar from "../../components/common/SelectBar";
import { Search } from "lucide-react";

interface AddTicketProps {
  onBack?: () => void;
  onSubmit?: (reservationText: string) => void;
}

const TABS = [
  { key: "public", label: "공연장" },
  { key: "pharmacy", label: "야구장" },
] as const;

type AddTicketTab = (typeof TABS)[number]["key"];

const AddTicket = ({ onBack, onSubmit }: AddTicketProps = {}) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<AddTicketTab>("public");
  const [inputText, setInputText] = useState("");

  //제출 버튼 핸들러
  const handleSubmit = () => {
    if (!inputText.trim()) return;

    if (onSubmit) {
      onSubmit(inputText);
    } else {
      console.log("입력한 예매 내역:", {
        type: activeTab,
        text: inputText,
      });
    }
  //제출 후 입력 필두 초기화
    setInputText("");

    if (onBack) {
      onBack();
    } else {
      navigate("/reserve");
    }
  };
  //취소 버튼 핸들러
  const handleCancel = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/reserve");
    }
  };

  const handleSearch = () => {
    console.log("검색:", {
      type: activeTab,
      keyword: inputText,
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <div className="max-w-2xl mx-auto">
        <SelectBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div>
          <h1 className="text-xl font-bold px-6 py-3 mt-4">
            예매 내역 추가하기
          </h1>

          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  activeTab === "public"
                    ? "공연 이름 검색"
                    : "야구 경기 검색"
                }
                className="flex-1 max-h-[44px] bg-[#1E293B] border border-gray-700 rounded-[10px] p-2 text-white text-[13px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <button
                onClick={handleSearch}
                className="p-2 rounded-lg bg-[#7F5AFF] hover:bg-[#6a46e5] transition"
              >
                <Search size={18} />
              </button>
            </div>

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
