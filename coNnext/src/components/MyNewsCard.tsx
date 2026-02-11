import Location from "../assets/logo/Location.svg";
import Friend from "../assets/logo/Friend.svg";
import type { Notification } from "../types/notifications";
import { useAcceptLocation } from "../hooks/mutations/useAcceptLocation ";

interface MyNewsCardProps {
  notification: Notification;
  currentUserId: number; // 로그인 유저 id
}

const MyNewsCard = ({ notification, currentUserId }: MyNewsCardProps) => {
  const { mutate } = useAcceptLocation();

  const {
    sender_id,
    sender_profile_img,
    title,
    createdAt,
    category,
    action_status,
  } = notification;

  const isPending = action_status === "PENDING";

  const actionText = category === "LOCATION" ? "위치 공유 요청" : "친구 요청";

  const contentText =
    action_status === "PENDING"
      ? `${title}님이 ${actionText}을 보냈습니다.`
      : action_status === "ACCEPTED"
        ? `${title}님의 ${actionText}이 수락되었습니다.`
        : `${title}님의 ${actionText}이 거절되었습니다.`;

  const badgeBg =
    action_status === "ACCEPTED"
      ? "bg-[#9576FF]"
      : action_status === "REJECTED"
        ? "bg-[#414141]"
        : "bg-[#7f5aff]";

  const cardBg = isPending ? "bg-[#293A5D]" : "bg-[#0E172A]";

  const handleAccept = () => {
    mutate({
      user_id: currentUserId,
      sender_id: sender_id,
    });
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
              src={sender_profile_img}
              alt="profile"
              className={`rounded-full object-cover transition-all duration-300
                ${isPending ? "h-24 w-24" : "h-16 w-16"}`}
            />

            <div
              className={`absolute bottom-0 right-0 translate-x-[15%] translate-y-[15%]
                flex items-center justify-center rounded-full transition-all duration-300
                ${badgeBg}
                ${isPending ? "h-8 w-8" : "h-6 w-6"}`}
            >
              <img
                src={category === "LOCATION" ? Location : Friend}
                alt=""
                className={`${isPending ? "h-5 w-5" : "h-4 w-4"}`}
              />
            </div>
          </div>

          {/* 텍스트 */}
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-400">
                {category === "LOCATION" ? "위치 공유" : "친구"}
              </span>
              <span className="text-[11px] text-gray-400">{createdAt}</span>
            </div>

            <p className="mt-2 text-[13px] text-white">{contentText}</p>

            {isPending && (
              <div className="mt-5 flex gap-2">
                <button
                  onClick={handleAccept}
                  className="rounded-full bg-[#7f5aff] px-6 py-2.5 text-xs font-medium text-white"
                >
                  수락
                </button>
                <button className="rounded-full bg-[#1F2A44] px-6 py-2.5 text-xs text-gray-300">
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
