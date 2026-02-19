import Location from "../assets/logo/Location.svg";
import Friend from "../assets/logo/Friend.svg";
import type {
  NotificationActionType,
  NotificationActionStatus,
} from "../types/notifications";


import { postShareMate, postShareLocation } from "../api/notifications";
import { useState } from "react";
type NewsType = "LOCATION" | "FRIEND";

interface MyNewsCardProps {
    id: number; // 🔥 추가

  profileImg: string;
  content: string;
  type: NewsType;
  time: string;
  actionType: NotificationActionType;
  status: NotificationActionStatus;
    read: boolean;  // ✅ 추가

}

const MyNewsCard = ({
  id,
  profileImg,
  content,
  type,
  time,
  actionType,
  status,
  read,   // ✅ 여기 추가
}: MyNewsCardProps) => {
  // ACCEPT_REJECT 타입만 카드 렌더
if (actionType !== "ACCEPT_REJECT") {
  return null;
}

const [localStatus, setLocalStatus] = useState(status);
const isPending = localStatus === "PENDING";

  const title = type === "LOCATION" ? "위치 공유" : "친구";
  // const actionText = type === "LOCATION" ? "위치 공유 요청" : "친구 요청";

  

  // ✅ content 기본값 유지
let contentText = content ?? "";

if (localStatus === "ACCEPTED") {
  contentText =
    type === "LOCATION"
      ? "위치 공유 요청이 수락되었습니다."
      : "친구 요청이 수락되었습니다.";
} else if (localStatus === "REJECTED") {
  contentText =
    type === "LOCATION"
      ? "위치 공유 요청이 거절되었습니다."
      : "친구 요청이 거절되었습니다.";
}

 const badgeBg =
  localStatus === "ACCEPTED"
    ? "bg-[#9576FF]"
    : localStatus === "REJECTED"
    ? "bg-[#414141]"
    : "bg-[#7f5aff]";

  const cardBg = isPending ? "bg-[#293A5D]" : "bg-[#0E172A]";

 const handleAccept = async () => {
  try {
    if (type === "FRIEND") {
      await postShareMate({ notificationId: id });
    } else if (type === "LOCATION") {
      await postShareLocation({ notificationId: id });
    }

    setLocalStatus("ACCEPTED");
  } catch (e) {
    console.error(e);
  }
};

const handleReject = () => {
  setLocalStatus("REJECTED");
};

  return (
    <div
      className={`${cardBg} -mx-4 px-4 transition-all duration-300
        ${isPending ? "py-4" : "py-3"}`}
    >
      <div className="px-4">
        <div className="flex gap-3">
          {/* 프로필 */}
          <div className="relative shrink-0">
            <img
              src={
                profileImg ||
                "https://i.namu.wiki/i/coaGyXmbX_-iJhY6vWDvO510yViZLni2ocXsd3Asd7ZL68JcMHS4tnd4EWNi4DchSf9btppXgHrFNhvsVDa-Lg.webp"
              }
              alt="profile"
              className={`rounded-full object-cover transition-all duration-300
                ${isPending ? "h-24 w-24" : "h-16 w-16"}`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://i.namu.wiki/i/coaGyXmbX_-iJhY6vWDvO510yViZLni2ocXsd3Asd7ZL68JcMHS4tnd4EWNi4DchSf9btppXgHrFNhvsVDa-Lg.webp";
              }}
            />

            {/* 타입 뱃지 */}
            <div
              className={`absolute bottom-0 right-0 translate-x-[15%] translate-y-[15%]
                flex items-center justify-center rounded-full transition-all duration-300
                ${badgeBg}
                ${isPending ? "h-8 w-8" : "h-6 w-6"}`}
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
              ${isPending ? "mt-0" : "mt-1"}`}
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-normal leading-[1.3] tracking-[-0.025em] text-gray-400">
                {title}
              </span>
              <span className="text-[11px] text-gray-400 whitespace-nowrap">
                {time}
              </span>
            </div>

            <p
              className={`text-white transition-all duration-300
                ${isPending ? "mt-1 text-[13px]" : "mt-2 text-[13px]"}`}
            >
              {contentText}
            </p>

            {isPending && !read && (
  <div className="mt-5 flex gap-2 transition-all duration-300">
    <button
      onClick={handleAccept}
      className="rounded-full bg-[#7f5aff] px-6 py-2.5 text-xs font-medium text-white"
    >
      수락
    </button>
    <button
      onClick={handleReject}
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