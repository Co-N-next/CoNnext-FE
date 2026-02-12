import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { getConcertById } from "../../api/concertItem";

type ViewConcert = {
  id: number;
  title: string;
  poster: string;
  ageRating: string;
  noticeUrl?: string;
  date: string;
  time: string;
  venueName: string;
  venueLocation: string;
  venueImage: string;
  duration: string;
};

const formatDateTime = (iso?: string) => {
  if (!iso) return { date: "-", time: "-" };
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return { date: `${yyyy}.${mm}.${dd}`, time: `${hh}:${min}` };
};

export default function ConcertInfo() {
  const { concertId } = useParams();
  const [data, setData] = useState<ViewConcert | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!concertId) return;
      try {
        setLoading(true);
        const res = await getConcertById(concertId);
        const payload = res.payload;
        const firstSchedule = payload.schedules?.[0];
        const { date, time } = formatDateTime(firstSchedule?.startAt);
        const duration = firstSchedule?.runningTime
          ? `총 ${firstSchedule.runningTime}분`
          : "시간 미정";

        setData({
          id: payload.id,
          title: payload.name,
          poster: payload.posterImage,
          ageRating: payload.ageRating ?? "전체관람가",
          noticeUrl: payload.noticeUrl,
          date,
          time,
          venueName: "장소 미정",
          venueLocation: "",
          venueImage: payload.posterImage,
          duration,
        });
      } catch (e) {
        console.error("공연 기본 정보 조회 실패:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [concertId]);

  const noticeEnabled = useMemo(() => Boolean(data?.noticeUrl), [data?.noticeUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] text-white flex items-center justify-center">
        로딩중...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] text-white flex items-center justify-center">
        공연 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <div className="w-full max-w-[450px] mx-auto">
        <div className="relative">
          <div className="relative h-[500px] w-full overflow-hidden">
            <img
              src={data.poster}
              alt={data.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90" />

            <div className="absolute bottom-6 left-4 flex flex-col gap-3">
              <div className="w-24 h-32 rounded-lg overflow-hidden border-2 border-white/50 shadow-lg">
                <img
                  src={data.poster}
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div>
                  <h2 className="text-lg font-semibold leading-tight text-[18px]">
                    {data.title}
                  </h2>
                </div>

                <div className="flex items-center text-sm text-[13px]">
                  <span className="font-medium text-[#A1A1A1] w-16">일시</span>
                  <span className="font-normal">
                    {data.date} {data.time}
                  </span>
                </div>

                <div className="flex items-center text-sm text-[13px]">
                  <span className="font-medium text-[#A1A1A1] w-16">장소</span>
                  <span className="font-normal">{data.venueName}</span>
                </div>

                <div className="flex items-center text-sm text-[13px]">
                  <span className="font-medium text-[#A1A1A1] w-16">관람등급</span>
                  <span className="font-normal">{data.ageRating}</span>
                </div>

                <div className="flex items-center text-sm text-[13px]">
                  <span className="font-medium text-[#A1A1A1] w-16">관람시간</span>
                  <span className="font-normal">{data.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 border-t border-gray-800">
          <h3 className="text-lg font-semibold text-[16px]">공연장 정보</h3>
          <div className="relative">
            <img
              src={data.venueImage}
              alt={data.venueName}
              className="w-full h-48 rounded-xl object-cover"
            />
            <span className="absolute top-3 left-3 rounded-full bg-[#8B7CFF] px-3 py-1 text-xs font-semibold text-white">
              Today
            </span>
          </div>
          <div className="mt-3">
            <p className="text-sm text-gray-400">{data.venueLocation}</p>
            <p className="text-base font-semibold mt-1">{data.venueName}</p>
          </div>
        </div>

        <div className="px-4 py-6 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-4">아티스트 정보</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
              <span className="text-gray-500 text-xs">이미지</span>
            </div>
          </div>
          <p className="text-base text-gray-400">이름</p>
        </div>

        <div className="px-4 py-6 border-t border-gray-800 pb-20">
          <button
            className={`flex items-center gap-2 text-base transition-opacity ${
              noticeEnabled ? "hover:opacity-80" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => {
              if (data.noticeUrl) window.open(data.noticeUrl, "_blank", "noopener,noreferrer");
            }}
            disabled={!noticeEnabled}
          >
            <span>공지사항 전체 보기</span>
            <ExternalLink size={18} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
