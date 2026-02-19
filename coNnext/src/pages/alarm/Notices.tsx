import NoticeCard from "../../components/NoticesCard";
import { useState } from "react";
import { useNotices } from "../../hooks/queries/notifications/useNotices";
import type { Notice } from "../../types/notifications";

const INITIAL_COUNT = 3;
const MAX_COUNT = 6;

const Notices = () => {
  const { data, isLoading } = useNotices(0);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const noticeList = data?.payload.notices ?? [];
  const isExpanded = visibleCount >= MAX_COUNT;

  const handleToggle = () => {
    setVisibleCount(isExpanded ? INITIAL_COUNT : MAX_COUNT);
  };

  if (isLoading) {
    return <div className="mx-4 mt-4 text-gray-400">Loading...</div>;
  }

  if (noticeList.length === 0) {
    return <div className="mx-4 mt-4 text-gray-400">No notices.</div>;
  }

  return (
    <div className="pb-6">
      <section className="space-y-4">
        {noticeList.slice(0, visibleCount).map((notice: Notice) => (
          <NoticeCard key={notice.id} notice={notice} />
        ))}
      </section>

      {noticeList.length > INITIAL_COUNT && (
        <button
          className="mt-6 flex w-full items-center justify-center gap-2 text-sm text-gray-400 transition-colors hover:text-gray-300"
          onClick={handleToggle}
        >
          <span className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              <span className="h-3 w-3 translate-y-[-2px] rotate-45 border-b-2 border-r-2 border-current" />
            </span>
            <span className="font-pretendard text-[16px] font-medium leading-[120%] tracking-[0]">
              {isExpanded ? "Show less" : "Show more"}
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

export default Notices;
