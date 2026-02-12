import { useRef, useState } from "react";
import SelectBar from "../../components/common/SelectBar";
import type { Concert, Venue } from "../../types/tickets";
import { useNavigate } from "react-router-dom";

import Revel from "../../assets/dumy/Revel.svg";
import BTS from "../../assets/dumy/BTS.svg";
import Revel1 from "../../assets/dumy/Revel1.svg";

/* ================= 더미 데이터 (가로 무한스크롤 테스트용) ================= */
const concerts: Concert[] = [
  { id: 1, title: "Red Velvet 4th Concert", subtitle: "<R to V>", artist: "Red Velvet (레드벨벳)", poster: Revel, dDay: 4, isNew: false },
  { id: 2, title: "My Dear ReVe", subtitle: "", artist: "Red Velvet", poster: Revel1, dDay: 10, isNew: true },
  { id: 3, title: "BTS He Soul Tour", subtitle: "", artist: "BTS", poster: BTS, dDay: 15, isNew: false },
  { id: 4, title: "세븐틴 콘서트", subtitle: "Be The Sun", artist: "SEVENTEEN", poster: Revel, dDay: 7, isNew: false },
  { id: 5, title: "아이유 콘서트", subtitle: "The Golden Hour", artist: "IU", poster: Revel1, dDay: 12, isNew: true },
  { id: 6, title: "NCT DREAM 콘서트", subtitle: "The Dream Show", artist: "NCT DREAM", poster: BTS, dDay: 3, isNew: false },
  { id: 7, title: "볼빨간사춘기 팬미팅", subtitle: "Wild and Free", artist: "볼빨간사춘기", poster: Revel, dDay: 20, isNew: false },
  { id: 8, title: "Stray Kids 콘서트", subtitle: "District 9", artist: "Stray Kids", poster: Revel1, dDay: 5, isNew: false },
  { id: 9, title: "NewJeans 공연", subtitle: "", artist: "NewJeans", poster: BTS, dDay: 14, isNew: true },
  { id: 10, title: "블랙핑크 월드투어", subtitle: "Born Pink", artist: "BLACKPINK", poster: Revel, dDay: 1, isNew: false },
];

const venues: Venue[] = [
  {
    id: 1,
    name: "KSPO DOME",
    location: "서울특별시 송파구",
    image: Revel,
    dDay: 0,
    isNew: true,
  },
  {
    id: 2,
    name: "잠실 주경기장",
    location: "서울특별시 송파구",
    image: Revel1,
    dDay: 5,
    isNew: false,
  },
  {
    id: 3,
    name: "고척 스카이돔",
    location: "서울특별시 구로구",
    image: BTS,
    dDay: 8,
    isNew: false,
  },
];

/* ================= 탭 ================= */
const TABS = [
  { key: "concert", label: "공연장" },
  { key: "baseball", label: "야구장" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

/* ================= 공연 포스터 배지: isNew일 때 NEW만, 아니면 D-day/Today ================= */
const Badge = ({ dDay, isNew }: { dDay: number; isNew: boolean }) => {
  if (isNew) {
    return (
      <span className="absolute top-2 left-2 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
        NEW
      </span>
    );
  }
  if (dDay === 0) {
    return (
      <span
        className="absolute top-2 left-2 rounded-full px-3 py-1 text-xs font-semibold text-white"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        Today
      </span>
    );
  }
  return (
    <span
      className="absolute top-2 left-2 rounded-full px-3 py-1 text-xs font-semibold text-white"
      style={{ backgroundColor: "var(--color-accent)" }}
    >
      D-{dDay}
    </span>
  );
};

/* ================= 공연장 배지: 상단 D-day/Today, 하단 New ================= */
const VenueBadge = ({ dDay, isNew }: { dDay: number; isNew: boolean }) => {
  return (
    <>
      {/* 상단: D-day 또는 Today */}
      {dDay === 0 ? (
        <span
          className="absolute top-2 left-2 rounded-full px-2 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Today
        </span>
      ) : (
        <span
          className="absolute top-2 left-2 rounded-full px-2 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          D-{dDay}
        </span>
      )}
      {/* 하단: New */}
      {isNew && (
        <span
          className="absolute bottom-2 left-2 rounded px-2 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
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

  /* ===== 공연 정렬: D-day 짧은 순, 동일 시 가나다 순 ===== */
  const sortedConcerts = [...concerts].sort((a, b) => {
    if (a.dDay !== b.dDay) return a.dDay - b.dDay;
    return a.title.localeCompare(b.title, "ko");
  });

  const length = sortedConcerts.length;
  const main = sortedConcerts[index];
  const left = sortedConcerts[(index - 1 + length) % length];
  const right = sortedConcerts[(index + 1) % length];

  /* ===== 스와이프 (가로 무한 스크롤) ===== */
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) setIndex((i) => (i + 1) % length);
    else if (diff < -50) setIndex((i) => (i - 1 + length) % length);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
  };

  const onMouseUp = (e: React.MouseEvent) => {
    const diff = startX.current - e.clientX;
    if (diff > 50) setIndex((i) => (i + 1) % length);
    else if (diff < -50) setIndex((i) => (i - 1 + length) % length);
  };

  /* ===== 공연장 정렬: 공연일 짧은 순 ===== */
  const sortedVenues = [...venues].sort((a, b) => {
    if (a.dDay !== b.dDay) return a.dDay - b.dDay;
    return a.name.localeCompare(b.name, "ko");
  });

  return (
    <div
      className="min-h-screen text-white flex justify-center overflow-x-hidden"
      style={{ backgroundColor: "var(--color-bg-page)" }}
    >
      
      <div
        className="fixed left-1/2 -translate-x-1/2 z-40 w-full max-w-[450px] top-20"
        style={{ backgroundColor: "var(--color-bg-card)" }}
      >
        <SelectBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      
      <div className="w-full max-w-[450px] pt-14">
        {activeTab === "concert" && (
          <>
            {/* ===== 다가오는 공연 ===== */}
            <section className="pt-6 px-4">
              <h2
                className="mb-[10px] font-semibold cursor-pointer hover:opacity-80 text-left"
                style={{ fontSize: "var(--text-title)" }}
                onClick={() => navigate("/concert")}
              >
                다가오는 공연 &gt;
              </h2>

              <div
                className="flex items-center justify-center select-none min-h-[320px]"
                style={{
                  paddingLeft: "var(--spacing-poster-side)",
                  paddingRight: "var(--spacing-poster-side)",
                }}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
              >
                
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/concert/${left.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate(`/concert/${left.id}`);
                    }
                  }}
                  className="relative shrink-0 cursor-pointer transition-all duration-300 z-0 mr-[-50px] opacity-50"
                  style={{
                    width: "var(--size-poster-sub-w)",
                    height: "var(--size-poster-sub-h)",
                  }}
                >
                  <img
                    src={left.poster}
                    alt={left.title}
                    className="w-full h-full object-cover"
                    style={{ borderRadius: "var(--radius-card)" }}
                  />
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/concert/${main.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate(`/concert/${main.id}`);
                    }
                  }}
                  className="relative shrink-0 cursor-pointer transition-all duration-300 z-10 flex flex-col items-center opacity-100"
                  style={{
                    width: "var(--size-poster-main-w)",
                    height: "var(--size-poster-main-h)",
                  }}
                >
                  <img
                    src={main.poster}
                    alt={main.title}
                    className="w-full h-full object-cover"
                    style={{ borderRadius: "var(--radius-card)" }}
                  />
                  <Badge dDay={main.dDay} isNew={main.isNew} />
                  <div className="mt-2 flex flex-col items-center text-center">
                    <p
                      className="font-bold leading-tight"
                      style={{
                        fontSize: "var(--text-caption)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {main.title}
                    </p>
                    {main.subtitle && (
                      <p
                        className="font-bold leading-tight mt-0.5"
                        style={{
                          fontSize: "var(--text-caption)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {main.subtitle}
                      </p>
                    )}
                    <p
                      className="mt-1"
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {main.artist}
                    </p>
                  </div>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/concert/${right.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate(`/concert/${right.id}`);
                    }
                  }}
                  className="relative shrink-0 cursor-pointer transition-all duration-300 z-0 ml-[-50px] opacity-50"
                  style={{
                    width: "var(--size-poster-sub-w)",
                    height: "var(--size-poster-sub-h)",
                  }}
                >
                  <img
                    src={right.poster}
                    alt={right.title}
                    className="w-full h-full object-cover"
                    style={{ borderRadius: "var(--radius-card)" }}
                  />
                </div>
              </div>
            </section>

            <section className="px-4 mt-10">
              <h2
                className="mb-4 font-semibold text-left"
                style={{ fontSize: "var(--text-title)" }}
              >
                공연장 정보
              </h2>

              <div
                className="flex gap-[5px] overflow-x-auto pb-2 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {sortedVenues.map((v) => (
                  <div
                    key={v.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate("/find")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        navigate("/find");
                      }
                    }}
                    className="shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                  >

                    <div
                      className="relative overflow-hidden"
                      style={{
                        width: "var(--size-venue-image)",
                        height: "var(--size-venue-image)",
                        borderRadius: "var(--radius-card)",
                      }}
                    >
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-full h-full object-cover"
                      />
                      <VenueBadge dDay={v.dDay} isNew={v.isNew} />
                    </div>
                    <div
                      className="mt-2"
                      style={{ width: "var(--size-venue-image)" }}
                    >
                      <p
                        style={{
                          fontSize: "var(--text-xs)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {v.location}
                      </p>
                      <p
                        className="font-semibold"
                        style={{
                          fontSize: "var(--text-caption)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {v.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
