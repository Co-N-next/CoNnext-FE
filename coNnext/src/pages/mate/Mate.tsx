import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight, PlusCircle } from "lucide-react";
import jinah from "../../assets/images/jinah.svg";
import mate from "../../assets/images/mate.svg";
import star from "../../assets/Icons/star_on.svg";
import setting from "../../assets/Icons/Settings.svg";
import userplus from "../../assets/Icons/User Plus.svg";
import kakao from "../../assets/Variables/kakao.svg";
import { useDebounce } from "../../hooks/useDebounce";
import { useMates } from "../../hooks/useMates";
import MateSkeleton from "../../components/skeleton/MateSkeleton";

interface Mate {
  id: string;
  name: string;
  imageUrl: string;
}

const Mate = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [nicknameInput, setNicknameInput] = useState("");
  const [selectedMates, setSelectedMates] = useState<string[]>([]);

  // ✅ 검색어 debouncing (300ms)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // ✅ Infinite Scroll을 위한 React Query 훅
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useMates(debouncedSearchQuery);

  // Infinite Scroll을 위한 Intersection Observer
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // ✅ API에서 받아온 데이터 (페이지별로 합치기)
  const apiMates = data?.pages.flatMap((page) => page.mates) || [];

  const featuredMate: Mate = {
    id: "1",
    name: "권진아 콘서트",
    imageUrl: jinah,
  };

  // 이 곳에 원하는 이미지 URL을 넣어주세요
  const MATE_IMAGE_URL = mate;

  const frequentMates: Mate[] = [
    {
      id: "2",
      name: "mate1",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "3",
      name: "mate2",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "4",
      name: "mate3",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "5",
      name: "mate4",
      imageUrl: MATE_IMAGE_URL,
    },
  ];

  const allMates: Mate[] = [
    {
      id: "6",
      name: "mate1",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "7",
      name: "mate2",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "8",
      name: "mate3",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "9",
      name: "mate4",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "10",
      name: "mate5",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "11",
      name: "mate6",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "12",
      name: "mate7",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "13",
      name: "mate8",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "14",
      name: "mate9",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "15",
      name: "mate10",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "16",
      name: "mate11",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "17",
      name: "mate12",
      imageUrl: MATE_IMAGE_URL,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0E172A] text-white">
      <div className="max-w-2xl mx-auto pb-50">
        {/* Section 1: 메이트 헤더 및 추천 메이트 카드 */}
        <section className="p-[16px] pl-[24px]">
          <h1 className="text-[25px] font-semibold mb-[20px]">메이트</h1>

          {/* 카드 컨테이너 */}
          <div className="w-[353px] h-[237px] bg-[#1E293B] rounded-[12px] flex items-center gap-[12px] p-[12px] pr-[10px]">
            {/* 이미지 */}
            <img
              src={featuredMate.imageUrl}
              alt={featuredMate.name}
              className="w-[147px] h-[213px] object-cover rounded-[7px]"
            />

            {/* 텍스트 영역 */}
            <div className="flex-1 h-full flex flex-col justify-between py-[8px]">
              {/* 제목 */}
              <div className="flex justify-between">
                <p className="text-[16px] font-semibold">{featuredMate.name}</p>
                <div 
                  className="flex items-center gap-0.5 cursor-pointer hover:opacity-80 transition"
                  onClick={() => navigate("/mate/more")}
                >
                  <p className="text-[#A1A1A1] text-[13px] font-medium leading-[1.4]">더보기</p>
                  <ChevronRight size={14} className="text-[#A1A1A1]" />
                </div>
              </div>

              {/* 설명 텍스트 */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-[#A1A1A1] text-[13px] font-medium leading-[1.4]">
                  공연을 예매한 메이트가
                </p>
                <p className="text-[#A1A1A1] text-[13px] font-medium leading-[1.4]">
                  없습니다.
                </p>
              </div>

              {/* 버튼 */}
              <button
                onClick={() => navigate("/mate/map")}
                className="w-[168px] h-[40px] bg-[#7F5AFF] hover:bg-[#6B4DE6] text-white text-[13px] font-medium rounded-[12px] transition"
              >
                메이트 위치보기
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: 검색창 */}
        <section className="mt-4 p-[4px] gap-[4px]">
          <div className="relative">
            <input
              type="text"
              placeholder="메이트 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[369px] h-[44px] ml-[12px] bg-[#1E293B] text-white placeholder-[#7A7A7A] text-[13px] py-4 pl-5 pr-12 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#7F5AFF] hover:bg-indigo-700 p-2.5 rounded-lg transition">
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-end gap-2.5 mt-4 px-2">

              <button 
                className="text-gray-400 hover:text-white transition"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img src={userplus} alt="" className="w-[24px] h-[24px]"/>
              </button>

              {/* Friend Request Popup */}
              {isDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 w-[220px] bg-[#2E364A] rounded-[16px] shadow-xl overflow-hidden z-50 border border-[#364057]">
                  <button className="w-full flex items-center justify-between px-[20px] py-[16px] hover:bg-[#364057] transition group">
                    <span className="text-[15px] font-medium text-white group-hover:text-white/90">카카오톡으로 친구 신청</span>
                    <div className="rounded-full p-1">
                      <img src={kakao} alt="" className="w-[24px] h-[24px]"/>
                    </div>
                  </button>
                  <div className="h-[1px] bg-[#3B455D] mx-[20px]"></div>
                  <button 
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsNicknameModalOpen(true);
                    }}
                    className="w-full flex items-center justify-between px-[20px] py-[16px] hover:bg-[#364057] transition group"
                  >
                    <span className="text-[15px] font-medium text-white group-hover:text-white/90">닉네임으로 친구 신청</span>
                    <PlusCircle className="w-6 h-6 text-white" />
                  </button>
                </div>
              )}
              <button 
                onClick={() => setIsSettingsDropdownOpen(!isSettingsDropdownOpen)}
                className="text-gray-400 hover:text-white transition"
              >
                <img src={setting} alt="" className="w-[24px] h-[24px]"/>
              </button>

              {/* Settings Dropdown */}
              {isSettingsDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 w-[220px] bg-[#2E364A] rounded-[16px] shadow-xl overflow-hidden z-50 border border-[#364057]">
                  <button 
                    onClick={() => {
                      setIsSettingsDropdownOpen(false);
                      setIsEditMode(true);
                    }}
                    className="w-full flex items-center justify-between px-[20px] py-[16px] hover:bg-[#364057] transition group"
                  >
                    <span className="text-[15px] font-medium text-white group-hover:text-white/90">전체 메이트 편집하기</span>
                   
                  </button>
                </div>
              )}

            
          </div>
        </section>

        {/* Section 3: 자주 찾는 메이트 */}
        {!isEditMode && (
          <section className="px-3 mb-[24px]">
          <div className="flex items-center gap-1 mb-4">
           <img src={star} alt="" className="w-[20px] h-[20px]"/>
            <h2 className="text-[18px] font-bold">자주 찾는 메이트</h2>
          </div>
          <div className="bg-[#252D3F] rounded-[12px] p-[12px] pt-[16px]">
            <div className="grid grid-cols-4 gap-[32px]">
            {frequentMates.map((mate) => (
              <div key={mate.id} className="flex flex-col items-center">
                <button
                  onClick={() => {
                    if (!isEditMode) {
                      navigate('/mate/detail', { state: { mate } });
                    }
                  }}
                  className="flex flex-col items-center"
                >
                  <div className="w-[60px] h-[60px] bg-gray-700 rounded-full overflow-hidden mb-1">
                    <img
                      src={mate.imageUrl}
                      alt={mate.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[12px] text-[#F2EFFF] mb-2">{mate.name}</span>
                </button>
                {isEditMode && (
                  <button
                    onClick={() => {
                      setSelectedMates(prev => 
                        prev.includes(mate.id)
                          ? prev.filter(id => id !== mate.id)
                          : [...prev, mate.id]
                      );
                    }}
                    className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                  >
                    {selectedMates.includes(mate.id) && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#7F5AFF]" />
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
          </div>
          
        </section>
        )}

        {/* Section 4: 전체 메이트 */}
        <section className="">
          <h2 className="text-[18px] font-bold mb-4 px-4">전체 메이트</h2>
          
          {/* 로딩 상태 */}
          {isLoading ? (
            <MateSkeleton />
          ) : (
            <>
              <div className="bg-[#252D3F] p-[8px] pt-[12px] m-[12px] rounded-[12px]">
                <div className="grid grid-cols-4 gap-4">
                  {/* ✅ API 데이터가 있으면 사용, 없으면 Mock 데이터 사용 */}
                  {(apiMates.length > 0 ? apiMates : allMates).map((mate) => (
                    <div key={mate.id} className="flex flex-col items-center">
                      <button
                        onClick={() => {
                          if (!isEditMode) {
                            navigate('/mate/detail', { state: { mate } });
                          }
                        }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-[60px] h-[60px] bg-gray-700 rounded-full overflow-hidden mb-1">
                          <img
                            src={mate.imageUrl}
                            alt={mate.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[12px] text-[#F2EFFF] mb-2">{mate.name}</span>
                      </button>
                      {isEditMode && (
                        <button
                          onClick={() => {
                            setSelectedMates(prev => 
                              prev.includes(mate.id)
                                ? prev.filter(id => id !== mate.id)
                                : [...prev, mate.id]
                            );
                          }}
                          className="w-4 h-4 rounded-full border-1 border-white flex items-center justify-center"
                        >
                          {selectedMates.includes(mate.id) && (
                            <div className="w-2 h-2 rounded-full bg-[#7F5AFF]" />
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ✅ Infinite Scroll - 더 불러오기 트리거 */}
              {hasNextPage && (
                <div ref={observerRef} className="flex justify-center py-4">
                  {isFetchingNextPage ? (
                    <div className="text-gray-400 text-sm">더 불러오는 중...</div>
                  ) : (
                    <div className="h-4" /> 
                  )}
                </div>
              )}
            </>
          )}
          
        </section>

        {/* 설정 모드일 때 하단 버튼 */}
        {isEditMode && (
          <div className="bottom-0 left-0 right-0 p-4 bg-[#0E172A] flex gap-3 z-40 mt-8">
            <button
              onClick={() => {
                setIsEditMode(false);
                setSelectedMates([]);
              }}
              className="flex-1 py-3 bg-[#7A7A7A] hover:bg-[#6A6A6A] text-white rounded-[12px] text-[15px] font-norml transition"
            >
              취소하기
            </button>
            <button
              onClick={() => {
                // TODO: 선택된 메이트 저장 API 호출
                console.log('선택된 메이트:', selectedMates);
                setIsEditMode(false);
              }}
              className="flex-1 py-3 bg-[#7F5AFF] hover:bg-[#6B4DE6] text-white rounded-[12px] text-[15px] font-medium transition"
            >
              완료하기
            </button>
          </div>
        )}
      </div>

      {/* 닉네임 친구 신청 모달 */}
      {isNicknameModalOpen && (
        <>
          {/* 오버레이 */}
          <div 
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => {
              setIsNicknameModalOpen(false);
              setNicknameInput("");
            }}
          />
          
          {/* 모달 컨텐츠 */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] max-w-[400px] bg-[#1E293B] rounded-[12px] z-50 overflow-hidden">
            {/* 헤더 */}
            <div className="px-3 pt-2 pb-4 border-b border-[#3B455D]">
              <p className="text-[15px] text-gray-300 mt-4 text-center">친구의 닉네임을 입력해주세요</p>
            </div>

            {/* 입력 필드 */}
            <div className="px-6 pb-6 pt-6">
              <input
                type="text"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                placeholder="닉네임"
                className="w-full px-4 py-3 bg-[#293A5D] text-white rounded-[12px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7F5AFF] text-[14px]"
              />
            </div>

            {/* 버튼들 */}
            <div className="flex">
              <button
                onClick={() => {
                  setIsNicknameModalOpen(false);
                  setNicknameInput("");
                }}
                className="flex-1 bg-[#7A7A7A] hover:bg-[#4A4D5E] text-white text-[14px] font-medium transition"
              >
                취소
              </button>
              <button
                onClick={() => {
                  // TODO: 친구 신청 API 호출
                  console.log('친구 신청:', nicknameInput);
                  setIsNicknameModalOpen(false);
                  setNicknameInput("");
                }}
                disabled={!nicknameInput.trim()}
                className="flex-1 py-3 bg-[#7F5AFF] hover:bg-[#6B4DE6] text-white text-[14px] font-medium transition disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                친구 신청
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Mate;
