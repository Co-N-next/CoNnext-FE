import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, EyeOff } from "lucide-react";
import storefront from "../../assets/logo/storefront.svg";
import arrow_circle_up from "../../assets/logo/arrow_circle_up.svg";
import wc from "../../assets/logo/wc.svg";

// Mock Data for mates on map
const MATES_ON_MAP = [
  {
    id: 1,
    name: "도둑맞은 고양이",
    location: "C구역 a열 t번",
    avatar: "🐱", 
    top: "35%",
    left: "25%",
    color: "#A78BFA", // Light purple
  },
  {
    id: 2,
    name: "살찐 햄스터",
    location: "H구역 a열 m번",
    avatar: "🐹",
    top: "55%",
    left: "65%",
    color: "#A78BFA",
  },
];

const MateMap = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"indoor" | "outdoor">("indoor");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="bg-[#0E172A] min-h-screen text-white relative overflow-hidden flex flex-col items-center">
       <div className="max-w-[450px] w-full h-full min-h-screen relative ">
      
      {/* Header Area */}
      <div className="absolute top-0 left-0 w-full z-20 px-4 py-4 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} />
        </button>

        {/* Toggle Switch */}
        <div className="bg-[#1E293B] rounded-[12px] p-1 flex gap-[4px]">
          <button
            onClick={() => setViewMode("indoor")}
            className={`px-4 py-2.5 rounded-[12px] text-[13px] font-normal transition-all ${
              viewMode === "indoor"
                ? "bg-[#7F5AFF] text-white"
                : "text-white hover:text-white"
            }`}
          >
            실내
          </button>
          <button
            onClick={() => setViewMode("outdoor")}
            className={`px-4 py-2.5 rounded-lg text-[13px] font-normal transition-all ${
              viewMode === "outdoor"
                ? "bg-[#7F5AFF] text-white"
                : "text-white hover:text-white"
            }`}
          >
            외부
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-2 absolute top-20 left-4 z-20 flex gap-2">
        <button
          onClick={() => toggleFilter("entrance")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] font-medium transition ${
            activeFilters.includes("entrance")
              ? "bg-[#7F5AFF] text-white"
              : "bg-[#1E293B] text-gray-300 hover:bg-[#2D3748]"
          }`}
        >
           <img src={arrow_circle_up} alt="" className={activeFilters.includes("store") ? "text-white" : "text-[#A78BFA]"} />
          출입구
        </button>
        <button
          onClick={() => toggleFilter("restroom")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] font-medium transition ${
            activeFilters.includes("restroom")
              ? "bg-[#7F5AFF] text-white"
              : "bg-[#1E293B] text-gray-300 hover:bg-[#2D3748]"
          }`}
        >
            <img src={wc} alt="" className={activeFilters.includes("store") ? "text-white" : "text-[#A78BFA]"} />
            화장실
        </button>
        <button
          onClick={() => toggleFilter("store")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] font-medium transition ${
            activeFilters.includes("store")
              ? "bg-[#7F5AFF] text-white"
              : "bg-[#1E293B] text-gray-300 hover:bg-[#2D3748]"
          }`}
        >
          <img src={storefront} alt="" className={activeFilters.includes("store") ? "text-white" : "text-[#A78BFA]"} />
          편의점
        </button>
      </div>

      {/* Map Content (Placeholder) */}
      <div className="w-full h-full absolute top-0 left-0 bg-[#0E172A]">
          {/* Grid or Map Image Placeholder */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{
                   backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
                   backgroundSize: '20px 20px'
               }}
          ></div>
          
        {/* Mates Pins */}
        {MATES_ON_MAP.map((mate) => (
          <div
            key={mate.id}
            className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: mate.top, left: mate.left }}
          >
            {/* Tooltip Bubble */}
            <div className="mb-2 bg-[#333333]/90 backdrop-blur-sm px-4 py-2 rounded-[16px] text-center border border-white/10 shadow-lg min-w-[120px]">
              <div className="text-[14px] font-bold text-white mb-0.5 whitespace-nowrap">
                {mate.name}
              </div>
              <div className="text-[11px] text-gray-300 font-light whitespace-nowrap">
                {mate.location}
              </div>
            </div>

            {/* Avatar Pin */}
            <div className="relative">
                <div className="w-10 h-10 bg-[#E0D4FC] rounded-full flex items-center justify-center text-[20px] shadow-lg border-2 border-[#7F5AFF] z-10 relative">
                 {mate.avatar}
                </div>
                 {/* Pin Tail effect (triangle) */}
                 <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#7F5AFF] rotate-45 z-0"></div>
            </div>
            
          </div>
        ))}
      </div>

      <div className="absolute bottom-[100px] right-4 flex flex-col gap-4 z-20 bg-[#333333] p-1.5 rounded-full shadow-xl pb-3 pt-3">
        <button className="w-[48px] h-[48px] bg-[#1E293B] rounded-full flex items-center justify-center shadow-lg border border-gray-700 hover:bg-[#2D3748]">
            <span role="img" aria-label="hide-location" className="text-xl">👻</span>
        </button>
        <button className="w-[48px] h-[48px] bg-[#1E293B] rounded-full flex items-center justify-center shadow-lg border border-gray-700 hover:bg-[#2D3748]">
           <EyeOff size={20} className="text-gray-400" />
        </button>
         <button className="w-[48px] h-[48px] bg-[#1E293B] rounded-full flex items-center justify-center shadow-lg border border-gray-700 hover:bg-[#2D3748]">
           <EyeOff size={20} className="text-gray-400" />
        </button>
      </div>
    </div>
    </div>


  );
};

export default MateMap;
