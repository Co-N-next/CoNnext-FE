import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SelectBar from "../../components/SelectBar";
import { Search, ChevronLeft, Check } from "lucide-react";
import type { Concert } from "../../types/concert";
import SearchSkeleton from "../../components/skeleton/SearchSkeleton";
import { 
  searchConcerts, 
  fetchSearchHistory, 
  saveSearchHistory, 
  deleteAllSearchHistory 
} from "../../api/concert"; 

// [수정 1] 검색 기록 객체 타입 정의
interface SearchHistoryItem {
  id: number;
  keyword: string;
  searchType: string;
}

interface AddTicketProps {
  onBack?: () => void;
}

const AddTicket = ({ onBack }: AddTicketProps = {}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("public");
  
  const [inputText, setInputText] = useState("");
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);

  const [searchResults, setSearchResults] = useState<Concert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); 
  
  // [수정 2] string[] -> SearchHistoryItem[] 으로 변경
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  // 최근 검색어 불러오기
  useEffect(() => {
    const loadHistory = async () => {
        try {
            // API가 객체 배열을 반환한다고 가정
            const history = await fetchSearchHistory();
            // 타입 단언을 사용하여 에러 방지 (API 응답이 any인 경우)
            setSearchHistory(history as unknown as SearchHistoryItem[]);
        } catch (error) {
            console.error("검색 기록 로딩 실패:", error);
        }
    };
    loadHistory();
  }, []);

  const handleBack = () => {
    if (selectedConcert) {
      setSelectedConcert(null);
      return;
    }
    if (onBack) onBack();
    else navigate("/reserve");
  };

  const handleSearch = async (keyword: string = inputText) => {
    if (!keyword.trim()) return;

    setInputText(keyword);
    setIsHistoryExpanded(false);

    try {
      setIsLoading(true);
      setHasSearched(true); 
      
      try {
        await saveSearchHistory(keyword);
        // 저장 후 목록 갱신
        const updatedHistory = await fetchSearchHistory();
        setSearchHistory(updatedHistory as unknown as SearchHistoryItem[]);
      } catch (err) {
        console.error("검색어 저장 실패:", err);
      }

      const results = await searchConcerts(keyword);
      setSearchResults(results);
      
    } catch (error) {
      console.error("검색 실패:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          alert("검색 결과를 찾을 수 없습니다.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAllHistory = async () => {
      try {
          await deleteAllSearchHistory();
          setSearchHistory([]);
      } catch (e) {
          console.error("전체 삭제 실패", e);
      }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch(inputText);
  };

  // 1. 확인 화면 렌더링
  if (selectedConcert) {
    return (
      <div className="min-h-screen bg-[#0F1320] text-white font-sans flex flex-col">
        <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
          <SelectBar activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="px-6 mb-6 mt-6">
            <p className="text-[13px] leading-relaxed text-gray-200">
              이 공연을 예매한 것으로 보여요.
              <br />
              이 공연을 예매한 것이 맞다면{" "}
              <span className="text-[#8e7aff] font-bold">맞아요</span>를 눌러주세요.
            </p>
          </div>

          <div className="px-6 mb-4">
            <div className="bg-[#293A5D] rounded-[28px] px-[46px] py-[24px] flex flex-col items-center">
              <div className="w-[140px] h-[196px] rounded-[10px] shadow-xl overflow-hidden bg-gray-800 mb-4">
                <img
                  src={selectedConcert.imageUrl}
                  alt={selectedConcert.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-[18px] font-bold text-white text-center leading-tight mb-2 px-6">
                {selectedConcert.title}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <p className="text-[16px] font-medium text-gray-200">
                  {selectedConcert.artist}
                </p>
              </div>

              <div className="w-full space-y-2 text-[14px] px-4">
                <div className="flex items-start">
                  <span className="w-12 text-gray-400 flex-shrink-0">일시</span>
                    <p className="text-white leading-relaxed">
                      {selectedConcert.date} {selectedConcert.time}
                    </p>
                </div>

                <div className="flex items-start">
                  <span className="w-12 text-gray-400 flex-shrink-0">장소</span>
                  <span className="flex-1 text-gray-200">{selectedConcert.venue}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 pb-8 w-full flex gap-2">
            <button
              onClick={() => setSelectedConcert(null)}
              className="flex-1 h-[44px] rounded-[12px] bg-[#414141] hover:bg-[#5A6678] text-white font-bold text-[13px]"
            >
              아니에요
            </button>
            <button
              onClick={() =>
                navigate("/add-detail", { state: { concert: selectedConcert } })
              }
              className="flex-1 h-[44px] rounded-[12px] bg-[#7F5AFF] hover:bg-[#6B4DE6] text-white font-bold text-[13px]"
            >
              맞아요
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. 리스트 화면 렌더링
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
          <div className="mb-6 relative">
            <div className="text-sm font-medium mb-2 text-gray-300">
              공연 찾기
            </div>
            <div 
                className="w-full flex items-center pl-[12px] pr-[4px] py-[4px] gap-[4px] rounded-[10px] border border-black/10 bg-[#1E293B] focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500"
                onClick={() => setIsHistoryExpanded(true)}
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown} 
                onFocus={() => setIsHistoryExpanded(true)}
                placeholder="아티스트 또는 공연명으로 검색하세요."
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none border-none text-[14px]"
              />
              <button 
                onClick={() => handleSearch(inputText)} 
                className="w-[40px] h-[40px] bg-[#7F5AFF] hover:bg-[#6B4DE6] rounded-lg flex items-center justify-center transition-colors shadow-lg flex-shrink-0"
              >
                <Search size={22} className="text-white" />
              </button>
            </div>
            
            {/* [수정 3] 최근 검색어 렌더링 로직 수정 */}
            {isHistoryExpanded && searchHistory.length > 0 && !hasSearched && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1E293B] rounded-xl shadow-xl z-20 border border-white/5 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                        <span className="text-xs text-gray-400">최근 검색어</span>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClearAllHistory();
                            }}
                            className="text-xs text-gray-500 hover:text-white"
                        >
                            전체 삭제
                        </button>
                    </div>
                    <ul>
                        {searchHistory.map((item) => (
                            <li key={item.id} className="flex items-center justify-between px-4 py-3 hover:bg-white/5 cursor-pointer group">
                                <span 
                                    className="flex-1 text-sm text-gray-300"
                                    onClick={() => handleSearch(item.keyword)} // [수정] 객체가 아니라 keyword 문자열 전달
                                >
                                    {item.keyword} {/* [수정] 객체 전체가 아니라 keyword만 렌더링 */}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {isHistoryExpanded && (
                <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsHistoryExpanded(false)} 
                />
            )}
            
          </div>

          <div className="flex justify-between items-center mb-4 text-xs">
            <span className="text-gray-300">
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
            {isLoading && (
              <SearchSkeleton />
            )}

            {!isLoading && hasSearched && searchResults.length === 0 && (
              <div className="py-20 text-center text-gray-500">
                검색 결과가 없습니다.
              </div>
            )}

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