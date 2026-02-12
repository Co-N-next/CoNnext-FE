// src/components/Skeleton/SearchSkeleton.tsx
const SearchSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex px-2 gap-[27px] py-2 animate-pulse">
          {/* 포스터 영역 */}
          <div className="w-[103px] h-[144px] rounded-[10px] bg-gray-700 flex-shrink-0" />
          
          {/* 텍스트 영역 */}
          <div className="flex flex-col py-1 justify-between w-full">
            <div>
              <div className="h-5 w-3/4 bg-gray-700 rounded mb-2" />
              <div className="h-4 w-1/2 bg-gray-700 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-700 rounded" />
              <div className="h-3 w-2/3 bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSkeleton;