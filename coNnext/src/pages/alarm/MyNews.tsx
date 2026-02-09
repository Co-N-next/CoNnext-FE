import { Share2 } from "lucide-react";
import { useState } from "react";
import MyNewsCard from "../../components/MyNewsCard";

/* ================= 더미 데이터 ================= */
export const mockTodayConcert = {
  id: 1,
  type: "CONCERT" as const,
  concertTitle: "불빨간사춘기 첫 팬미팅 [Wild and Free]",
  concertDate: new Date().toISOString().slice(0, 10),
  place: "KSPO DOME",
  seatnumber: {
    floor: 1,
    section: "A",
    row: 3,
    seat: 2,
  },
  concertTime: "18:31",
  imageUrl:
    "https://ticketimage.interpark.com/Play/image/large/25/25015843_p.gif",
  mapLink: "https://map.naver.com",
};

const newsList = [
  {
    id: 1,
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMj2bBcTXs6SlM7nHeA6W9obR-bgneSj_UCp6__zSkhHYQmrzLHjjbxkflD3xS-Lc8a6oOua9kMxslsue_JFiWOipDIF0KGM_-lJleKg&s=10",
    name: "구용미",
    type: "LOCATION" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30분 전
  },
  {
    id: 2,
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRs-9NRaCfycNXjgS3jRPSM6a4qwz8xbk5VZrkshVvqlHR6k3rCDfdUNOhwEC8IcyP84EVAyM-iSk_E9BpoiWN-GOOtSWasM5YQxMzO8E&s=10",
    name: "미피",
    type: "FRIEND" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2시간 전
  },
  {
    id: 3,
    profileImg: "/images/miffy.png",
    name: "콘서트홀 A",
    type: "LOCATION" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2일 전
  },
  {
    id: 4,
    profileImg: "/images/miffy.png",
    name: "토끼왕",
    type: "FRIEND" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5일 전
  },
  {
    id: 5,
    profileImg: "/images/miffy.png",
    name: "하얀미피",
    type: "FRIEND" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7일 전
  },
];

/* ================= 유틸 ================= */
const isToday = (date: string) => {
  const today = new Date().toISOString().slice(0, 10);
  return date === today;
};

function formatConcertTime(time: string) {
  const [hourStr, minuteStr] = time.split(":");
  const hour = Number(hourStr);
  const minute = Number(minuteStr);

  const period = hour < 12 ? "오전" : "오후";
  const displayHour = hour > 12 ? hour - 12 : hour;
  const minuteText = minute === 0 ? "" : ` ${minute}분`;

  return `${period} ${displayHour}시${minuteText}`;
}

function getTimeInfo(createdAt: string) {
  const now = new Date();
  const created = new Date(createdAt);

  const diffMs = now.getTime() - created.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // ✅ 오늘 (24시간 이내)
  if (diffHours < 24) {
    if (diffMinutes < 1)
      return { section: "TODAY" as const, timeText: "방금 전" };
    if (diffMinutes < 60)
      return {
        section: "TODAY" as const,
        timeText: `${diffMinutes}분 전`,
      };
    return {
      section: "TODAY" as const,
      timeText: `${diffHours}시간 전`,
    };
  }

  // ✅ 일주일 전 (1일 초과 ~ 7일 이내)
  if (diffDays <= 7) {
    return {
      section: "WEEK_AGO" as const,
      timeText: `${diffDays}일 전`,
    };
  }

  // ❌ 그보다 오래된 건 이번 화면에서는 제외
  return {
    section: "OLD" as const,
    timeText: `${diffDays}일 전`,
  };
}

/* ================= 컴포넌트 ================= */
export default function MyNews() {
  const parsedNews = newsList
    .map((news) => {
      const { section, timeText } = getTimeInfo(news.createdAt);
      return { ...news, section, timeText };
    })
    .filter((news) => news.section !== "OLD");
  const todayList = parsedNews.filter((n) => n.section === "TODAY");
  const weekAgoList = parsedNews.filter((n) => n.section === "WEEK_AGO");

  // ✅ 전체 더보기/닫기
  const allCount = parsedNews.length;
  const INITIAL_COUNT = 3;

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const isExpanded = visibleCount >= allCount;

  const handleToggle = () => {
    setVisibleCount(isExpanded ? INITIAL_COUNT : allCount);
  };

  let renderedCount = 0;
  const canRender = () => {
    if (renderedCount < visibleCount) {
      renderedCount += 1;
      return true;
    }
    return false;
  };

  if (!isToday(mockTodayConcert.concertDate)) {
    return (
      <div className="mx-4 mt-4 text-gray-400">오늘 예정된 공연이 없어요</div>
    );
  }
  const handleShare = async () => {
    console.log("공유 버튼 눌림"); // 👈 이거부터 찍어

    const shareUrl = `${window.location.origin}/concert/${concertId}`;

    if (navigator.share) {
      await navigator.share({
        title: "오늘의 공연 공유하기",
        text: "오늘 이 공연 같이 가요!",
        url: shareUrl,
      });
    } else {
      // PC / 지원 안 되는 환경
      await navigator.clipboard.writeText(shareUrl);
      alert("링크가 복사됐어요!");
    }
  };

  return (
    <>
      {/* ================= 오늘의 공연 ================= */}
      <div className="w-full">
        <section className="relative mx-4 mt-4 aspect-[16/9] overflow-hidden rounded-2xl">
          <img
            src={mockTodayConcert.imageUrl}
            alt={mockTodayConcert.concertTitle}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/50" />

          <button
            onClick={handleShare}
            className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 hover:bg-gray-500"
          >
            <Share2 size={18} className="text-white" />
          </button>
          <h2 className="absolute top-4 left-4 z-20 translate-x-2 translate-y-2 font-ydestreetB text-[20px] leading-[1.2] text-white">
            오늘의 공연이에요!
          </h2>

          <div className="absolute bottom-4 left-4 right-4 text-gray-200 text-sm">
            <h2 className="text-base font-bold">
              {mockTodayConcert.concertTitle}
            </h2>
            <p className="mt-1">
              오늘 {formatConcertTime(mockTodayConcert.concertTime)}에 공연이
              예매 되어 있어요!
              <br />
              {mockTodayConcert.place}으로 떠나요!
            </p>
          </div>
        </section>
        <button
          onClick={() => window.open(mockTodayConcert.mapLink)}
          className="mx-4 mt-3 w-[calc(100%-2rem)] rounded-xl bg-[#7f5aff] py-2 text-sm font-semibold text-white"
        >
          지도 바로가기
        </button>
      </div>

      {/* ================= 오늘 ================= */}
      <section className="w-full mt-6">
        <h2 className="px-4 font-pretendard font-semibold text-[18px] leading-[130%] tracking-[-0.025em] text-gray-300 mb-2">
          오늘
        </h2>
        <div className="flex flex-col">
          {todayList.map(
            (news) =>
              canRender() && (
                <MyNewsCard
                  key={news.id}
                  profileImg={news.profileImg}
                  name={news.name}
                  type={news.type}
                  time={news.timeText}
                />
              ),
          )}
        </div>
      </section>

      {/* ================= 일주일 전 ================= */}
      <section className="w-full mt-6">
        <h2 className="px-4 font-pretendard font-semibold text-[18px] leading-[130%] tracking-[-0.025em] text-gray-300 mb-2">
          일주일 전
        </h2>
        <div className="flex flex-col">
          {weekAgoList.map(
            (news) =>
              canRender() && (
                <MyNewsCard
                  key={news.id}
                  profileImg={news.profileImg}
                  name={news.name}
                  type={news.type}
                  time={news.timeText}
                />
              ),
          )}
        </div>
      </section>

      {/* ================= 전체 더보기 / 닫기 ================= */}
      {allCount > INITIAL_COUNT && (
        <button
          className={`mt-6 flex w-full items-center justify-center gap-2 text-sm text-gray-400 transition-colors hover:text-gray-300 ${
            isExpanded ? "mb-2" : "mb-10"
          }`}
          onClick={handleToggle}
        >
          <span className="mb-10 flex items-center gap-2">
            {/* 화살표 */}
            <span
              className={`flex h-6 w-6 items-center justify-center transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              {/* 기본이 ▼ */}
              <span className="h-3 w-3 translate-y-[-2px] rotate-45 border-b-2 border-r-2 border-current" />
            </span>

            {/* 텍스트 */}
            <span className="font-pretendard text-[16px] font-medium leading-[1.2]">
              {isExpanded ? "줄이기" : "더보기"}
            </span>
          </span>
        </button>
      )}
    </>
  );
}
