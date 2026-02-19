import NoticeCard from "../../components/NoticesCard";
import { useState } from "react";
import { useNotices } from "../../hooks/queries/notifications/useNotices";

const Notices = () => {
  const { data: noticesData } = useNotices();
  
  // Debugging: 공지사항 데이터 콘솔 출력
  console.log("Notices API Data:", noticesData);
  const notices = noticesData || [];
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
        {notices.length === 0 ? (
          <div className="flex justify-center items-center py-10 text-gray-400 text-sm">
            공지사항이 없습니다.
          </div>
        ) : (
          notices
            .slice(0, visibleCount)
            .map((notice) => <NoticeCard key={notice.id} notice={notice} />)
        )}
      </section>

      {notices.length > 3 && (
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
              {isExpanded ? "줄이기" : "더보기"}
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

export default Notices;
