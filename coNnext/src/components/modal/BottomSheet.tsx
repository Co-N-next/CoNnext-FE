import { useRef, useState } from "react";
import Revel from "../../assets/dumy/Revel.svg";
import StarOn from "../../assets/Icons/star_on.svg";
import StarOff from "../../assets/Icons/star_off.svg";
import ShareIcon from "../../assets/Icons/share.svg";
import LocationIcon from "../../assets/Variables/location_off.svg";
import LocationOnIcon from "../../assets/Variables/location_on.svg";
import ArrowIcon from "../../assets/Variables/arrow.svg";
import {
  useAddFavoriteVenue,
  useFavoriteVenues,
} from "../../hooks/queries/useFavoriteVenues";

type LocationStep = "myLocation" | "destination" | "ready";

type Props = {
  open: boolean;
  onClose: () => void;
  venueId: number;
  venueName: string;
  venueAddress: string;
  selectedPointLabel?: string;
  selectedPointFloor?: number;
  startPointLabel?: string;
  endPointLabel?: string;
  pathDistance?: number | null;
  pathLoading: boolean;
  pathError?: string | null;
  onSetStartPoint: () => boolean;
  onSetEndPoint: () => boolean;
  onFindPath: () => Promise<boolean>;
};

export default function BottomSheet({
  open,
  onClose,
  venueId,
  venueName,
  venueAddress,
  selectedPointLabel,
  selectedPointFloor,
  startPointLabel,
  endPointLabel,
  pathDistance,
  pathLoading,
  pathError,
  onSetStartPoint,
  onSetEndPoint,
  onFindPath,
}: Props) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"info" | "locationMap">("info");
  const [step, setStep] = useState<LocationStep>("myLocation");
  const FOOTER_OFFSET = 84;
  const INFO_SHEET_HEIGHT = 327;
  const LOCATION_SHEET_HEIGHT = 380;
  const sheetHeight = mode === "locationMap" ? LOCATION_SHEET_HEIGHT : INFO_SHEET_HEIGHT;

  const { data: favoriteData } = useFavoriteVenues();
  const addFavoriteMutation = useAddFavoriteVenue();
  const isFavorited =
    (favoriteData?.payload ?? []).some((item) => item.id === venueId);

  const handleFavoriteClick = async () => {
    if (!venueId) return;
    if (isFavorited) {
      window.alert("이미 즐겨찾기에 등록된 공연장입니다.");
      return;
    }

    try {
      await addFavoriteMutation.mutateAsync(venueId);
      window.alert("즐겨찾기에 추가되었습니다.");
    } catch (error) {
      console.error("즐겨찾기 등록 실패:", error);
      window.alert("즐겨찾기 등록에 실패했습니다.");
    }
  };

  const handleShareClick = async () => {
    const url = window.location.href;
    const payload = {
      title: venueName || "공연장",
      text: `${venueName || "공연장"} 정보를 확인해보세요.`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
      await navigator.clipboard.writeText(url);
      window.alert("링크가 복사되었습니다.");
    } catch (error) {
      console.error("공유 실패:", error);
    }
  };

  return (
    <>
      {open && mode !== "locationMap" && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      )}

      <div
        ref={sheetRef}
        className="fixed left-1/2 z-[60] w-full max-w-[450px] -translate-x-1/2 rounded-t-3xl bg-[#0B1220] shadow-xl"
        style={{
          bottom: `calc(${FOOTER_OFFSET}px + env(safe-area-inset-bottom))`,
          height: sheetHeight,
          transform: open ? "translateY(0)" : `translateY(${sheetHeight}px)`,
          transition: "transform 250ms ease, opacity 250ms ease",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="flex w-full justify-center py-3">
          <div className="h-1.5 w-12 rounded-full bg-gray-500/40" />
        </div>

        <div className="h-full overflow-y-auto px-5 pb-14 text-white">
          {mode === "info" && (
            <>
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="mb-1 text-lg font-semibold">
                    {venueName || "공연장"}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {venueAddress || "주소 정보가 없습니다."}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      void handleFavoriteClick();
                    }}
                    disabled={addFavoriteMutation.isPending}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E293B] disabled:opacity-60"
                  >
                    <img
                      src={isFavorited ? StarOn : StarOff}
                      alt="favorite"
                      className="h-5 w-5"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      void handleShareClick();
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E293B]"
                  >
                    <img src={ShareIcon} alt="share" className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mb-4 flex items-center gap-4 rounded-xl bg-[#0F192A] p-4">
                <div className="h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={Revel}
                    alt="poster"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="mb-2 text-base font-semibold">
                    볼빨간사춘기 첫 콘서트
                  </p>
                  <div className="space-y-1 text-sm text-gray-400">
                    <div className="flex gap-2">
                      <span className="w-10 text-gray-500">일시</span>
                      <span>오늘 오후 7:00</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="w-10 text-gray-500">좌석</span>
                      <span className="text-purple-400">1층 S구역 F열 12번</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 rounded-xl bg-[#7B5CFF] py-3 font-medium">
                  메이트 위치 찾기
                </button>
                <button
                  className="flex-1 rounded-xl bg-[#7B5CFF] py-3 font-medium"
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

          {mode === "locationMap" && (
            <div className="flex h-full w-full flex-col px-2 text-white">
              <div className="relative mb-10 flex items-center justify-center">
                <button onClick={() => setMode("info")} className="absolute left-0 text-lg">
                  {"<"}
                </button>
                <h3 className="text-lg font-semibold">위치 설정</h3>
              </div>

              <div className="flex flex-1 flex-col justify-center">
                <div className="mb-12 flex w-full items-center justify-between">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full transition ${
                        step === "myLocation" ? "bg-[#7B5CFF]" : "bg-[#0B1220]"
                      }`}
                    >
                      <img
                        src={step === "myLocation" ? LocationOnIcon : LocationIcon}
                        className="h-7 w-7"
                      />
                    </div>
                    <span className={`text-xs ${step === "myLocation" ? "text-violet-400" : "text-gray-400"}`}>
                      내 위치
                    </span>
                  </div>

                  <div className="flex flex-1 items-center justify-center px-3">
                    <div className="relative flex h-[1px] w-full items-center justify-center bg-gray-500/40">
                      <img src={ArrowIcon} className="h-5 opacity-70" />
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full transition ${
                        step !== "myLocation" ? "bg-[#7B5CFF]" : "bg-[#0B1220]"
                      }`}
                    >
                      <img
                        src={step !== "myLocation" ? LocationOnIcon : LocationIcon}
                        className="h-7 w-7"
                      />
                    </div>
                    <span className={`text-xs ${step !== "myLocation" ? "text-violet-400" : "text-gray-400"}`}>
                      목적지
                    </span>
                  </div>
                </div>

                {step === "myLocation" && (
                  <button
                    className="w-full rounded-xl bg-[#7B5CFF] py-3 font-medium"
                    onClick={() => {
                      const ok = onSetStartPoint();
                      if (!ok) {
                        window.alert("지도에서 출발 지점을 먼저 선택해주세요.");
                        return;
                      }
                      setStep("destination");
                    }}
                  >
                    내 위치로 설정
                  </button>
                )}
                {step === "destination" && (
                  <button
                    className="w-full rounded-xl bg-[#7B5CFF] py-3 font-medium"
                    onClick={() => {
                      const ok = onSetEndPoint();
                      if (!ok) {
                        window.alert("지도에서 목적지를 먼저 선택해주세요.");
                        return;
                      }
                      setStep("ready");
                    }}
                  >
                    목적지로 설정
                  </button>
                )}
                {step === "ready" && (
                  <button
                    className="w-full rounded-xl bg-[#7B5CFF] py-3 font-medium disabled:opacity-60"
                    onClick={async () => {
                      const ok = await onFindPath();
                      if (!ok) {
                        window.alert("경로를 찾을 수 없습니다.");
                      }
                    }}
                    disabled={pathLoading}
                  >
                    길찾기
                  </button>
                )}
                <div className="mt-4 rounded-xl bg-[#111D33] px-3 py-2 text-xs text-gray-300">
                  <p>
                    선택 지점: {selectedPointLabel ? `${selectedPointLabel} (${selectedPointFloor}층)` : "없음"}
                  </p>
                  <p>출발: {startPointLabel || "미설정"}</p>
                  <p>도착: {endPointLabel || "미설정"}</p>
                  {pathDistance != null && <p>거리: {pathDistance.toFixed(1)}m</p>}
                  {pathError && <p className="text-[#F87171]">{pathError}</p>}
                </div>
              </div>
              <div className="h-6" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
