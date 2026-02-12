import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { fetchConcertInfo } from "../../../api/concert"; // ✅ API 함수 임포트

// 타입 정의 (컴포넌트 내부에서 쓸 데이터 모양)
interface ConcertDetail {
  id: string;
  title: string;
  artist: string;
  posterUrl: string;
  bgUrl: string;       // 백엔드에 없으면 posterUrl 사용
  date: string;        // "2026.02.06(금) 19:00"
  venue: string;
  rating: string;      // "전체관람가"
  duration: string;    // "120분"
  noticeUrl?: string;  // 공지사항 링크
}

const MoreInform = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. 이전 페이지에서 넘겨준 concertId 받기
  // (만약 URL 파라미터 방식이라면 const { id } = useParams() 사용)
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
        const data = await fetchConcertInfo(concertId);

        // 2. API 데이터를 화면용 데이터로 변환
        // (백엔드 응답 필드명에 맞춰서 매핑해주세요)
        setConcertInfo({
          id: String(data.id),
          title: data.name,
          artist: data.artist || data.artistName || "아티스트 정보 없음",
          posterUrl: data.posterImage,
          bgUrl: data.posterImage, // 배경 이미지가 따로 없으면 포스터 사용
          date: data.schedules?.[0]?.startAt?.replace("T", " ").slice(0, 16) || "일시 미정", 
          venue: data.venueName || data.venue || "장소 미정",
          rating: data.ageRating || "전체관람가",
          duration: data.runningTime ? `총 ${data.runningTime}분` : "시간 미정",
          noticeUrl: data.noticeUrl || "",
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
    return <div className="min-h-screen bg-[#07132D] text-white flex items-center justify-center">로딩중...</div>;
  }

  if (!concertInfo) return null;

  return (
    <div className="min-h-screen bg-[#07132D] text-white pb-10">
      {/* Header Section with Background Image */}
      <div className="relative h-[400px]">
        {/* Background Image with Blur/Dark overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={concertInfo.bgUrl}
            alt="background"
            className="w-full h-full object-cover opacity-50 rounded-t-[8px] blur-sm" // blur 효과 살짝 추가하면 더 예쁨
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#07132D]/40 to-[#07132D]" />
        </div>

        {/* Header Content */}
        <div className="relative z-10 px-[30px] pt-12">
          {/* Back Button */}
          <button onClick={() => navigate(-1)} className="mb-6">
            <ChevronLeft size={24} className="text-[#FEFEFE] text-normal" />
          </button>

          {/* Poster & Info Layout */}
          <div className="flex flex-col gap-6">
            {/* Poster Image */}
            <div className="w-[100px] h-[144px] rounded-[10px] overflow-hidden shadow-2xl shrink-0">
              <img
                src={concertInfo.posterUrl}
                alt="Poster"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Artist */}
            <div>
              <h1 className="text-[18px] font-bold leading-tight mb-2">{concertInfo.title}</h1>
              <p className="text-[14px] text-gray-300 mb-6">{concertInfo.artist}</p>

              {/* Detail Grid */}
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

      {/* Content Section */}
      <div className="px-6 space-y-8 mt-4 relative z-20">
        
        {/* Venue Info */}
        <section>
          <h2 className="text-[16px] font-normal mb-3">공연장 정보</h2>
          <div className="rounded-[12px] overflow-hidden border border-white/10 bg-[#16203A]">
            <div className="h-[140px] relative">
              {/* 공연장 이미지가 따로 없다면 포스터나 배경 재사용 */}
              <img 
                src={concertInfo.bgUrl} 
                alt={concertInfo.venue} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="p-4">
               {/* 상세 주소 정보가 있다면 여기에 표시 */}
               <h3 className="text-[16px] font-medium text-white">{concertInfo.venue}</h3>
            </div>
          </div>
        </section>

        {/* Artist Info */}
        <section>
          <h2 className="text-[16px] font-bold mb-3">아티스트 정보</h2>
          <div className="flex flex-col items-center w-fit">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-gray-700 border-2 border-white/10">
              <img src={concertInfo.posterUrl} alt={concertInfo.artist} className="w-full h-full object-cover" />
            </div>
            <p className="text-[14px] font-medium text-white text-center">{concertInfo.artist}</p>
          </div>
        </section>

        {/* Notice Link */}
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