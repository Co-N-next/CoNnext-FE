import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ConcertData } from "../../types/concert";
import { resolveVenueId } from "../../utils/venueNavigation";

type Props = {
  open: boolean;
  onClose: () => void;
  data: ConcertData;
};

const ConcertDetailModal: React.FC<Props> = ({ open, onClose, data }) => {
  const navigate = useNavigate();
  const detailTargetId = data.detailId ?? data.concertId;

  const handleViewMap = async () => {
    const venueId = await resolveVenueId(data.place, data.venueId);
    if (!venueId) {
      window.alert("공연장 지도를 찾을 수 없습니다.");
      return;
    }
    navigate(`/map/${venueId}`);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
          >
            <div className="relative w-[289px] h-[468px] rounded-[24px] overflow-hidden shadow-2xl">
              <img
                src={data.poster}
                alt={data.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

              <button onClick={onClose} className="absolute top-3 right-3 z-20 text-white">
                <X size={22} />
              </button>

              <div className="relative z-10 h-full flex flex-col justify-end p-5 text-white">
                <div className="mb-4">
                  <h2
                    className="py-25 text-[18px] font-bold leading-tight"
                    style={{ fontFamily: "YdestreetB" }}
                  >
                    {data.title}
                  </h2>
                  <p
                    className="text-[13px] text-white/80"
                    style={{ fontFamily: "YdestreetL" }}
                  >
                    {data.artist}
                  </p>
                </div>

                <div
                  className="absolute top-50 space-y-1.5 text-sm mb-3"
                  style={{ fontFamily: "PretendardMedium" }}
                >
                  <div>
                    <p className="text-white/60 text-[11px]">장소</p>
                    <p className="font-semibold">{data.place}</p>
                  </div>

                  <div>
                    <p className="text-white/60 text-[11px]">시간</p>
                    <p className="font-semibold">
                      {data.date} {data.time}
                    </p>
                  </div>

                  <div>
                    <p className="text-white/60 text-[11px]">좌석</p>
                    <p className="font-semibold">{data.seat}</p>
                  </div>
                </div>

                <div className="py-10 flex flex-col gap-2">
                  <button
                    className="w-full py-2 rounded-xl bg-white/20 text-sm font-medium backdrop-blur"
                    style={{ fontFamily: "PretendardMedium" }}
                    onClick={() => {
                      if (!detailTargetId) {
                        window.alert("상세 정보를 확인할 공연 ID가 없습니다.");
                        return;
                      }
                      navigate(`/concert/${detailTargetId}`);
                    }}
                  >
                    정보 더보기
                  </button>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2 rounded-xl bg-[#7B5CFF] text-sm font-medium"
                      style={{ fontFamily: "PretendardMedium" }}
                      onClick={() => navigate("/mate/map")}
                    >
                      메이트 찾기
                    </button>
                    <button
                      className="flex-1 py-2 rounded-xl bg-[#7B5CFF] text-sm font-medium backdrop-blur"
                      style={{ fontFamily: "PretendardMedium" }}
                      onClick={() => void handleViewMap()}
                    >
                      지도 보기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConcertDetailModal;
