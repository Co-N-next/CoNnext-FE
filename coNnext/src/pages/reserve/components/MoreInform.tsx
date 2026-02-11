import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { fetchConcertInfo } from "../../../api/concert";

interface ConcertDetail {
  id: string;
  title: string;
  artist: string;
  posterUrl: string;
  bgUrl: string;
  date: string;
  venue: string;
  rating: string;
  duration: string;
  noticeUrl?: string;
}

const MoreInform = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const concertId = location.state?.concertId;

  const [concertInfo, setConcertInfo] = useState<ConcertDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!concertId) {
        alert("잘못된 접근입니다.");
        navigate(-1);
        return;
      }

      try {
        setIsLoading(true);
        const data = await fetchConcertInfo(String(concertId));

        setConcertInfo({
          id: String(data.id),
          title: data.title,
          artist: data.artist || "아티스트 정보 없음",
          posterUrl: data.imageUrl,
          bgUrl: data.imageUrl,
          date: [data.date, data.time].filter(Boolean).join(" ") || "일시 미정",
          venue: data.venue || "장소 미정",
          rating: "전체관람가",
          duration: "시간 미정",
          noticeUrl: "",
        });
      } catch (error) {
        console.error("공연 상세 정보 로딩 실패:", error);
        alert("정보를 불러오지 못했습니다.");
        navigate(-1);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [concertId, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07132D] text-white flex items-center justify-center">
        로딩중...
      </div>
    );
  }

  if (!concertInfo) return null;

  return (
    <div className="min-h-screen bg-[#07132D] text-white pb-10">
      <div className="relative h-[400px]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={concertInfo.bgUrl}
            alt="background"
            className="w-full h-full object-cover opacity-50 rounded-t-[8px] blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#07132D]/40 to-[#07132D]" />
        </div>

        <div className="relative z-10 px-[30px] pt-12">
          <button onClick={() => navigate(-1)} className="mb-6">
            <ChevronLeft size={24} className="text-[#FEFEFE] text-normal" />
          </button>

          <div className="flex flex-col gap-6">
            <div className="w-[100px] h-[144px] rounded-[10px] overflow-hidden shadow-2xl shrink-0">
              <img
                src={concertInfo.posterUrl}
                alt="Poster"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-[18px] font-bold leading-tight mb-2">
                {concertInfo.title}
              </h1>
              <p className="text-[14px] text-gray-300 mb-6">{concertInfo.artist}</p>

              <div className="space-y-2 text-[13px]">
                <div className="flex">
                  <span className="w-16 text-gray-400 shrink-0">일시</span>
                  <div className="flex flex-col text-[#FEFEFE]">
                    <span>{concertInfo.date}</span>
                  </div>
                </div>
                <div className="flex">
                  <span className="w-16 text-gray-400 shrink-0">장소</span>
                  <span className="text-[#FEFEFE]">{concertInfo.venue}</span>
                </div>
                <div className="flex">
                  <span className="w-16 text-gray-400 shrink-0">관람등급</span>
                  <span className="text-[#FEFEFE]">{concertInfo.rating}</span>
                </div>
                <div className="flex">
                  <span className="w-16 text-gray-400 shrink-0">관람시간</span>
                  <span className="text-[#FEFEFE]">{concertInfo.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-8 mt-4 relative z-20">
        <section>
          <h2 className="text-[16px] font-normal mb-3">공연장 정보</h2>
          <div className="rounded-[12px] overflow-hidden border border-white/10 bg-[#16203A]">
            <div className="h-[140px] relative">
              <img
                src={concertInfo.bgUrl}
                alt={concertInfo.venue}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="p-4">
              <h3 className="text-[16px] font-medium text-white">{concertInfo.venue}</h3>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[16px] font-bold mb-3">아티스트 정보</h2>
          <div className="flex flex-col items-center w-fit">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-gray-700 border-2 border-white/10">
              <img
                src={concertInfo.posterUrl}
                alt={concertInfo.artist}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[14px] font-medium text-white text-center">{concertInfo.artist}</p>
          </div>
        </section>

        {concertInfo.noticeUrl && (
          <section className="pt-2">
            <a
              href={concertInfo.noticeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[16px] font-medium text-white hover:text-gray-300 transition"
            >
              공지사항 전체 보기 <ExternalLink size={16} />
            </a>
          </section>
        )}
      </div>
    </div>
  );
};

export default MoreInform;
