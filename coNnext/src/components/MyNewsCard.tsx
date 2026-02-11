import Location from "../assets/logo/EyeOn.svg";
import Friend from "../assets/logo/EyeOff.svg";
import { useState } from "react";

type NewsType = "LOCATION" | "FRIEND";
type Status = "PENDING" | "ACCEPTED" | "REJECTED";

interface MyNewsCardProps {
  profileImg: string;
  name: string;
  type: NewsType;
  time: string;
}

const MyNewsCard = ({ profileImg, name, type, time }: MyNewsCardProps) => {
  const [status, setStatus] = useState<Status>("PENDING");

  const isPending = status === "PENDING";

  const title = type === "LOCATION" ? "위치 공유" : "친구";
  const actionText = type === "LOCATION" ? "위치 공유 요청" : "친구 요청";

  const contentText =
    status === "PENDING"
      ? `${name}님이 ${actionText}을 보냈습니다.`
      : status === "ACCEPTED"
        ? `${name}님의 ${actionText}이 수락되었습니다.`
        : `${name}님의 ${actionText}이 거절되었습니다.`;

  const badgeBg =
    status === "ACCEPTED"
      ? "bg-[#9576FF]"
      : status === "REJECTED"
        ? "bg-[#414141]"
        : "bg-[#7f5aff]";

  const cardBg = isPending ? "bg-[#293A5D]" : "bg-[#0E172A]";

  return (
    <div
      className={`${cardBg} -mx-4 px-4 transition-all duration-300
        ${isPending ? "py-4" : "py-3"}
      `}
    >
      <div className="px-4">
        <div className="flex gap-3">
          {/* 프로필 */}
          <div className="relative shrink-0">
            <img
              src={profileImg}
              alt="profile"
              className={`rounded-full object-cover transition-all duration-300
                ${isPending ? "h-24 w-24" : "h-16 w-16"}
              `}
            />

            {/* 타입 뱃지 */}
            <div
              className={`absolute bottom-0 right-0 translate-x-[15%] translate-y-[15%]
                flex items-center justify-center rounded-full transition-all duration-300
                ${badgeBg}
                ${isPending ? "h-8 w-8" : "h-6 w-6"}
              `}
            >
              <img
                src={type === "LOCATION" ? Location : Friend}
                alt=""
                className={`${isPending ? "h-5 w-5" : "h-4 w-4"}`}
              />
            </div>
          </div>

          {/* 텍스트 영역 */}
          <div
            className={`flex-1 transition-all duration-300
              ${isPending ? "mt-0" : "mt-1"}
            `}
          >
            {/* 상단 */}
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-normal leading-[1.3] tracking-[-0.025em] text-gray-400">
                {title}
              </span>
              <span className="text-[11px] text-gray-400 whitespace-nowrap">
                {time}
              </span>
            </div>

            {/* 메인 메시지 */}
            <p
              className={`text-white transition-all duration-300
                ${isPending ? "mt-1 text-[13px]" : "mt-2 text-[13px]"}
              `}
            >
              {contentText}
            </p>

            {/* 수락 / 거절 */}
            {isPending && (
              <div className="mt-5 flex gap-2 transition-all duration-300">
                <button
                  onClick={() => setStatus("ACCEPTED")}
                  className="rounded-full bg-[#7f5aff] px-6 py-2.5 text-xs font-medium text-white"
                >
                  수락
                </button>
                <button
                  onClick={() => setStatus("REJECTED")}
                  className="rounded-full bg-[#1F2A44] px-6 py-2.5 text-xs text-gray-300"
                >
                  거절
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNewsCard;