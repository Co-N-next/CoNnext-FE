import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { getConcertDetailById } from "../../api/concertItem";

type ViewConcert = {
  detailId: number;
  title: string;
  poster: string;
  ageRating: string;
  noticeUrl?: string;
  date: string;
  time: string;
  duration: string;
  roundText: string;
};

const formatDateTime = (iso?: string) => {
  if (!iso) return { date: "-", time: "-" };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { date: "-", time: "-" };

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return { date: `${yyyy}.${mm}.${dd}`, time: `${hh}:${min}` };
};

const formatDuration = (runningTime?: number, intermission?: number) => {
  if (!runningTime || runningTime <= 0) return "시간 미정";
  if (!intermission || intermission <= 0) return `총 ${runningTime}분`;
  return `총 ${runningTime}분 (인터미션 ${intermission}분 포함)`;
};

export default function ConcertDetail() {
  const { detailId } = useParams<{ detailId: string }>();
  const [data, setData] = useState<ViewConcert | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!detailId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await getConcertDetailById(detailId);
        const payload = res.payload;
        const { date, time } = formatDateTime(payload.startAt);

        setData({
          detailId: payload.detailId,
          title: payload.name,
          poster: payload.posterImage,
          ageRating: payload.ageRating ?? "전체관람가",
          noticeUrl: payload.noticeUrl,
          date,
          time,
          duration: formatDuration(payload.runningTime, payload.intermission),
          roundText: payload.round ? `${payload.round}회차` : "회차 정보 없음",
        });
      } catch (error) {
        console.error("공연 상세 회차 조회 실패:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [detailId]);

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
        공연 상세 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <div className="w-full max-w-[450px] mx-auto">
        <div className="relative h-[500px] w-full overflow-hidden">
          <img src={data.poster} alt={data.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90" />

          <div className="absolute bottom-6 left-4 flex flex-col gap-3">
            <div className="w-24 h-32 rounded-lg overflow-hidden border-2 border-white/50 shadow-lg">
              <img src={data.poster} alt={data.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold leading-tight text-[18px]">{data.title}</h2>

              <div className="flex items-center text-sm text-[13px]">
                <span className="font-medium text-[#A1A1A1] w-16">일시</span>
                <span className="font-normal">{data.date} {data.time}</span>
              </div>

              <div className="flex items-center text-sm text-[13px]">
                <span className="font-medium text-[#A1A1A1] w-16">회차</span>
                <span className="font-normal">{data.roundText}</span>
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

        <div className="px-4 py-6 border-t border-gray-800 pb-20">
          <button
            className={`flex items-center gap-2 text-base transition-opacity ${noticeEnabled ? "hover:opacity-80" : "opacity-50 cursor-not-allowed"}`}
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
