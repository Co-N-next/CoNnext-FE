import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight} from "lucide-react";
import type{ Concert } from "../../types/tickets";
import RV from "../../assets/dumy/ReVel.svg";
import RV1 from "../../assets/dumy/ReVel1.svg";
import BTS from "../../assets/dumy/BTS.svg";
import FilterIcon from "../../assets/logo/FilterIcon.svg";

/* ===== 더미 데이터 ===== */
const concerts: Concert[] = [
  {
    id: 1,
    title: "Red Velvet 4th Concert",
    subtitle: "<R to V>",
    artist: "Red Velvet (레드벨벳)",
    poster: RV,
    dDay: 0,
    isNew: false,
    views: 3200,
  },
  {
    id: 2,
    title: "Red Velvet 4th Concert",
    subtitle: "<R to V>",
    artist: "Red Velvet (레드벨벳)",
    poster: RV1,
    dDay: 4,
    isNew: true,
    views: 5400,
  },
  {
    id: 3,
    title: "BTS Concert",
    subtitle: "He Soul Tour",
    artist: "BTS",
    poster: BTS,
    dDay: 8,
    isNew: false,
    views: 12000,
  },
];

type FilterType = "dday" | "views";

export default function UpcomingConcertPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>("dday");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* ===== 필터 적용 ===== */
  const filteredConcerts = [...concerts].sort((a, b) => {
    if (filter === "views") return b.views - a.views;
    if (a.dDay !== b.dDay) return a.dDay - b.dDay;
    return a.title.localeCompare(b.title, "ko");
  });

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white flex justify-center relative">
      <div className="w-full max-w-[450px] px-4 pb-6">
        {/* ===== 헤더 ===== */}
        <div className="flex items-center justify-between gap-3 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-lg">
              &lt;
            </button>
            <h1 className="text-lg font-semibold">다가오는 공연</h1>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-1 hover:opacity-80 transition-opacity"
          >
            <img src={FilterIcon} alt="Filter" className="w-6 h-6" />
          </button>
        </div>

        {/* ===== 공연 리스트 ===== */}
        <ul className="space-y-4">
          {filteredConcerts.map((concert) => (
            <li
              key={concert.id}
              onClick={() => navigate(`/concert/${concert.id}`)}
              className="flex items-center gap-4 rounded-xl bg-[#0f1729] p-3 cursor-pointer hover:bg-[#16203a] transition"
            >
              {/* 포스터 */}
              <img
                src={concert.poster}
                alt={concert.title}
                className="h-[96px] w-[72px] rounded-lg object-cover shrink-0"
              />

              {/* 텍스트 */}
              <div className="flex-1">
                {/* D-Day */}
                <p className="mb-1 text-xs font-semibold text-[#8B7CFF]">
                  {concert.dDay === 0 ? "Today" : `D-${concert.dDay}`}
                </p>

                <p className="text-sm font-semibold leading-tight">
                  {concert.title}
                </p>
                <p className="text-sm font-semibold leading-tight">
                  {concert.subtitle}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {concert.artist}
                </p>
              </div>

              <ChevronRight className="text-gray-400" size={18} />
            </li>
          ))}
        </ul>
      </div>

      {/* ===== 오버레이 및 정렬 메뉴 ===== */}
      {isMenuOpen && (
        <>
          {/* 오버레이 */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* 정렬 메뉴 */}
          <div className="fixed right-0 top-0 bottom-0 w-1/2 max-w-[200px] z-50">
            <div className="bg-[#1e293b] rounded-l-2xl mt-20 mr-4 shadow-2xl">
              <div className="py-2">
                <button
                  onClick={() => handleFilterChange("dday")}
                  className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                    filter === "dday"
                      ? "bg-[#0f1729] text-white"
                      : "text-gray-400 hover:bg-[#0f1729]/50"
                  }`}
                >
                  가까운 공연 순
                </button>
                <button
                  onClick={() => handleFilterChange("views")}
                  className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                    filter === "views"
                      ? "bg-[#0f1729] text-white"
                      : "text-gray-400 hover:bg-[#0f1729]/50"
                  }`}
                >
                  조회순
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}