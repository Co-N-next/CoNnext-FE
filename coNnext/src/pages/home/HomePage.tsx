import { useRef, useState } from "react";
import SelectBar from "../../components/common/SelectBar";
import type { Concert, Venue } from "../../types/tickets";
import { useNavigate } from "react-router-dom";


import RV from "../../assets/dumy/ReVel.svg";
import BTS from "../../assets/dumy/BTS.svg";
import RV1 from "../../assets/dumy/ReVel1.svg";

/* ================= 더미 데이터 ================= */
const concerts: Concert[] = [
  {
    id: 1,
    title: "Red Velvet 4th Concert",
    artist: "Red Velvet",
    poster: RV,
    dDay: 0,
    isNew: false,
  },
  {
    id: 2,
    title: "My Dear ReVe",
    artist: "Red Velvet",
    poster: RV1,
    dDay: 3,
    isNew: true,
  },
  {
    id: 3,
    title: "BTS He Soul Tour",
    artist: "BTS",
    poster: BTS,
    dDay: 10,
    isNew: false,
  },
];

const venues: Venue[] = [
  {
    id: 1,
    name: "KSPO DOME",
    location: "서울특별시 송파구",
    image: RV,
    dDay: 0,
    isNew: false,
  },
  {
    id: 2,
    name: "잠실 주경기장",
    location: "서울특별시 송파구",
    image: RV1,
    dDay: 5,
    isNew: true,
  },
];

/* ================= 탭 ================= */
const TABS = [
  { key: "concert", label: "공연장" },
  { key: "baseball", label: "야구장" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

/* ================= 배지 ================= */
const Badge = ({ dDay, isNew }: { dDay: number; isNew: boolean }) => {
  if (dDay === 0) {
    return (
      <span className="absolute top-2 left-2 rounded-full bg-[#8B7CFF] px-3 py-1 text-xs font-semibold text-white">
        Today
      </span>
    );
  }

  if (isNew) {
    return (
      <span className="absolute top-2 left-2 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
        NEW
      </span>
    );
  }

  return null;
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabKey>("concert");
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const navigate = useNavigate();
  /* ===== 공연 정렬 ===== */
  const sortedConcerts = [...concerts].sort((a, b) => {
    if (a.dDay !== b.dDay) return a.dDay - b.dDay;
    return a.title.localeCompare(b.title, "ko");
  });

  const length = sortedConcerts.length;

  const main = sortedConcerts[index];
  const left = sortedConcerts[(index - 1 + length) % length];
  const right = sortedConcerts[(index + 1) % length];

  /* ===== 스와이프 ===== */
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;

    if (diff > 50) {
      setIndex((i) => (i + 1) % length);
    } else if (diff < -50) {
      setIndex((i) => (i - 1 + length) % length);
    }
  };

  /* ===== 공연장 정렬 ===== */
  const sortedVenues = [...venues].sort((a, b) => {
    if (a.dDay !== b.dDay) return a.dDay - b.dDay;
    return a.name.localeCompare(b.name, "ko");
  });

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white flex justify-center">
      <div className="w-full max-w-112.5">
        <SelectBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === "concert" && (
          <>
            {/* ===== 다가오는 공연 ===== */}
            <section className="px-4 pt-6">
              <h2 className="mb-4 text-lg font-semibold"
              onClick={() => navigate("/concert")}
              >
                다가오는 공연 &gt;
              </h2>

              <div
                className="flex items-center justify-center gap-4 select-none"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {[left, main, right].map((item, idx) => {
                  const isMain = idx === 1;

                  return (
                    <div
                      key={item.id}
                      className={`relative transition-transform duration-300 ${
                        isMain
                          ? "scale-100"
                          : "scale-90 opacity-40"
                      }`}
                    >
                      <img
                        src={item.poster}
                        alt={item.title}
                        className={`rounded-xl ${
                          isMain
                            ? "h-80 w-52.5"
                            : "h-60 w-37.5"
                        }`}
                      />

                      <Badge dDay={item.dDay} isNew={item.isNew} />

                      {isMain && (
                        <div className="mt-2 text-center">
                          <p className="font-bold">{item.title}</p>
                          <p className="text-sm text-gray-400">
                            {item.artist}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ===== 공연장 정보 ===== */}
            <section className="px-4 mt-10">
              <h2 className="mb-4 text-lg font-semibold">
                공연장 정보 &gt;
              </h2>

              <div className="flex gap-4 overflow-x-auto pb-2">
                {sortedVenues.map((v) => (
                  <div key={v.id} className="relative w-55 shrink-0">
                    <img
                      src={v.image}
                      alt={v.name}
                      className="h-32.5 w-full rounded-xl object-cover"
                    />
                    <Badge dDay={v.dDay} isNew={v.isNew} />
                    <div className="mt-2 text-sm">
                      <p className="text-gray-400">{v.location}</p>
                      <p className="font-semibold">{v.name}</p>
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