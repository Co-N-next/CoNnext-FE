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
  //deleteSearchHistory, 
  deleteAllSearchHistory 
} from "../../api/concert"; 

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
  const [hasSearched, setHasSearched] = useState(false); 
  
  // ✅ 최근 검색어 State
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  // 최근 검색어 불러오기
  useEffect(() => {
    const loadHistory = async () => {
        try {
            const history = await fetchSearchHistory();
            setSearchHistory(history);
        } catch (error) {
            console.error("검색 기록 로딩 실패:", error);
        }
    };
    loadHistory();
  }, []);

  // 뒤로가기 핸들러
  const handleBack = () => {
    if (selectedConcert) {
      setSelectedConcert(null);
      return;
    }
    if (onBack) onBack();
    else navigate("/reserve");
  };

  // ✅ 검색 핸들러 (API 호출)
  const handleSearch = async (keyword: string = inputText) => {
    if (!keyword.trim()) return;

    // 입력창 업데이트 (히스토리 클릭 시 필요)
    setInputText(keyword);
    setIsHistoryExpanded(false);

    try {
      setIsLoading(true);
      setHasSearched(true); 
      
      // 검색어 저장 API 호출
      // 실패해도 검색은 진행되도록 처리
      try {
        await saveSearchHistory(keyword);
        // 저장 후 목록 갱신 (선택사항, 최신화)
        const updatedHistory = await fetchSearchHistory();
        setSearchHistory(updatedHistory);
      } catch (err) {
        console.error("검색어 저장 실패:", err);
      }

      // API 호출
      const results = await searchConcerts(keyword);
      setSearchResults(results);
      
    } catch (error) {
      console.error("검색 실패:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          alert("검색 결과를 찾을 수 없습니다.");
        } else {
             // ... 에러 처리
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  /* 최근 검색어 삭제
  const handleDeleteHistory = async (id: number) => { // API가 id를 받는데 index인지 DB ID인지 확인 필요. 
      // 만약 string 배열만 받는다면 index로 지워야 하는지, value로 지워야 하는지?
      // API 정의상 deleteSearchHistory(id: number) 이므로 id가 필요함.
      // 하지만 fetchSearchHistory는 string[]을 반환한다고 되어 있음 (기존 코드 분석 기반).
      // 만약 string[]만 온다면 ID를 알 수 없음. 
      
      // ** 중요: API 명세를 보면 "/searchHistory" GET -> result: string[] 의 가능성이 높음 (단순 키워드 리스트).
      // 하지만 DELETE는 /searchHistory/{id} 임.
      // 모순점: string[] 만 있으면 id를 모름. 
      // 해결책: fetchSearchHistory의 응답 타입이 { id: number, keyword: string }[] 형태여야 함.
      // 일단 string[] 으로 가정하고 index를 넘기거나, API가 객체를 리턴한다고 가정하고 수정해야 함.
      // 현재 concert.ts에서는 string[]으로 캐스팅 중. 
      // 만약 진짜 string[] 이라면 DELETE를 쓸 수 없음 (또는 BE가 keyword 삭제를 지원해야 함).
      // User Request에는 "최근 검색어 반환 GET /searchHistory" 라고만 되어 있음.
      // "최근 검색어 단일 삭제 DELETE /searchHistory/1" -> ID 기반.
      
      // 임시 조치: UI에서는 일단 삭제 버튼을 누르면 API 호출 시도하되, 
      // string[] 이라면 index+1 이나, 별도 처리가 필요. 
      // 여기서는 string[]을 가정하고 있으므로, 정확한 구현을 위해선 BE 응답 타입 확인이 필요하지만, 
      // 우선 UI만 구성하거나, 로그만 남김.
      try {
           // await deleteSearchHistory(id); 
           // setDisplayHistory(...)
      } catch(e) {}
  };
  */
  // 전체 삭제
  const handleClearAllHistory = async () => {
      try {
          await deleteAllSearchHistory();
          setSearchHistory([]);
      } catch (e) {
          console.error("전체 삭제 실패", e);
      }
  };

  // 키보드 엔터 이벤트
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch(inputText);
  };

  // ---------------------------------------------------------
  // 1. 확인 화면 렌더링 (선택된 공연이 있을 때 보여줄 화면)
  // ---------------------------------------------------------
  if (selectedConcert) {
    return (
      <div className="min-h-screen bg-[#0F1320] text-white font-sans flex flex-col">
        <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
          <SelectBar activeTab={activeTab} onTabChange={setActiveTab} />
          
          {/* 안내 멘트 */}
          <div className="px-6 mb-6 mt-6">
            <p className="text-[13px] leading-relaxed text-gray-200">
              이 공연을 예매한 것으로 보여요.
              <br />
              이 공연을 예매한 것이 맞다면{" "}
              <span className="text-[#8e7aff] font-bold">맞아요</span>를 눌러주세요.
            </p>
          </div>

          {/* 공연 카드 - 중앙 정렬, 세로 배치 */}
          <div className="px-6 mb-4">
            <div className="bg-[#293A5D] rounded-[28px] px-[46px] py-[24px] flex flex-col items-center">
              {/* 포스터 이미지 - 크게 중앙 배치 */}
              <div className="w-[140px] h-[196px] rounded-[10px] shadow-xl overflow-hidden bg-gray-800 mb-4">
                <img
                  src={selectedConcert.imageUrl}
                  alt={selectedConcert.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 공연 제목 - 중앙 정렬 */}
              <h2 className="text-[18px] font-bold text-white text-center leading-tight mb-2 px-6">
                {selectedConcert.title}
              </h2>

              {/* 아티스트 이름 + T 뱃지 */}
              <div className="flex items-center gap-2 mb-4">
                <p className="text-[16px] font-medium text-gray-200">
                  {selectedConcert.artist}
                </p>
              </div>

              {/* 공연 정보 */}
              <div className="w-full space-y-2 text-[14px] px-4">
                {/* 일시 - 파란색 테두리 박스 */}
                <div className="flex items-start">
                  <span className="w-12 text-gray-400 flex-shrink-0">일시</span>
                  
                    <p className="text-white leading-relaxed">
                      {selectedConcert.date} {selectedConcert.time}
                    </p>
                
                </div>

                {/* 장소 */}
                <div className="flex items-start">
                  <span className="w-12 text-gray-400 flex-shrink-0">장소</span>
                  <span className="flex-1 text-gray-200">{selectedConcert.venue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 버튼 영역 */}
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
            
            {/* 최근 검색어 드롭다운 (검색 전이고 포커스/확장 상태일 때) */}
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
                        {searchHistory.map((word, idx) => (
                            <li key={idx} className="flex items-center justify-between px-4 py-3 hover:bg-white/5 cursor-pointer group">
                                <span 
                                    className="flex-1 text-sm text-gray-300"
                                    onClick={() => handleSearch(word)}
                                >
                                    {word}
                                </span>
                                {/* 삭제 기능이 API 응답 타입 이슈로 현재는 숨김 처리하거나 기능 없음 */}
                                {/* <button className="text-gray-600 hover:text-red-400"><X size={14}/></button> */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {/* 배경 클릭 시 드롭다운 닫기 위한 오버레이 */}
            {isHistoryExpanded && (
                <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsHistoryExpanded(false)} 
                />
            )}
            
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
              <SearchSkeleton />
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