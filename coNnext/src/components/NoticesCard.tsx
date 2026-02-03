import { useState, useRef, useEffect } from "react";
import ConNext from "../assets/logo/Con-next.svg";

interface NoticeCardProps {
  type: string;
  title: string;
  content: string;
  time: string;
}

const NoticeCard = ({ type, title, content, time }: NoticeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // 실제 높이가 line-clamp-2 높이보다 크면 더보기 버튼 표시
      const isOverflowing =
        contentRef.current.scrollHeight > contentRef.current.clientHeight;
      setShowMoreButton(isOverflowing);
    }
  }, [content]);

  return (
    <div className="  p-2">
      <div className="flex gap-3">
        {/* 아이콘 */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#101010] to-[#4D379C] flex items-center justify-center">
          <img src={ConNext} alt="알림 로고" className="w-6 h-6" />
        </div>

        {/* 텍스트 */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">{type}</span>
            <span className="text-xs text-gray-400">{time}</span>
          </div>

          <h3 className="mt-1 font-semibold text-white">{title}</h3>
          <p
            ref={contentRef}
            className={`mt-1 text-sm text-gray-400 ${isExpanded ? "" : "line-clamp-2"}`}
          >
            {content}
          </p>
        </div>
      </div>

      {/* 더보기 버튼 - 오른쪽 정렬 */}
      {showMoreButton && (
        <div className="flex justify-end">
          <button
            className="mt-3 flex items-center gap-1 text-gray-400 text-xs hover:text-gray-300 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>{isExpanded ? "접기" : "더보기"}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default NoticeCard;
