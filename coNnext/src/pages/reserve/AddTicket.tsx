import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SelectBar from "../../components/SelectBar";
import { Search, ChevronLeft, Check } from "lucide-react";
import type { Concert } from "../../types/concert";
import { searchConcerts } from "../../api/concert"; // API 함수 임포트

interface AddTicketProps {
  onBack?: () => void;
}

const AddTicket = ({ onBack }: AddTicketProps = {}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("public");
  
  // 검색어 입력 State
  const [inputText, setInputText] = useState("");

  // ✅ 선택된 공연 정보 (이게 있으면 확인 화면, 없으면 검색 리스트 화면)
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);

  // ✅ API 연동을 위한 State (검색 결과, 로딩, 검색 여부)
  const [searchResults, setSearchResults] = useState<Concert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // 검색을 한 적이 있는지 체크

  // 뒤로가기 핸들러
  const handleBack = () => {
    // 만약 확인 화면(공연 선택됨) 상태라면 -> 리스트 화면으로 돌아가기
    if (selectedConcert) {
      setSelectedConcert(null);
      return;
    }

    // 리스트 화면이라면 -> 아예 이전 페이지로 나가기
    if (onBack) onBack();
    else navigate("/reserve");
  };

  // ✅ 검색 핸들러 (API 호출)
  const handleSearch = async () => {
    if (!inputText.trim()) return;

    try {
      setIsLoading(true);
      setHasSearched(true); // 검색 시도함 표시
      
      // API 호출
      const results = await searchConcerts(inputText);
      setSearchResults(results);
      
    } catch (error) {
      console.error("검색 실패:", error);
      
      // 더 구체적인 에러 메시지 제공
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          alert("검색 결과를 찾을 수 없습니다.");
        } else if (error.response?.status === 500) {
          alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } else if (error.code === 'ECONNABORTED') {
          alert("요청 시간이 초과되었습니다. 네트워크 연결을 확인해주세요.");
        } else {
          alert(`검색 중 오류가 발생했습니다. (${error.message})`);
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 키보드 엔터 이벤트
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  // ---------------------------------------------------------
  // 1. 확인 화면 렌더링 (선택된 공연이 있을 때 보여줄 화면)
  // ---------------------------------------------------------
  if (selectedConcert) {
    return (
      <div className="min-h-screen bg-[#0F1320] text-white font-sans flex flex-col">
        <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
          <SelectBar activeTab={activeTab} onTabChange={setActiveTab} />
          
          {/* 헤더 */}
          <div className="flex items-center gap-2 px-4 py-4 mb-4">
            <button onClick={handleBack} className="p-1">
              <ChevronLeft size={24} className="text-white" />
            </button>
            <h1 className="text-lg font-bold">예매 내역 추가하기</h1>
          </div>

          {/* 안내 멘트 */}
          <div className="px-6 mb-10">
            <p className="text-[17px] leading-relaxed text-gray-200">
              이 공연을 예매한 것으로 보여요.
              <br />이 공연을 예매한 것이 맞다면{" "}
              <span className="text-[#8e7aff] font-bold">맞아요</span>를
              눌러주세요!
            </p>
          </div>

          {/* 공연 카드 */}
          <div className="px-6 flex gap-5">
            <div className="w-[120px] h-[160px] rounded-[12px] shadow-lg flex-shrink-0 overflow-hidden bg-gray-800">
              <img
                src={selectedConcert.imageUrl}
                alt={selectedConcert.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col py-1">
              <h2 className="text-[18px] font-bold leading-tight mb-1">
                {selectedConcert.title}
              </h2>
              <p className="text-[16px] font-medium text-white mb-4">
                {selectedConcert.artist}
              </p>
              <div className="space-y-1 text-[14px]">
                <div className="flex">
                  <span className="w-10 text-gray-400 flex-shrink-0">일시</span>
                  <div className="text-gray-200 block">
                    {selectedConcert.date} {selectedConcert.time}
                  </div>
                </div>
                <div className="flex">
                  <span className="w-10 text-gray-400 flex-shrink-0">장소</span>
                  <span className="text-gray-200">{selectedConcert.venue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 버튼 영역 */}
          <div className="mt-auto px-5 pb-8 pt-4 w-full flex gap-3">
            <button
              onClick={() =>
                navigate("/add-detail", { state: { concert: selectedConcert } })
              }
              className="flex-1 h-[40px] rounded-[12px] bg-[#7F5AFF] hover:bg-[#6B4DE6] text-white font-bold text-[13px]"
            >
              맞아요
            </button>
            <button
              onClick={() => setSelectedConcert(null)}
              className="flex-1 h-[40px] rounded-[12px] bg-[#3C3E4F] hover:bg-[#343644] text-white font-medium text-[13px]"
            >
              아니에요
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // 2. 리스트 화면 렌더링 (선택된 공연이 없을 때)
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0E172A] text-white font-sans">
      <div className="max-w-2xl mx-auto">
        <SelectBar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex items-center gap-2 px-4 py-4">
          <button onClick={handleBack} className="p-1">
            <ChevronLeft size={24} className="text-white" />
          </button>
          <h1 className="text-lg font-bold">예매 내역 추가하기</h1>
        </div>

        <div className="px-5">
          {/* 검색바 */}
          <div className="mb-6">
            <div className="text-sm font-medium mb-2 text-gray-300">
              공연 찾기
            </div>
            <div className="w-full flex items-center pl-[12px] pr-[4px] py-[4px] gap-[4px] rounded-[10px] border border-black/10 bg-[#1E293B] focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown} // 엔터키 이벤트 연결
                placeholder="아티스트 또는 공연명으로 검색하세요."
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none border-none text-[14px]"
              />
              <button 
                onClick={handleSearch} // 버튼 클릭 이벤트 연결
                className="w-[40px] h-[40px] bg-[#7F5AFF] hover:bg-[#6B4DE6] rounded-lg flex items-center justify-center transition-colors shadow-lg flex-shrink-0"
              >
                <Search size={22} className="text-white" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 text-xs">
            <span className="text-gray-300">
              {/* 실제 검색 결과 개수 표시 */}
              검색결과 {searchResults.length}건
            </span>
            <div className="flex gap-3 text-gray-500">
              <button className="flex items-center gap-1 text-white font-medium">
                <Check size={14} /> 최신순
              </button>
              <button>정확도순</button>
            </div>
          </div>

          {/* 리스트 영역 */}
          <div className="space-y-0 pb-10">
            {/* 1. 로딩 중일 때 */}
            {isLoading && (
              <div className="py-20 text-center text-gray-400">
                검색 중입니다...
              </div>
            )}

            {/* 2. 검색 결과가 없을 때 (로딩 끝남 + 검색함 + 결과 0개) */}
            {!isLoading && hasSearched && searchResults.length === 0 && (
              <div className="py-20 text-center text-gray-500">
                검색 결과가 없습니다.
              </div>
            )}

            {/* 3. 검색 결과 목록 표시 */}
            {!isLoading && searchResults.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedConcert(item)}
                className="flex px-2 gap-[27px] cursor-pointer group hover:bg-white/5 rounded-xl transition-colors py-2"
              >
                <div className="w-[103px] h-[144px] rounded-[10px] shadow-[0_4px_4px_0_rgba(0,0,0,0.24)] flex-shrink-0 overflow-hidden bg-gray-800">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col py-1 overflow-hidden justify-between w-full">
                  <div>
                    <h3 className="pr-3 font-bold text-white text-[16px] leading-snug">
                      {item.title}
                    </h3>
                    <p className="w-full font-semibold text-white text-[16px] leading-snug mb-1">
                      {item.artist}
                    </p>
                  </div>
                  <div className="space-y-1 mb-3">
                    <div className="flex text-[13px] text-gray-400">
                      <span className="w-8 flex-shrink-0">일시</span>
                      <div className="flex flex-col flex-1 px-6">
                        <span className="text-white">
                          {item.date} {item.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex text-[13px] text-gray-400">
                      <span className="w-8 flex-shrink-0">장소</span>
                      <span className="px-6 text-white">{item.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTicket;