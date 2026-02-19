import { Share2 } from "lucide-react";
import { useState } from "react";
import MyNewsCard from "../../components/MyNewsCard";

// ✅ 추가
import { useMyNotifications } from "../../hooks/queries/notifications/useMyNotificationsnews";
import type { NewsItem } from "../../types/notifications";

// /* ================= 더미 데이터 (유지) ================= */
// export const mockTodayConcert = {
//   id: 1,
//   type: "CONCERT" as const,
//   concertTitle: "불빨간사춘기 첫 팬미팅 [Wild and Free]",
//   concertDate: new Date().toISOString().slice(0, 10),
//   place: "KSPO DOME",
//   seatnumber: {
//     floor: 1,
//     section: "A",
//     row: 3,
//     seat: 2,
//   },
//   concertTime: "18:31",
//   imageUrl:
//     "https://ticketimage.interpark.com/Play/image/large/25/25015843_p.gif",
//   mapLink: "https://map.naver.com",
// };

/* ================= 유틸 ================= */
//경고
// //날짜가 오늘인지 비교
// const isToday = (date: string) => {
//   const today = new Date().toISOString().slice(0, 10);
//   return date === today;
// };


//경고
// //👉 18:30 → 오후 6시 30분 (카드 부분)
// function formatConcertTime(time: string) {
//   const [hourStr, minuteStr] = time.split(":");
//   const hour = Number(hourStr);
//   const minute = Number(minuteStr);

//   const period = hour < 12 ? "오전" : "오후";
//   const displayHour = hour > 12 ? hour - 12 : hour;
//   const minuteText = minute === 0 ? "" : ` ${minute}분`;

//   return `${period} ${displayHour}시${minuteText}`;
// }


//오늘, 일주일전 나누는 로직
function getTimeInfo(createdAt: string) {
  const now = new Date();
  const created = new Date(createdAt);

  const diffMs = now.getTime() - created.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 24) {
    if (diffMinutes < 1)
      return { section: "TODAY" as const, timeText: "방금 전" };
    if (diffMinutes < 60)
      return { section: "TODAY" as const, timeText: `${diffMinutes}분 전` };
    return { section: "TODAY" as const, timeText: `${diffHours}시간 전` };
  }

  if (diffDays <= 7) {
    return { section: "WEEK_AGO" as const, timeText: `${diffDays}일 전` };
  }

  return { section: "OLD" as const, timeText: `${diffDays}일 전` };
}

/* ================= 컴포넌트 ================= */
export default function MyNews() {
  // ✅ 추가

  //API 호출:컴포넌트 렌더되자마자 실행됨.→ /notifications/news?page=0
  const { data, isLoading } = useMyNotifications(0);

  // Debugging: API 데이터 콘솔 출력
  console.log("MyNews API Data:", data);
  console.log("MyNews List:", data?.payload?.payload?.news);

  //뉴스 배열 추출 : 서버 응답 구조가 깊어서실제 news 배열만 꺼냄.
const allNews: NewsItem[] = data?.payload?.payload?.news ?? [];

//오늘 공연 찾기
const todayNotice = allNews.find(
  (n) => n.category === "NOTICE"
);

console.log(todayNotice);
  // 서버 구조 → 프론트 카드 구조로 변환 MyNews.tsx에서 백엔드 데이터를 MyNewsCard 컴포넌트로 전달하기 위해 데이터 변환(매핑) 과정을 거치고 있습니다.
//props로 전달하기위한과정
  const newsList =
    data?.payload.payload.news.map((n: NewsItem) => ({
      id: n.id,
      profileImg: n.senderProfileImg,
      name: n.title,
      type: n.category === "MATE" ? ("FRIEND" as const) : ("LOCATION" as const),
      createdAt: n.createdAt,
      actionType: n.actionType,
      status: n.actionStatus,
      read: n.read,
      content: n.content,   // ✅ 추가

    })) ?? [];
//getTimeInfo로 TODAY / WEEK_AGO 구분 // OLD는 제거
  const parsedNews = newsList
    .map((news) => {
      const { section, timeText } = getTimeInfo(news.createdAt);
      return { ...news, section, timeText };
    })//화면에서 OLD는 안 보여주니까 제거
    .filter((news) => news.section !== "OLD");
//TODAY / WEEK_AGO 분리
  const todayList = parsedNews.filter((n) => n.section === "TODAY");
  const weekAgoList = parsedNews.filter((n) => n.section === "WEEK_AGO");

  //더보기 관련 변수
  const allCount = parsedNews.length;
  const INITIAL_COUNT = 3;

  //초기 3개만 보임
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const isExpanded = visibleCount >= allCount;

  //토클 함수
  const handleToggle = () => {
    setVisibleCount(isExpanded ? INITIAL_COUNT : allCount);
  };

  //렌더 제한 함수: visibleCount까지만 렌더
  let renderedCount = 0;
  const canRender = () => {
    if (renderedCount < visibleCount) {
      renderedCount += 1;
      return true;
    }
    return false;
  };

  // ✅ 추가
  if (isLoading) {
    return <div className="mx-4 mt-4 text-gray-400">불러오는 중...</div>;
  }

  //공유함수
  const handleShare = async () => {
    if (!todayNotice) return;

    const shareUrl = `${window.location.origin}/news/${todayNotice.id}`;

    if (navigator.share) {
      await navigator.share({
        title: todayNotice.title,
        text: todayNotice.content,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("링크가 복사됐어요!");
    }
  };
  const fallbackImage =
  "https://www.esquirekorea.co.kr/resources/online/online_image/2025/08/12/fdd6750c-64b8-4f28-8b21-e2e49291b3f6.jpg";

  return (
    <>
      {/* ================= 오늘의 공연 ================= */}
      <div className="w-full">
        {todayNotice ? (
          <>
            <section className="relative mx-4 mt-4 h-50 overflow-hidden rounded-2xl  p-6 text-white">
              {/* 배경 이미지 */}
<img
  src={todayNotice?.senderProfileImg || fallbackImage}
  onError={(e) => {
    (e.currentTarget as HTMLImageElement).src = fallbackImage;
  }}
  alt="Concert Background"
  referrerPolicy="no-referrer"
  className="absolute inset-0 h-full w-full object-cover opacity-50 z-0"
/>
              {/* 오른쪽 위 공유 버튼 */}
             <button
  onClick={handleShare}
  className="absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 hover:bg-white/20"
>
  <Share2 size={18} />
</button>

              <h2 className="text-lg font-bold mb-15 font-medium">오늘의 공연이에요!</h2>

              <h3
                className="text-base text-white"
                style={{
                  fontFamily: "Pretendard",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "130%",
                  letterSpacing: "0.025em",
                }}
              >
                {todayNotice.title}
              </h3>

 <p
  className="mt-2 text-white"
  style={{
    fontFamily: "Pretendard",
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "130%",
    letterSpacing: "-0.025em",
  }}
>
  {todayNotice.content}
</p>
            </section>

            <button className="mx-4 mt-3 w-[calc(100%-2rem)] rounded-xl bg-[#7f5aff] py-2 text-sm font-semibold text-white">
              지도바로가기
            </button>
          </>
        ) : (
          /* ✅ 데이터가 없을 때 보여줄 UI */
          <section className="mx-4 mt-4 flex h-32 flex-col items-center justify-center rounded-2xl bg-gray-800 text-gray-400">
            <p className="text-sm">오늘 예정된 공연이 없어요</p>
          </section>
        )}
      </div>

      {/* ================= 오늘 ================= */}
      <section className="w-full mt-6">
        <h2 className="px-4 font-pretendard font-semibold text-[18px] text-gray-300 mb-2">
          오늘
        </h2>
        <div className="flex flex-col">
    {todayList.length === 0 ? (
      <div className="px-4 py-6 text-sm text-gray-500">
        오늘 받은 알림이 없어요
      </div>
    ) : (
      todayList.map(
        (news) =>
          canRender() && (
            <MyNewsCard
              id={news.id}
              key={news.id}
              profileImg={news.profileImg}
              type={news.type}
              time={news.timeText}
              actionType={news.actionType}
              content={news.content}   // ✅ 여기 수정

              status={news.status}
                read={news.read}   // ✅ 이거 추가

            />
          ),
      )
    )}
  </div>
      </section>

      {/* ================= 일주일 전 ================= */}
      <section className="w-full mt-6">
        <h2 className="px-4 font-pretendard font-semibold text-[18px] text-gray-300 mb-2">
          일주일 전
        </h2>
     <div className="flex flex-col">
    {weekAgoList.length === 0 ? (
      <div className="px-4 py-6 text-sm text-gray-500">
        지난 일주일간 받은 알림이 없어요
      </div>
    ) : (
      weekAgoList.map(
        (news) =>
          canRender() && (
            <MyNewsCard
  read={news.read}   // ✅ 이거 추가
              id={news.id}
              key={news.id}
              profileImg={news.profileImg}
              content={news.content}   // ✅ 여기 수정
              type={news.type}
              time={news.timeText}
              actionType={news.actionType}
              status={news.status}
            />
          ),
      )
    )}
  </div>
      </section>

      {/* ================= 전체 더보기 / 닫기 ================= */}
      {allCount > INITIAL_COUNT && (
        <button
          className={`mt-6 flex w-full items-center justify-center gap-2 text-sm text-gray-400 ${
            isExpanded ? "mb-2" : "mb-10"
          }`}
          onClick={handleToggle}
        >
          <span className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              <span className="h-3 w-3 rotate-45 border-b-2 border-r-2 border-current" />
            </span>
            <span className="font-pretendard text-[16px] font-medium">
              {isExpanded ? "줄이기" : "더보기"}
            </span>
          </span>
        </button>
      )}
    </>
  );
}
