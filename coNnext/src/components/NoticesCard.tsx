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
    <div className="p-2 overflow-hidden">
      {" "}
      {/* float 해제를 위해 overflow-hidden 추가 */}
      {/* 1. 아이콘: float를 사용하여 글자가 왼쪽으로 파고들 수 있게 함 */}
      <div className="float-left mr-3 mb-1 w-12 h-12 rounded-full bg-gradient-to-br from-[#101010] to-[#4D379C] flex items-center justify-center">
        <img src={ConNext} alt="알림 로고" className="w-6 h-6" />
      </div>
      {/* 2. 상단 정보 (타입, 시간): 아이콘 옆에 위치 */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-300">{type}</span>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
      {/* 3. 제목: 아이콘 옆에서 시작 */}
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      {/* 4. 본문: float된 아이콘 덕분에 로고 아래쪽 공간으로 글자가 파고듦 */}
      <p
        ref={contentRef}
        className={`text-sm text-gray-400 leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}
      >
        {content}
      </p>
      {/* 더보기 버튼 */}
      {showMoreButton && (
        <div className="flex justify-end clear-both">
          {" "}
          {/* float 영향 제거를 위해 clear-both 추가 */}
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