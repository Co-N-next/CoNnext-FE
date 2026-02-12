import { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SelectBar from "../../components/common/SelectBar";
import type { Concert, Venue } from "../../types/tickets";

import { Typography } from "../../styles/tokens/typography";
import Revel from "../../assets/dumy/Revel.svg";
import BTS from "../../assets/dumy/BTS.svg";
import Revel1 from "../../assets/dumy/Revel1.svg";

const concerts: Concert[] = [
  { id: 1, title: "Red Velvet 4th Concert", subtitle: "<R to V>", artist: "Red Velvet (레드벨벳)", poster: Revel, dDay: 4, isNew: false },
  { id: 2, title: "My Dear ReVe", subtitle: "", artist: "Red Velvet", poster: Revel1, dDay: 10, isNew: true },
  { id: 3, title: "BTS The Soul Tour", subtitle: "", artist: "BTS", poster: BTS, dDay: 15, isNew: false },
  { id: 4, title: "SEVENTEEN 콘서트", subtitle: "Be The Sun", artist: "SEVENTEEN", poster: Revel, dDay: 7, isNew: false },
  { id: 5, title: "아이유 콘서트", subtitle: "The Golden Hour", artist: "IU", poster: Revel1, dDay: 12, isNew: true },
  { id: 6, title: "NCT DREAM 콘서트", subtitle: "The Dream Show", artist: "NCT DREAM", poster: BTS, dDay: 3, isNew: false },
  { id: 7, title: "볼빨간사춘기 공연", subtitle: "Wild and Free", artist: "볼빨간사춘기", poster: Revel, dDay: 20, isNew: false },
  { id: 8, title: "Stray Kids 콘서트", subtitle: "District 9", artist: "Stray Kids", poster: Revel1, dDay: 5, isNew: false },
  { id: 9, title: "NewJeans 공연", subtitle: "", artist: "NewJeans", poster: BTS, dDay: 14, isNew: true },
  { id: 10, title: "블랙핑크 월드투어", subtitle: "Born Pink", artist: "BLACKPINK", poster: Revel, dDay: 1, isNew: false },
];

const venues: Venue[] = [
  { id: 1, name: "KSPO DOME", location: "서울특별시 송파구", image: Revel, dDay: 0, isNew: true },
  { id: 2, name: "잠실 주경기장", location: "서울특별시 송파구", image: Revel1, dDay: 5, isNew: false },
  { id: 3, name: "고척 스카이돔", location: "서울특별시 구로구", image: BTS, dDay: 8, isNew: false },
];

const TABS = [
  { key: "concert", label: "공연장" },
  { key: "baseball", label: "야구장" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const ConcertBadge = ({ dDay, isNew }: { dDay: number; isNew: boolean }) => {
  if (isNew) {
    return (
      <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
        NEW
      </span>
    );
  }
  return (
    <span className="absolute left-3 top-3 rounded-full bg-[#8B7CFF] px-3 py-1 text-xs font-semibold text-white">
      {dDay === 0 ? "Today" : `D-${dDay}`}
    </span>
  );
};

const VenueBadge = ({ dDay, isNew }: { dDay: number; isNew: boolean }) => {
  return (
    <>
      <span className="absolute left-3 top-3 rounded-full bg-[#7661FF] px-3 py-1 text-xs font-semibold text-white">
        {dDay === 0 ? "Today" : `D-${dDay}`}
      </span>
      {isNew && (
        <span className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-1 text-xs font-semibold text-white">
          New
        </span>
      )}
    </>
  );
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabKey>("concert");
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const navigate = useNavigate();

  const sortedConcerts = [...concerts].sort((a, b) => a.dDay !== b.dDay ? a.dDay - b.dDay : a.title.localeCompare(b.title, "ko"));
  const sortedVenues = [...venues].sort((a, b) => a.dDay !== b.dDay ? a.dDay - b.dDay : a.name.localeCompare(b.name, "ko"));

  const length = sortedConcerts.length;
  const main = sortedConcerts[index];
  const left = sortedConcerts[(index - 1 + length) % length];
  const right = sortedConcerts[(index + 1) % length];

  const onTouchStart = (e: React.TouchEvent) => startX.current = e.touches[0].clientX;
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) setIndex(i => (i + 1) % length);
    else if (diff < -50) setIndex(i => (i - 1 + length) % length);
  };
  const onMouseDown = (e: React.MouseEvent) => startX.current = e.clientX;
  const onMouseUp = (e: React.MouseEvent) => {
    const diff = startX.current - e.clientX;
    if (diff > 50) setIndex(i => (i + 1) % length);
    else if (diff < -50) setIndex(i => (i - 1 + length) % length);
  };

  const posterCommonClass = "relative shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.45)]";

  return (
    <div className="min-h-full text-white">
      <div className="fixed left-1/2 top-20 z-40 w-full max-w-[450px] -translate-x-1/2 bg-[#0E1730]">
        <SelectBar tabs={TABS} activeTab={activeTab} onTabChange={tab => tab === "concert" && setActiveTab(tab)} />
      </div>

      <div className="w-full max-w-[450px] bg-[#091739] pb-8 pt-12">
        {activeTab === "concert" && (
          <>
            <section className="px-5 pt-7">
              <h2 style={Typography.subhead} className="mb-5 flex cursor-pointer items-center gap-1" onClick={() => navigate("/concert")}>
                다가오는 공연
                <ChevronRight className="h-6 w-6" />
              </h2>

              <div
                className="relative min-h-[440px] select-none"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
              >
                <div className="flex items-center justify-center">
                  <button type="button" onClick={() => navigate(`/concert/${left.id}`)} className={`${posterCommonClass} mr-[-58px] h-[216px] w-[162px] opacity-45`}>
                    <img src={left.poster} alt={left.title} className="h-full w-full object-cover" />
                  </button>

                  <button type="button" onClick={() => navigate(`/concert/${main.id}`)} className={`${posterCommonClass} z-10 h-[276px] w-[207px]`}>
                    <img src={main.poster} alt={main.title} className="h-full w-full object-cover" />
                    <ConcertBadge dDay={main.dDay} isNew={main.isNew} />
                  </button>

                  <button type="button" onClick={() => navigate(`/concert/${right.id}`)} className={`${posterCommonClass} ml-[-58px] h-[216px] w-[162px] opacity-45`}>
                    <img src={right.poster} alt={right.title} className="h-full w-full object-cover" />
                  </button>
                </div>

                <div className="absolute bottom-19 left-1/2 w-full max-w-[300px] -translate-x-1/2 text-center">
                  <p style={Typography.body1}>{main.title}</p>
                  {main.subtitle && <p style={Typography.subhead}>{main.subtitle}</p>}
                  <p style={Typography.caption1} className="mt-1 text-[#E8E8E8]">
                    {main.artist}
                  </p>
                </div>
              </div>
            </section>

            <section className="px-5 -mt-10">
              <h2 style={Typography.title2} className="mb-5">공연장 정보</h2>

              <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {sortedVenues.map(v => (
                  <button key={v.id} type="button" onClick={() => navigate("/find")} className="shrink-0 overflow-hidden rounded-2xl border border-white/12 bg-[#0B1734] text-left shadow-[0_10px_22px_rgba(0,0,0,0.34)]">
                    <div className="relative h-[150px] w-[150px]">
                      <img src={v.image} alt={v.name} className="h-full w-full object-cover" />
                      <VenueBadge dDay={v.dDay} isNew={v.isNew} />
                    </div>
                    <div className="h-[84px] border-t border-white/10 bg-[#09142E] px-3 py-2.5">
                      <p style={Typography.caption2}>{v.location}</p>
                      <p style={Typography.body1} className="mt-1">{v.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
