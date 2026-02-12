import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, MapPin } from "lucide-react";
import wc_man from "../../assets/logo/wc_man.svg";
import wc_woman from "../../assets/logo/wc_woman.svg";
import arrow from "../../assets/logo/arrow_circle_up.svg";
import store from "../../assets/logo/storefront.svg";
import my_location from "../../assets/logo/my_location.svg";
import { fetchVenueMap } from "../../api/venue"; 
import type { Venue } from "../../types/venue";
import BottomSheet from "../../components/modal/BottomSheet";

const HallMap = () => {
  const navigate = useNavigate();
  const { venueId } = useParams<{ venueId: string }>();

  // 상태 관리
  const [activeTab, setActiveTab] = useState<"inside" | "outside">("inside");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [currentFloor, setCurrentFloor] = useState<number>(1);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 데이터 로딩
  useEffect(() => {
    const loadVenueData = async () => {
      if (!venueId) return;
      try {
        setLoading(true);
        const data = await fetchVenueMap(Number(venueId));
        setVenue(data);
        // 첫 번째 층 자동 선택
        if (data.floors.length > 0) setCurrentFloor(data.floors[0].floor);
      } catch (err: any) {
        console.error(err);
        setError("정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadVenueData();
  }, [venueId]);

  // 현재 층 데이터 찾기 (Fallback 적용)
  let activeFloorData = venue?.floors.find((f) => Number(f.floor) === Number(currentFloor));
  if (!activeFloorData && venue?.floors && venue.floors.length > 0) {
    activeFloorData = venue.floors[0];
  }

  const seatSections = activeFloorData?.sections || [];
  const facilities = activeFloorData?.facilities || [];

  // 필터 로직
  const filters = [
    { id: "entrance", label: "출입구", icon: arrow },
    { id: "womenRestroom", label: "여자 화장실", icon: wc_woman },
    { id: "menRestroom", label: "남자 화장실", icon: wc_man },
    { id: "convenience", label: "편의점", icon: store },
  ];
  
  const toggleFilter = (id: string) => {
    setSelectedFilters(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  
  const filteredFacilities = selectedFilters.length > 0 
    ? facilities.filter(f => selectedFilters.includes(f.type)) 
    : [];

  if (loading) return <div className="min-h-screen bg-[#0E172A] flex items-center justify-center text-white">로딩중...</div>;
  if (error || !venue) return <div className="min-h-screen bg-[#0E172A] flex items-center justify-center text-white">{error}</div>;

  return (
    <div className="min-h-screen bg-[#0E172A] text-white">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-[#0E172A]">
          <div className="flex items-center justify-between p-4 ">
            <button onClick={() => navigate(-1)} className="text-white"><ChevronLeft size={24} /></button>
            <div className="flex bg-[#1E293B] rounded-[12px] p-1">
              <button onClick={() => setActiveTab("inside")} className={`px-6 py-2 rounded-[12px] text-[13px] font-medium transition ${activeTab === "inside" ? "bg-[#7F5AFF]" : "text-gray-400"}`}>내부</button>
              <button onClick={() => setActiveTab("outside")} className={`px-6 py-2 rounded-[12px] text-[13px] font-medium transition ${activeTab === "outside" ? "bg-[#7F5AFF]" : "text-gray-400"}`}>외부</button>
            </div>
            <div className="w-6" />
          </div>
          <div className="flex items-center gap-2 px-4 pb-4 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => (
              <button key={filter.id} onClick={() => toggleFilter(filter.id)} className={`flex items-center gap-1 px-3 py-2 rounded-[50px] text-[13px] whitespace-nowrap transition ${selectedFilters.includes(filter.id) ? "bg-[#7F5AFF]" : "bg-[#1E293B] text-gray-300"}`}>
                <img src={filter.icon} alt={filter.label} className="w-4 h-4" />
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </header>

        {/* Map */}
        <div className="relative p-2">
          {/* 층 선택 버튼 */}
          {venue.floors.length > 1 && (
            <div className="absolute top-4 left-4 z-10 flex flex-col-reverse bg-[#2E3A4D] rounded-[14px] overflow-hidden shadow-lg w-10">
              {venue.floors.map((floor) => (
                <button key={floor.floor} onClick={() => setCurrentFloor(floor.floor)} className={`flex flex-col items-center justify-center h-14 w-full transition-colors ${currentFloor === floor.floor ? "bg-[#B59FFF] text-black font-bold" : "text-white hover:bg-[#3A4A5D]"} border-b border-[#3A4A5D] last:border-b-0`}>
                  <span className="text-base font-bold leading-none">{floor.floor}</span>
                  <span className="text-[10px] mt-0.5">층</span>
                </button>
              ))}
            </div>
          )}
          
          <button onClick={() => setIsBottomSheetOpen(true)} className="absolute top-4 right-4 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg"><img src={my_location} alt="location" className="w-6 h-6" /></button>

          <div className="rounded-[16px] p-2 overflow-hidden bg-[#0E172A] min-h-[50vh]">
            <svg viewBox={`${venue.svgViewBoxX} ${venue.svgViewBoxY} ${venue.svgWidth} ${venue.svgHeight}`} className="w-full h-auto">
              {seatSections.map((section, index) => (
                <g key={`${section.id}-${index}`}>
                  <path d={section.path} fill={selectedSection === section.id ? "#7F5AFF" : section.color} stroke="#0E172A" strokeWidth="2" onClick={() => setSelectedSection(section.id === selectedSection ? null : section.id)} />
                  {section.x && section.y && (
                    <text x={section.x} y={section.y} fill={section.type === "stage" ? "#6B7280" : "#1E293B"} fontSize="20" fontWeight="600" textAnchor="middle" dominantBaseline="middle" pointerEvents="none">{section.name}</text>
                  )}
                </g>
              ))}
              {filteredFacilities.map((f, i) => (
                <g key={`${f.id}-${i}`}>
                  <circle cx={f.x} cy={f.y} r="8" fill="#7F5AFF" stroke="#FFF" strokeWidth="2" />
                  <MapPin x={f.x - 6} y={f.y - 6} size={12} className="text-white" />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
      <BottomSheet open={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} />
    </div>
  );
};

export default HallMap;