import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SelectBar from "../../components/common/SelectBar";
import type { UpcomingConcert } from "../../api/concertItem";
import { getUpcomingConcerts } from "../../api/concertItem";
import { getTrendingVenues } from "../../api/venue";

import { Typography } from "../../styles/tokens/typography";
import Revel from "../../assets/dumy/Revel.svg";

type HomeConcert = {
  id: number;
  title: string;
  subtitle: string;
  artist: string;
  poster: string;
  dDay: number;
};

type HomeVenue = {
  id: number;
  name: string;
  location: string;
  image: string;
};

const TABS = [
  { key: "concert", label: "공연장" },
  { key: "baseball", label: "야구장" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const pickEarliestByConcertId = (items: UpcomingConcert[]) => {
  const byConcert = new Map<number, UpcomingConcert>();

  items.forEach((item) => {
    const current = byConcert.get(item.concertId);
    if (!current) {
      byConcert.set(item.concertId, item);
      return;
    }

    const currentTime = new Date(current.startAt).getTime();
    const nextTime = new Date(item.startAt).getTime();

    if (!Number.isNaN(nextTime) && (Number.isNaN(currentTime) || nextTime < currentTime)) {
      byConcert.set(item.concertId, item);
    }
  });

  return [...byConcert.values()];
};

const parseDDay = (dday?: string | null, startAt?: string | null) => {
  const safeDDay = String(dday ?? "");
  const digitsOnly = safeDDay.replace(/\D/g, "");
  if (digitsOnly.length > 0) return Number(digitsOnly);
  if (safeDDay.toLowerCase().includes("today")) return 0;

  if (!startAt) return 0;

  const start = new Date(startAt);
  if (Number.isNaN(start.getTime())) return 0;

  const today = new Date();
  const diff = start.getTime() - today.getTime();
  const calculated = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return calculated < 0 ? 0 : calculated;
};

const ConcertBadge = ({ dDay }: { dDay: number }) => {
  return (
    <span className="absolute left-3 top-3 rounded-full bg-[#8B7CFF] px-3 py-1 text-xs font-semibold text-white">
      {dDay === 0 ? "Today" : `D-${dDay}`}
    </span>
  );
};

const VenueBadge = () => {
  return (
    <>
      <span className="absolute left-3 top-3 rounded-full bg-[#7661FF] px-3 py-1 text-xs font-semibold text-white">
        Today
      </span>
    </>
  );
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabKey>("concert");
  const [index, setIndex] = useState(0);
  const [concerts, setConcerts] = useState<HomeConcert[]>([]);
  const [venues, setVenues] = useState<HomeVenue[]>([]);
  const startX = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchConcerts = async () => {
      try {
        const res = await getUpcomingConcerts();
        const deduped = pickEarliestByConcertId(res.payload ?? []);
        const mappedConcerts: HomeConcert[] = deduped.map(
          (concert: UpcomingConcert) => ({
            id: concert.detailId,
            title: concert.concertName,
            subtitle: "",
            artist: "",
            poster: concert.posterImage,
            dDay: parseDDay(concert.dday, concert.startAt),
          }),
        );

        if (mounted) setConcerts(mappedConcerts);
      } catch (error) {
        console.error("다가오는 공연 조회 실패:", error);
      }
    };

    fetchConcerts();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const fetchVenues = async () => {
      try {
        const res = await getTrendingVenues();
        const mappedVenues: HomeVenue[] = (res.payload ?? []).map((venue) => ({
          id: venue.id,
          name: venue.name,
          location: venue.city,
          image: venue.imageUrl || Revel,
        }));

        if (mounted) setVenues(mappedVenues);
      } catch (error) {
        console.error("공연장 조회 실패:", error);
      }
    };

    fetchVenues();

    return () => {
      mounted = false;
    };
  }, []);

  const sortedConcerts = [...concerts].sort((a, b) =>
    a.dDay !== b.dDay
      ? a.dDay - b.dDay
      : a.title.localeCompare(b.title, "ko"),
  );
  const sortedVenues = [...venues];

  const length = sortedConcerts.length;
  const hasConcerts = length > 0;
  const safeIndex = hasConcerts ? index % length : 0;
  const main = hasConcerts ? sortedConcerts[safeIndex] : null;
  const left = hasConcerts ? sortedConcerts[(safeIndex - 1 + length) % length] : null;
  const right = hasConcerts ? sortedConcerts[(safeIndex + 1) % length] : null;

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!hasConcerts) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) setIndex((i) => (i + 1) % length);
    else if (diff < -50) setIndex((i) => (i - 1 + length) % length);
  };
  const onMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
  };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!hasConcerts) return;
    const diff = startX.current - e.clientX;
    if (diff > 50) setIndex((i) => (i + 1) % length);
    else if (diff < -50) setIndex((i) => (i - 1 + length) % length);
  };

  const posterCommonClass =
    "relative shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.45)]";

  return (
    <div className="min-h-full text-white">
      <div className="fixed left-1/2 top-20 z-40 w-full max-w-[450px] -translate-x-1/2 bg-[#0E1730]">
        <SelectBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={(tab) => tab === "concert" && setActiveTab(tab)}
        />
      </div>

      <div className="w-full max-w-[450px] bg-[#091739] pb-8 pt-12">
        {activeTab === "concert" && (
          <>
            <section className="px-5 pt-7">
              <h2
                style={Typography.subhead}
                className="mb-5 flex cursor-pointer items-center gap-1"
                onClick={() => navigate("/concert")}
              >
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
                {hasConcerts && main && left && right ? (
                  <>
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => navigate(`/concert/${left.id}`)}
                        className={`${posterCommonClass} mr-[-58px] h-[216px] w-[162px] opacity-45`}
                      >
                        <img
                          src={left.poster}
                          alt={left.title}
                          className="h-full w-full object-cover"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate(`/concert/${main.id}`)}
                        className={`${posterCommonClass} z-10 h-[276px] w-[207px]`}
                      >
                        <img
                          src={main.poster}
                          alt={main.title}
                          className="h-full w-full object-cover"
                        />
                        <ConcertBadge dDay={main.dDay} />
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate(`/concert/${right.id}`)}
                        className={`${posterCommonClass} ml-[-58px] h-[216px] w-[162px] opacity-45`}
                      >
                        <img
                          src={right.poster}
                          alt={right.title}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    </div>

                    <div className="absolute top-72 left-1/2 w-full max-w-[300px] -translate-x-1/2 text-center">
                      <p
                        style={Typography.body1}
                        className="mx-auto max-w-[207px] break-all text-center leading-tight"
                      >
                        {main.title}
                      </p>
                      {main.subtitle && <p style={Typography.subhead}>{main.subtitle}</p>}
                      <p style={Typography.caption1} className="mt-1 text-[#E8E8E8]">
                        {main.artist}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex min-h-[320px] items-center justify-center text-sm text-[#C7CCDA]">
                    표시할 다가오는 공연이 없습니다.
                  </div>
                )}
              </div>
            </section>

            <section className="px-5 -mt-20">
              <h2 style={Typography.title2} className="mb-5">
                공연장 정보
              </h2>

              <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {sortedVenues.map((v, idx) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => navigate("/find")}
                    className="shrink-0 overflow-hidden rounded-2xl border border-white/12 bg-[#0B1734] text-left shadow-[0_10px_22px_rgba(0,0,0,0.34)]"
                  >
                    <div className="relative h-[150px] w-[150px]">
                      <img
                        src={v.image}
                        alt={v.name}
                        className="h-full w-full object-cover"
                      />
                      {idx === 0 && <VenueBadge />}
                    </div>
                    <div className="h-[84px] border-t border-white/10 bg-[#09142E] px-3 py-2.5">
                      <p style={Typography.caption2}>{v.location}</p>
                      <p style={Typography.body1} className="mt-1">
                        {v.name}
                      </p>
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
