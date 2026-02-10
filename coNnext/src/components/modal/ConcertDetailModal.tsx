
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type ConcertData = {
  title: string;
  artist: string;
  place: string;
  date: string;
  time: string;
  seat: string;
  poster: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  data: ConcertData;
};

export default function ConcertDetailModal({ open, onClose, data }: Props) {
  console.log("MODAL DATA >>>", data);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
          >
            <div
              className="relative w-full max-w-[340px] aspect-[289/468] rounded-[24px] overflow-hidden shadow-2xl"
            >
              {/* Background Poster */}
              <img
                src={data.poster}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 text-white"
              >
                <X size={22} />
              </button>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-5 text-white">

                {/* Title */}
                <div className="mb-3">
                  <h2 className="text-[18px] font-bold leading-tight">
                    {data.title}
                  </h2>
                  <p className="text-[13px] text-white/80">
                    {data.artist}
                  </p>
                </div>

                {/* Info */}
                <div className="space-y-3 text-sm mb-4">

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

                {/* Buttons */}
                <div className="flex flex-col gap-2">
                  <button className="w-full py-2 rounded-xl bg-white/20 text-sm font-semibold backdrop-blur">
                    정보 더보기
                  </button>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl bg-[#7B5CFF] text-sm font-semibold">
                      메이트 찾기
                    </button>
                    <button className="flex-1 py-2 rounded-xl bg-white/20 text-sm font-semibold backdrop-blur">
                      지도보기
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
}
