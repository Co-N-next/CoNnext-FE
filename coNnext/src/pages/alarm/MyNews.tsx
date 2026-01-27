import { Share2 } from "lucide-react"; //커밋

// mockTodayConcert.ts (같은 파일이어도 OK)
export const mockTodayConcert = {
  id: 1,
  type: "CONCERT" as const,
  concertTitle: "불빨간사춘기 첫 팬미팅 [Wild and Free]",
  concertDate: new Date().toISOString().slice(0, 10), //목데이터 항상 오늘날짜로
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

export default function TodayConcertBanner() {
  if (!isToday(mockTodayConcert.concertDate))
    return (
      <div className="mx-4 mt-4 text-gray-400">오늘 예정된 공연이 없어요</div>
    );

  return (
    <>
      <div className="mx-4">
        <section
          className="
        relative mx-4 mt-4
        w-[calc(100%-2rem)]
        aspect-[16/9]
        min-h-[180px] max-h-[260px]
        overflow-hidden rounded-2xl

      "
        >
          {/* 이미지 */}
          <img
            src={mockTodayConcert.imageUrl}
            alt={mockTodayConcert.concertTitle}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          {/* 그라데이션 */}

          <div className="absolute inset-0 bg-black/50" />

          {/* ⬆️ 우측 상단 공유 버튼 (추가) */}
          <button
            onClick={() => {
              console.log("공유 클릭");
            }}
            className="
    absolute top-4 right-4 z-20
    flex h-9 w-9 items-center justify-center
    rounded-full
    hover:bg-black/20
    transition-colors
    border border-white

  "
          >
            <Share2 size={18} className="text-white" />
          </button>
          <div className="absolute inset-0 z-10 pl-8">
            {/* 상단 라벨 */}
            <h1
              style={{ fontFamily: "YdeStreetB" }}
              className="absolute top-4 left-4 z-10 text-xl text-white"
            >
              오늘의 공연이에요!
            </h1>

            {/* 하단 텍스트 */}
            <div className="absolute bottom-4 left-4 right-4 z-10 text-gray-200 text-sm">
              <h2
                style={{ fontFamily: "Pretendard" }}
                className="text-base font-bold  "
              >
                {mockTodayConcert.concertTitle}
              </h2>
              <p style={{ fontFamily: "Pretendard" }} className="mt-1 ">
                오늘 {formatConcertTime(mockTodayConcert.concertTime)}에 공연이
                예매 되어 있어요!
                <br />
                {mockTodayConcert.place}으로 떠나요!
              </p>
            </div>
          </div>
        </section>

        <button
          onClick={() => window.open(mockTodayConcert.mapLink)}
          className="
        mx-4 mt-3
        w-[calc(100%-2rem)]
        rounded-xl     bg-[#7f5aff]

        py-2 text-sm font-semibold text-white
      "
        >
          지도 바로가기
        </button>
      </div>
    </>
  );
}
