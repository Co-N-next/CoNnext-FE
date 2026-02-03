import NoticeCard from "../../components/NoticesCard";
import { useState } from "react";

const notices = [
  {
    id: 6,
    type: "리뉴얼 안내",
    title: "버전 3.0 업데이트 안내",
    summary:
      "앱 리뉴얼로 인해 일부 서비스 이용이 제한되거나 내용 변경이 있을 수 있습니다. 이용에 불편을 드려 죄송합니다. 더나은 서비스 제공을 위해 최선을 다하겠습니다.",
    time: "1시간 전",
  },
  {
    id: 5,
    type: "리뉴얼 안내",
    title: "버전 2.0 업데이트 안내",
    summary:
      "앱 리뉴얼로 인해 일부 서비스 이용이 제한되거나 내용 변경이 있을 수 있습니다. 이용에 불편을 드려 죄송합니다. 더나은 서비스 제공을 위해 최선을 다하겠습니다.",
    time: "1시간 전",
  },
  {
    id: 4,
    type: "리뉴얼 안내",
    title: "버전 1.0 업데이트 안내",
    summary:
      "앱 리뉴얼로 인해 일부 서비스 이용이 제한되거나 내용 변경이 있을 수 있습니다. 이용에 불편을 드려 죄송합니다. 더나은 서비스 제공을 위해 최선을 다하겠습니다.",
    time: "1시간 전",
  },
  {
    id: 3,
    type: "시스템 점검",
    title: "정기 점검 안내",
    summary: "서비스 안정화를 위한 정기 점검이 진행될 예정입니다.",
    time: "2일 전",
  },
  {
    id: 2,
    type: "서비스 안내",
    title: "신규 기능 추가 안내",
    summary: "새로운 기능이 추가되었습니다. 많은 이용 부탁드립니다.",
    time: "1주일 전",
  },
  {
    id: 1,
    type: "이벤트",
    title: "오픈 기념 이벤트",
    summary: "CoNnext 오픈을 기념하여 특별 이벤트를 진행합니다.",
    time: "2주일 전",
  },
];

const Notices = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const isExpanded = visibleCount >= notices.length;

  const handleToggle = () => {
    if (isExpanded) {
      setVisibleCount(3);
    } else {
      setVisibleCount((prev) => prev + 3);
    }
  };

  return (
    <div className="pb-6">
      <section className="space-y-4">
        {notices.slice(0, visibleCount).map((notice) => (
          <NoticeCard
            key={notice.id}
            type={notice.type}
            title={notice.title}
            content={notice.summary}
            time={notice.time}
          />
        ))}
      </section>

      <button
        className="mt-6 flex items-center justify-center gap-2 w-full text-gray-400 text-sm hover:text-gray-300 transition-colors"
        onClick={handleToggle}
      >
        {/* 화살표 + 텍스트 래퍼 */}
        <span className="flex items-center gap-2">
          {/* 화살표 (24x24) */}
          <span
            className={`w-6 h-6 flex items-center justify-center transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <span className="w-3 h-3 border-b-2 border-r-2 border-current rotate-45 translate-y-[-2px]" />
          </span>

          {/* 텍스트 */}
          <span className="font-pretendard text-[16px] font-medium leading-[120%] tracking-[0]">
            {isExpanded ? "닫기" : "더보기"}
          </span>
        </span>
      </button>
    </div>
  );
};

export default Notices;
