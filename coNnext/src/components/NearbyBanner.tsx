type NearbyBannerProps = {
  place: string;
  radiusMeter: number;
};

export function NearbyBanner({ place, radiusMeter }: NearbyBannerProps) {
  return (
    <div className="w-[400px] h-[112px] bg-[#745AFF] rounded-xl p-4 text-white flex flex-col">
      {/* 뱃지 */}
      <span className="inline-block w-fit bg-[#9576ff] text-xs font-medium px-3 py-1 rounded-full">
        내 위치
      </span>

      {/* 메인 문장 */}
      <p className="mt-1 text-[16px] font-semibold leading-[1.2]">
        {radiusMeter}m 반경 내&nbsp;
        <span className="text-[#FFA0EA]">{place}</span>
        &nbsp;근처에 계신가요?
      </p>

      {/* 서브 문장 */}
      <p className="mt-2 text-[13px] font-medium text-white/80">
        공연장 지도를 확인하세요.
      </p>
    </div>
  );
}
