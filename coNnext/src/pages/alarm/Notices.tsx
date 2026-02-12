import NoticeCard from "../../components/NoticesCard";
import { useState } from "react";
import { useNotices } from "../../hooks/queries/notifications/useNotices";
import type { Notice } from "../../types/notifications";

/* ================= 유틸 ================= */
function getRelativeTime(createdAt: string) {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now.getTime() - created.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "방금 전";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays <= 7) return `${diffDays}일 전`;
  if (diffDays <= 14) return "1주일 전";
  return `${Math.floor(diffDays / 7)}주일 전`;
}

const INITIAL_COUNT = 3;

const Notices = () => {
  const { data, isLoading } = useNotices(0);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const MAX_COUNT = 6;

  const noticeList = data?.payload.notices ?? [];
  const isExpanded = visibleCount >= MAX_COUNT;

  const handleToggle = () => {
    if (isExpanded) {
      setVisibleCount(INITIAL_COUNT);
    } else {
      setVisibleCount(MAX_COUNT);
    }
  };

  if (isLoading) {
    return <div className="mx-4 mt-4 text-gray-400">불러오는 중...</div>;
  }

  if (noticeList.length === 0) {
    return <div className="mx-4 mt-4 text-gray-400">공지사항이 없어요</div>;
  }

  return (
    <div className="pb-6">
      <section className="space-y-4">
        {noticeList.slice(0, visibleCount).map((notice: Notice) => (
          <NoticeCard
            key={notice.id}
            type={notice.title.split("]")[0]?.replace("[", "") || "공지"}
            title={notice.title}
            content={notice.content}
            time={getRelativeTime(notice.createdAt)}
          />
        ))}
      </section>

      {noticeList.length > INITIAL_COUNT && (
        <button
          className="mt-6 flex items-center justify-center gap-2 w-full text-gray-400 text-sm hover:text-gray-300 transition-colors"
          onClick={handleToggle}
        >
          <span className="flex items-center gap-2">
            <span
              className={`w-6 h-6 flex items-center justify-center transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              <span className="w-3 h-3 border-b-2 border-r-2 border-current rotate-45 translate-y-[-2px]" />
            </span>
            <span className="font-pretendard text-[16px] font-medium leading-[120%] tracking-[0]">
              {isExpanded ? "줄이기" : "더보기"}
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

export default Notices;
