import type { NearestVenuePayload } from "../types/venue";

type NearbyBannerProps = {
  venue?: NearestVenuePayload;
};

export function NearbyBanner({ venue }: NearbyBannerProps) {
  return (
    <div className="w-[400px] h-[112px] bg-[#745AFF] rounded-xl p-4 text-white flex flex-col">
      <span className="inline-block w-fit bg-[#9576ff] text-xs font-medium px-3 py-1 rounded-full">
        내 위치
      </span>

      <p className="mt-1 text-[16px] font-semibold leading-[1.2]">
        현재&nbsp;
        <span className="text-[#FFA0EA]">{venue?.name}</span>
        &nbsp;근처에 계신가요?
      </p>

      <p className="mt-2 text-[13px] font-medium text-white/80">
        공연장 지도를 확인하세요.
      </p>
    </div>
  );
}
