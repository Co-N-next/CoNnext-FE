import { useRef, useState } from "react";
import { Colors } from "../../styles/tokens/colors";
import Revel from "../../assets/dumy/Revel.svg";

import LocationIcon from "../../assets/Variables/location_off.svg";
import LocationOnIcon from "../../assets/Variables/location_on.svg";
import ArrowIcon from "../../assets/Variables/arrow.svg";

type LocationStep = "myLocation" | "destination" | "ready";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function BottomSheet({ open, onClose }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null);

  /* 모드 */
  const [mode, setMode] = useState<"info" | "locationMap">("info");

  /* 위치 단계 */
  const [step, setStep] = useState<LocationStep>("myLocation");
  const FOOTER_HEIGHT = 70;
  const SHEET_HEIGHT = 327;

 
  return (
    <>
      {/* Dim */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      <div
        ref={sheetRef}
        className="absolute left-0 right-0 z-50 bg-[#0B1220] rounded-t-3xl shadow-xl"
        style={{
          bottom: FOOTER_HEIGHT,
          height: SHEET_HEIGHT,
          transform: open ? "translateY(0)" : `translateY(${SHEET_HEIGHT}px)`,
          transition: "transform 250ms ease",
        }}
      >
        {/* Drag Handle */}
        <div style={{ backgroundColor: Colors.gray.G500 }}
          className="w-full flex justify-center py-3 cursor-pointer"
        >
          <div className="w-12 h-1.5 rounded-full bg-gray-500/40" />
        </div>

        {/* ================= Content ================= */}
        <div style={{ backgroundColor: Colors.gray.G500 }}
          className="px-5 pb-10 overflow-y-auto h-full text-white">

          {/* ================= info MODE ================= */}
          {mode === "info" && (
            <>
              <h2 className="text-lg font-semibold mb-1">KSPO DOME</h2>
              <p className="text-sm text-gray-400 mb-4">
                서울 송파구 올림픽로 424
              </p>

              {/* 공연 카드 */}
              <div className="bg-[#0F192A] rounded-xl p-4 mb-4 flex gap-4 items-center">

                {/* 포스터 */}
                <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={Revel}
                    alt="poster"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 정보 */}
                <div className="flex-1">
                  <p className="font-semibold text-base mb-2">
                    볼빨간사춘기 첫 팬미팅
                  </p>

                  <div className="text-sm text-gray-400 space-y-1">
                    <div className="flex gap-2">
                      <span className="text-gray-500 w-10">일시</span>
                      <span>오늘 오후 7:00</span>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-gray-500 w-10">좌석</span>
                      <span className="text-purple-400">
                        1층 S구역 F열 12번
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3">
                <button
                  style={{ backgroundColor: Colors.violet.H300 }}
                  className="flex-1 py-3 rounded-xl font-medium"
                >
                  메이트 위치 켜기
                </button>

                <button
                  style={{ backgroundColor: Colors.violet.H300 }}
                  className="flex-1 py-3 rounded-xl font-medium"
                  onClick={() => {
                    setMode("locationMap");
                    setStep("myLocation");
                  }}
                >
                  길찾기
                </button>
              </div>
            </>
          )}

          {/* ================= locationMap MODE ================= */}
          {mode === "locationMap" && (
            <div className="flex flex-col h-full w-full px-2 text-white">

              {/* Header */}
              <div className="relative flex items-center justify-center mb-10">
                <button
                  onClick={() => setMode("info")}
                  className="absolute left-0 text-lg"
                >
                  ←
                </button>
                <h3 className="text-lg font-semibold">위치 설정</h3>
              </div>

              <div className="flex flex-col flex-1 justify-center">

                {/* 아이콘 라인 */}
                <div className="flex items-center justify-between w-full mb-12">

                  {/* 내 위치 */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition
                        ${step === "myLocation" ? "bg-violetH300" : "bg-[#0B1220]"}`}
                    >
                      <img
                        src={step === "myLocation" ? LocationOnIcon : LocationIcon}
                        className="w-7 h-7"
                      />
                    </div>
                    <span
                      className={`text-xs ${step === "myLocation" ? "text-violet-400" : "text-gray-400"
                        }`}
                    >
                      내 위치
                    </span>
                  </div>

                  <div className="flex-1 flex items-center justify-center px-3">
                    <div className="w-full h-[1px] bg-gray-500/40 relative flex items-center justify-center">
                      <img src={ArrowIcon} className="h-5 opacity-70" />
                    </div>
                  </div>


                  {/* 도착지 */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition
                        ${step !== "myLocation" ? "bg-violetH300" : "bg-[#0B1220]"}`}
                    >
                      <img
                        src={
                          step !== "myLocation"
                            ? LocationOnIcon
                            : LocationIcon
                        }
                        className="w-7 h-7"
                      />
                    </div>
                    <span
                      className={`text-xs ${step !== "myLocation"
                          ? "text-violet-400"
                          : "text-gray-400"
                        }`}
                    >
                      도착지
                    </span>
                  </div>
                </div>

                {/* 버튼 */}
                {step === "myLocation" && (
                  <button
                    style={{ backgroundColor: Colors.violet.H300 }}
                    className="w-full py-3 rounded-xl font-medium"
                    onClick={() => setStep("destination")}
                  >
                    이 위치로 설정
                  </button>
                )}

                {step === "destination" && (
                  <button
                    style={{ backgroundColor: Colors.violet.H300 }}
                    className="w-full py-3 rounded-xl font-medium"
                    onClick={() => setStep("ready")}
                  >
                    도착지로 설정
                  </button>
                )}

                {step === "ready" && (
                  <button
                    style={{ backgroundColor: Colors.violet.H300 }}
                    className="w-full py-3 rounded-xl font-medium"
                  >
                    길찾기
                  </button>
                )}
              </div>

              <div className="h-6" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
