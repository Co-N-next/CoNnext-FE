import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, MapPin } from "lucide-react";
import wc_man from "../../assets/logo/wc_man.svg";
import wc_woman from "../../assets/logo/wc_woman.svg";
import arrow from "../../assets/logo/arrow_circle_up.svg";
import store from "../../assets/logo/storefront.svg";
import my_location from "../../assets/logo/my_location.svg";
import { fetchVenueMap } from "../../api/venue";
import type { Venue, Section, Facility } from "../../types/venue";
import BottomSheet from "../../components/modal/BottomSheet";

// 좌석 섹션 데이터 타입
// Types are now imported from ../../types/venue

const HallMap = () => {
  const navigate = useNavigate();
  const { venueId } = useParams<{ venueId: string }>();
  
  // 디버깅: venueId 확인
  console.log("🔍 URL에서 가져온 venueId:", venueId);
  console.log("🔍 Number로 변환한 값:", Number(venueId));
  console.log("🔍 isNaN 체크:", isNaN(Number(venueId || '')));
  
  // UI 상태
  const [activeTab, setActiveTab] = useState<"inside" | "outside">("inside");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [currentFloor, setCurrentFloor] = useState<number>(1);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // BottomSheet 상태
  
  // 데이터 상태
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // API에서 공연장 데이터 가져오기
  useEffect(() => {
    const loadVenueData = async () => {
      if (!venueId) {
        setError("공연장 ID가 제공되지 않았습니다.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log(`🔍 공연장 지도 로딩 시작 - venueId: ${venueId}`);
        const data = await fetchVenueMap(Number(venueId));
        console.log("✅ 공연장 지도 로딩 성공:", data);
        setVenue(data);
        setError(null);
      } catch (err: any) {
        console.error("❌ 공연장 데이터 로딩 실패:", err);
        console.error("요청 URL:", err.config?.url);
        console.error("상태 코드:", err.response?.status);
        console.error("에러 응답:", err.response?.data);
        
        let errorMessage = "공연장 정보를 불러오는 데 실패했습니다.";
        if (err.response?.status === 400) {
          errorMessage = `잘못된 요청입니다. venueId: ${venueId}`;
        } else if (err.response?.status === 404) {
          errorMessage = `공연장 ID ${venueId}를 찾을 수 없습니다.`;
        } else if (err.response?.status === 500) {
          errorMessage = "서버 오류가 발생했습니다.";
        } else if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error')) {
          errorMessage = "서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.";
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadVenueData();
  }, [venueId]);

  // 현재 층의 데이터 가져오기
  const currentFloorData = venue?.floors.find((f) => f.floor === currentFloor);
  const seatSections: Section[] = currentFloorData?.sections || [];
  const facilities: Facility[] = currentFloorData?.facilities || [];

  // 더미 좌석 섹션 데이터 제거 (이제 API에서 가져옴)
  // 데이터는 이제 API에서 가져옴 (위의 currentFloorData 참조)

  const filters = [
    { id: "entrance", label: "출입구", icon: arrow },
    { id: "womenRestroom", label: "여자 화장실", icon: wc_woman },
    { id: "menRestroom", label: "남자 화장실", icon: wc_man },
    { id: "convenience", label: "편의점", icon: store },
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId === selectedSection ? null : sectionId);
  };

  // 필터링된 시설만 표시
  const filteredFacilities = selectedFilters.length > 0
    ? facilities.filter((f) => selectedFilters.includes(f.type))
    : [];

  // 로딩 상태
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E172A] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7F5AFF] mx-auto mb-4"></div>
          <p className="text-gray-400">공연장 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !venue) {
    return (
      <div className="min-h-screen bg-[#0E172A] text-white flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-red-400 mb-4">{error || "공연장 정보를 찾을 수 없습니다."}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-[#7F5AFF] rounded-lg hover:bg-[#6B4DE6] transition"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E172A] text-white">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-[#0E172A]">
          <div className="flex items-center justify-between p-4 ">
            <button
              onClick={() => navigate(-1)}
              className="text-white hover:text-gray-300 transition"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Tabs */}
            <div className="flex w-full justify-end">
              <div className="bg-[#1E293B] rounded-[12px] p-1">
                <button
                onClick={() => setActiveTab("inside")}
                className={`px-6 py-3 rounded-[12px] text-[13px] font-medium transition ${
                  activeTab === "inside"
                    ? "bg-[#7F5AFF] text-[#FEFEFE]"
                    : "bg-[#1E293B] text-[#FEFEFE]"
                }`}
              >
                내부
              </button>
              <button
                onClick={() => setActiveTab("outside")}
                className={`px-6 py-2 rounded-[12px] text-[13px] font-medium transition ${
                  activeTab === "outside"
                    ? "bg-[#7F5AFF] text-[#FEFEFE]"
                    : "bg-[#1E293B] text-[#FEFEFE]"
                }`}
              >
                외부
              </button>
              </div>
            
            </div>

            <div className="w-6" /> {/* Spacer */}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 px-4 pb-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`flex items-center gap-1 px-3 py-2 rounded-[50px] text-[13px] whitespace-nowrap transition ${
                  selectedFilters.includes(filter.id)
                    ? "bg-[#7F5AFF] text-[#FEFEFE]"
                    : "bg-[#1E293B] text-[#FEFEFE]"
                }`}
              >
                <img src={filter.icon} alt={filter.label} className="w-4 h-4" />
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </header>

        {/* Map Container */}
        <div className="relative p-2">
          {/* Floor Selection Buttons (여러 층이 있을 경우만 표시) */}
          {venue.totalFloors > 1 && (
            <div className="flex flex-col-reverse bg-[#2E3A4D] rounded-[14px] overflow-hidden shadow-lg w-10">
  {venue.floors.map((floor) => (
    <button
      key={floor.floor}
      onClick={() => setCurrentFloor(floor.floor)}
      className={`
        flex flex-col items-center justify-center
        h-14 w-full
        transition-colors duration-200 rounded-[16px]
        /* 2. 버튼 자체의 둥글기와 그림자는 제거 (부모가 처리함) */
        ${
          currentFloor === floor.floor
            ? "bg-[#B59FFF] text-black font-bold z-10" // 선택된 놈이 덮어쓰도록 z-index 추가
            : "text-white hover:bg-[#3A4A5D] hover:text-gray-200"
        }
        /* 3. 버튼 사이 구분선 (선택 안 된 애들끼리 경계선) */
        border-b border-[#3A4A5D] last:border-b-0
      `}
    >
      <span className="text-base font-bold leading-none">{floor.floor}</span>
      <span className="text-[10px] leading-none mt-0.5">층</span>
    </button>
  ))}
</div>
          )}

          {/* Current Location Button */}
          <button 
            onClick={() => setIsBottomSheetOpen(true)}
            className="absolute top-8 right-6 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition"
          >
            <img src={my_location} alt="my_location" className="w-6 h-6" />
          </button>

          {/* SVG Map */}
          <div className=" rounded-[16px] p-4 overflow-hidden">
            <svg 
              viewBox={`${venue.svgViewBoxX || 0} ${venue.svgViewBoxY || 0} ${venue.svgWidth} ${venue.svgHeight}`} 
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Render Seat Sections */}
              {seatSections.map((section) => (
                <g key={section.id}>
                  <path
                    d={section.path}
                    fill={
                      selectedSection === section.id
                        ? "#7F5AFF"
                        : section.color
                    }
                    stroke="#0E172A"
                    strokeWidth="2"
                    className="cursor-pointer transition-all hover:opacity-80"
                    onClick={() => handleSectionClick(section.id)}
                  />
                  {section.x && section.y && (
                    <text
                      x={section.x}
                      y={section.y}
                      fill={section.type === "stage" ? "#6B7280" : "#1E293B"}
                      fontSize="12"
                      fontWeight="600"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      pointerEvents="none"
                    >
                      {section.name}
                    </text>
                  )}
                </g>
              ))}

              {/* Render Facilities (if filtered) */}
              {filteredFacilities.map((facility) => (
                <g key={facility.id}>
                  <circle
                    cx={facility.x}
                    cy={facility.y}
                    r="8"
                    fill="#7F5AFF"
                    stroke="#FFF"
                    strokeWidth="2"
                  />
                  <MapPin
                    x={facility.x - 6}
                    y={facility.y - 6}
                    size={12}
                    className="text-white"
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* <div className="bottom-0 left-0 right-0 bg-[#1E293B] border-t border-[#2E3A4D] p-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-[18px] font-bold mb-1">{venue.name}</h2>
            <p className="text-[14px] text-gray-400">{venue.address}</p>
          </div>
        </div> */}
      </div>

      {/* BottomSheet 모달 */}
      <BottomSheet 
        open={isBottomSheetOpen} 
        onClose={() => setIsBottomSheetOpen(false)} 
      />
    </div>
  );
};

export default HallMap;
