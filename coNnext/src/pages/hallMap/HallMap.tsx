import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronUp, MapPin } from "lucide-react";
import wcMan from "../../assets/logo/wc_man.svg";
import wcWoman from "../../assets/logo/wc_woman.svg";
import entranceIcon from "../../assets/logo/arrow_circle_up.svg";
import storeIcon from "../../assets/logo/storefront.svg";
import myLocation from "../../assets/logo/my_location.svg";
import { fetchVenueMap } from "../../api/venueMap";
import type { Venue } from "../../types/venue";
import BottomSheet from "../../components/modal/BottomSheet";

type FloorMode = number | "all";

const HallMap = () => {
  const navigate = useNavigate();
  const { venueId } = useParams<{ venueId: string }>();

  const [activeTab, setActiveTab] = useState<"inside" | "outside">("inside");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [currentFloor, setCurrentFloor] = useState<FloorMode>("all");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVenueData = async () => {
      if (!venueId) return;
      try {
        setLoading(true);
        const data = await fetchVenueMap(Number(venueId));
        setVenue(data);
        setCurrentFloor("all");
      } catch (err) {
        console.error(err);
        setError("정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };
    void loadVenueData();
  }, [venueId]);

  const activeFloorData =
    currentFloor === "all"
      ? null
      : (venue?.floors.find((f) => Number(f.floor) === Number(currentFloor)) ?? null);

  const seatSections =
    currentFloor === "all"
      ? (venue?.floors.flatMap((floor) => floor.sections) ?? [])
      : (activeFloorData?.sections ?? []);

  const facilities =
    currentFloor === "all"
      ? (venue?.floors.flatMap((floor) => floor.facilities) ?? [])
      : (activeFloorData?.facilities ?? []);

  const filters = [
    { id: "entrance", label: "출입구", icon: entranceIcon },
    { id: "womenRestroom", label: "여자 화장실", icon: wcWoman },
    { id: "menRestroom", label: "남자 화장실", icon: wcMan },
    { id: "convenience", label: "편의점", icon: storeIcon },
  ];

  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const filteredFacilities =
    selectedFilters.length > 0
      ? facilities.filter((f) => selectedFilters.includes(f.type))
      : [];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0E172A] text-white">
        로딩중...
      </div>
    );
  }
  if (error || !venue) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0E172A] text-white">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E172A] text-white">
      <div className="mx-auto max-w-2xl">
        <header className="sticky top-0 z-20 bg-[#0E172A]">
          <div className="flex items-center justify-between p-4">
            <button onClick={() => navigate(-1)} className="text-white">
              <ChevronLeft size={24} />
            </button>
            <div className="flex rounded-[12px] bg-[#1E293B] p-1">
              <button
                onClick={() => setActiveTab("inside")}
                className={`rounded-[12px] px-6 py-2 text-[13px] font-medium transition ${
                  activeTab === "inside" ? "bg-[#7F5AFF]" : "text-gray-400"
                }`}
              >
                내부
              </button>
              <button
                onClick={() => setActiveTab("outside")}
                className={`rounded-[12px] px-6 py-2 text-[13px] font-medium transition ${
                  activeTab === "outside" ? "bg-[#7F5AFF]" : "text-gray-400"
                }`}
              >
                외부
              </button>
            </div>
            <div className="w-6" />
          </div>
          <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto px-4 pb-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`flex items-center gap-1 whitespace-nowrap rounded-[50px] px-3 py-2 text-[13px] transition ${
                  selectedFilters.includes(filter.id)
                    ? "bg-[#7F5AFF]"
                    : "bg-[#1E293B] text-gray-300"
                }`}
              >
                <img src={filter.icon} alt={filter.label} className="h-4 w-4" />
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </header>

        <div className="relative p-2">
          {venue.floors.length > 1 && (
            <div className="absolute left-4 top-4 z-10 flex w-10 flex-col-reverse overflow-hidden rounded-[14px] bg-[#2E3A4D] shadow-lg">
              <button
                onClick={() => setCurrentFloor("all")}
                className={`flex h-14 w-full flex-col items-center justify-center border-b border-[#3A4A5D] transition-colors ${
                  currentFloor === "all"
                    ? "bg-[#B59FFF] font-bold text-black"
                    : "text-white hover:bg-[#3A4A5D]"
                }`}
              >
                <span className="text-sm font-bold leading-none">전체</span>
                <span className="mt-0.5 text-[10px]">층</span>
              </button>
              {venue.floors.map((floor) => (
                <button
                  key={floor.floor}
                  onClick={() => setCurrentFloor(floor.floor)}
                  className={`flex h-14 w-full flex-col items-center justify-center border-b border-[#3A4A5D] transition-colors last:border-b-0 ${
                    currentFloor === floor.floor
                      ? "bg-[#B59FFF] font-bold text-black"
                      : "text-white hover:bg-[#3A4A5D]"
                  }`}
                >
                  <span className="text-base font-bold leading-none">{floor.floor}</span>
                  <span className="mt-0.5 text-[10px]">층</span>
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsBottomSheetOpen(true)}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg"
          >
            <img src={myLocation} alt="location" className="h-6 w-6" />
          </button>

          <div className="min-h-[50vh] overflow-hidden rounded-[16px] bg-[#0E172A] p-2">
            <svg
              viewBox={`${venue.svgViewBoxX} ${venue.svgViewBoxY} ${venue.svgWidth} ${venue.svgHeight}`}
              className="h-auto w-full"
            >
              {seatSections.map((section, index) => (
                <g key={`${section.id}-${index}`}>
                  <path
                    d={section.path}
                    fill={selectedSection === section.id ? "#7F5AFF" : section.color}
                    stroke="#0E172A"
                    strokeWidth="2"
                    onClick={() =>
                      setSelectedSection(section.id === selectedSection ? null : section.id)
                    }
                  />
                  {section.x && section.y && (
                    <text
                      x={section.x}
                      y={section.y}
                      fill={section.type === "stage" ? "#6B7280" : "#1E293B"}
                      fontSize="28"
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
              {filteredFacilities.map((f, i) => (
                <g key={`${f.id}-${i}`}>
                  <circle cx={f.x} cy={f.y} r="12" fill="#7F5AFF" stroke="#FFF" strokeWidth="2" />
                  <MapPin x={f.x - 9} y={f.y - 9} size={18} className="text-white" />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {!isBottomSheetOpen && (
        <button
          type="button"
          onClick={() => setIsBottomSheetOpen(true)}
          className="fixed bottom-[72px] left-1/2 z-[55] -translate-x-1/2 rounded-full border border-white/20 bg-[#1E293B] px-4 py-2 text-xs text-white shadow-lg"
        >
          <span className="flex items-center gap-1">
            <ChevronUp size={14} />
          </span>
        </button>
      )}

      <BottomSheet
        open={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        venueId={venue.id}
        venueName={venue.name}
        venueAddress={venue.address}
      />
    </div>
  );
};

export default HallMap;
