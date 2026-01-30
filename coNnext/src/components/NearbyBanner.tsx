// components/NearbyBanner.tsx
type Props = {
  count?: number;
  place: string;
};

export function NearbyBanner({ count, place }: Props) {
  return (
    <div className="w-[400px] h-[112px] bg-[#745AFF] rounded-xl p-4 text-white flex flex-col">
      {/* 1️⃣ 뱃지 */}
      <span className="inline-block w-fit bg-[#9576ff] text-white text-xs font-medium px-3 py-1 rounded-full select-none pointer-events-none">
        내 위치
      </span>

      {/* 2️⃣ 메인 문장 */}
      <p className="mt-1 font-inter text-[16px] font-semibold leading-[1.2] tracking-normal">
        현재 <span className="text-[#FFA0EA]">{place}</span> 근처에 계신가요?
      </p>

      {/* 3️⃣ 서브 문장 */}
      <p className="mt-2 font-pretendard text-[13px] font-medium leading-[1.2] tracking-normal text-white/80">
        공연장 지도를 확인하세요.
      </p>
    </div>
  );
}
