import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import {
  getConcertById,
  getConcertDetailById,
  type ConcertDetailPayload,
} from "../../api/concertItem";

const formatDateTime = (isoDate: string) => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default function ConcertInfo() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<ConcertDetailPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) {
        setError("잘못된 접근입니다. id가 없습니다.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const detailResponse = await getConcertDetailById(id);
        setDetail(detailResponse.payload);
      } catch (e: unknown) {
        const status = (e as { response?: { status?: number } })?.response?.status;

        // /concert/:id 에 concertId가 들어오는 경우 fallback 처리
        if (status === 404) {
          try {
            const concertResponse = await getConcertById(id);
            const fallbackDetailId = concertResponse.payload.schedules?.[0]?.detailId;

            if (!fallbackDetailId) {
              setError("해당 공연의 회차 정보를 찾을 수 없습니다.");
              return;
            }

            const retryDetailResponse = await getConcertDetailById(fallbackDetailId);
            setDetail(retryDetailResponse.payload);
            return;
          } catch {
            setError("해당 회차를 찾을 수 없습니다.");
            return;
          }
        }

        setError("공연 상세 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const runningText = useMemo(() => {
    if (!detail) return "-";
    if (!detail.intermission) return `${detail.runningTime}분`;
    return `${detail.runningTime}분 (인터미션 ${detail.intermission}분 포함)`;
  }, [detail]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] text-white flex justify-center">
        <div className="w-full max-w-[450px] px-4 py-8">로딩 중...</div>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] text-white flex justify-center">
        <div className="w-full max-w-[450px] px-4 py-8 space-y-4">
          <p>{error || "공연 정보를 찾을 수 없습니다."}</p>
          <button
            onClick={() => navigate(-1)}
            className="rounded-md bg-[#1e293b] px-4 py-2 hover:opacity-90"
          >
            이전으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <div className="w-full max-w-[450px] mx-auto">
        <div className="relative h-[500px] w-full overflow-hidden">
          <img
            src={detail.posterImage}
            alt={detail.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90" />

          <div className="absolute top-4 left-4">
            <button
              onClick={() => navigate(-1)}
              className="rounded-full bg-black/40 px-3 py-1 text-sm hover:bg-black/60"
            >
              뒤로
            </button>
          </div>

          <div className="absolute bottom-6 left-4 flex flex-col gap-3">
            <div className="w-24 h-32 rounded-lg overflow-hidden border-2 border-white/50 shadow-lg">
              <img
                src={detail.posterImage}
                alt={detail.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold leading-tight text-[18px]">
                {detail.name}
              </h2>

              <div className="flex items-center text-sm text-[13px]">
                <span className="font-medium text-[#A1A1A1] w-20">회차</span>
                <span className="font-normal">{detail.round}회</span>
              </div>

              <div className="flex items-center text-sm text-[13px]">
                <span className="font-medium text-[#A1A1A1] w-20">일시</span>
                <span className="font-normal">{formatDateTime(detail.startAt)}</span>
              </div>

              <div className="flex items-center text-sm text-[13px]">
                <span className="font-medium text-[#A1A1A1] w-20">관람등급</span>
                <span className="font-normal">{detail.ageRating || "-"}</span>
              </div>

              <div className="flex items-center text-sm text-[13px]">
                <span className="font-medium text-[#A1A1A1] w-20">관람시간</span>
                <span className="font-normal">{runningText}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 border-t border-gray-800 pb-20">
          <button
            onClick={() => window.open(detail.noticeUrl, "_blank", "noopener,noreferrer")}
            className="flex items-center gap-2 text-base hover:opacity-80 transition-opacity"
          >
            <span>공지사항 전체 보기</span>
            <ExternalLink size={18} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
