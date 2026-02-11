// Mate Skeleton UI - 로딩 중 표시
const MateSkeleton = () => {
  return (
    <div className="bg-[#252D3F] rounded-[12px] p-[8px] pt-[12px] m-[12px]">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Avatar Skeleton */}
            <div className="w-[60px] h-[60px] bg-gray-700 rounded-full mb-1 animate-pulse" />
            {/* Name Skeleton */}
            <div className="w-[50px] h-[12px] bg-gray-700 rounded animate-pulse mb-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MateSkeleton;
