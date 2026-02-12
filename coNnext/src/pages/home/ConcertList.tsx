import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import FilterIcon from "../../assets/Icons/Align.svg";
import type { UpcomingConcert } from "../../api/concertItem";
import { getUpcomingConcerts } from "../../api/concertItem";

type UIConcert = {
  id: number;
  concertId: number;
  detailId: number;
  title: string;
  subtitle: string;
  artist: string;
  poster: string;
  dDay: number;
  views: number;
};

type FilterType = "dday" | "views";

export default function UpcomingConcertPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>("dday");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [concerts, setConcerts] = useState<UIConcert[]>([]);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const res = await getUpcomingConcerts();

        const mapped: UIConcert[] = res.payload.map((c: UpcomingConcert) => {
          const start = new Date(c.startAt);
          const today = new Date();
          const diff = start.getTime() - today.getTime();
          const dDay = Math.ceil(diff / (1000 * 60 * 60 * 24));

          return {
            id: c.detailId,
            concertId: c.concertId,
            detailId: c.detailId,
            title: c.concertName,
            subtitle: "",
            artist: "",
            poster: c.posterImage,
            dDay: dDay < 0 ? 0 : dDay,
            views: 0,
          };
        });

        setConcerts(mapped);
      } catch (e) {
        console.error("다가오는 공연 조회 실패:", e);
      }
    };

    fetchConcerts();
  }, []);

  const filteredConcerts = [...concerts].sort((a, b) => {
    if (filter === "views") return (b.views ?? 0) - (a.views ?? 0);
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
        <div className="flex items-center justify-between gap-3 py-4 relative">
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

        <ul className="space-y-4">
          {filteredConcerts.map((concert) => (
            <li
              key={concert.id}
              onClick={() => navigate(`/concert/${concert.detailId}`)}
              className="flex items-center gap-4 rounded-xl bg-[#0f1729] p-3 cursor-pointer hover:bg-[#16203a] transition"
            >
              <img
                src={concert.poster}
                alt={concert.title}
                className="h-[96px] w-[72px] rounded-lg object-cover shrink-0"
              />

              <div className="flex-1">
                <p className="mb-1 text-xs font-semibold text-[#8B7CFF]">
                  {concert.dDay === 0 ? "Today" : `D-${concert.dDay}`}
                </p>

                <p className="text-sm font-semibold leading-tight">
                  {concert.title}
                </p>

                {concert.subtitle && (
                  <p className="text-sm font-semibold leading-tight">
                    {concert.subtitle}
                  </p>
                )}

                {concert.artist && (
                  <p className="mt-1 text-xs text-gray-400">
                    {concert.artist}
                  </p>
                )}
              </div>

              <ChevronRight className="text-gray-400" size={18} />
            </li>
          ))}
        </ul>
      </div>

      {isMenuOpen && (
        <div className="absolute right-4 top-[64px] w-[180px] z-50">
          <div className="bg-[#1e293b] rounded-xl shadow-2xl overflow-hidden border border-white/10">
            <button
              onClick={() => handleFilterChange("dday")}
              className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                filter === "dday"
                  ? "bg-[#0f1729] text-white"
                  : "text-gray-400 hover:bg-[#0f1729]/50"
              }`}
            >
              D-Day 가까운 순
            </button>

            <button
              onClick={() => handleFilterChange("views")}
              className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                filter === "views"
                  ? "bg-[#0f1729] text-white"
                  : "text-gray-400 hover:bg-[#0f1729]/50"
              }`}
            >
              조회수 순
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
