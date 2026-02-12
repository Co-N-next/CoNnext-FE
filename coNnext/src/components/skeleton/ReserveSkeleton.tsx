const ReservationSkeleton = () => {
  return (
    <div className="animate-pulse px-4 pb-24">
      
      {/* 1. 오늘의 공연 섹션 (큰 카드 스타일) */}
      <section className="pt-5 space-y-4 mb-8">
        {/* 섹션 제목 (Skeleton) */}
        <div className="h-6 w-24 bg-white/10 rounded-md ml-2" />
        
        {/* TodayConcert 카드 모양 */}
        <div className="relative w-full aspect-[320/420] rounded-[24px] bg-[#1E293B] overflow-hidden border border-white/5">
          {/* 이미지 영역 흉내 */}
          <div className="absolute inset-0 bg-white/5" />
          
          {/* 텍스트 영역 흉내 (하단) */}
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 bg-gradient-to-t from-black/80 to-transparent">
            <div className="h-7 w-3/4 bg-white/20 rounded-md" />
            <div className="h-4 w-1/2 bg-white/10 rounded-md" />
          </div>
        </div>
      </section>

      {/* 2. 다가오는 공연 섹션 (가로형 리스트 스타일) */}
      <section className="space-y-4">
        {/* 섹션 제목 */}
        <div className="h-5 w-28 bg-white/10 rounded-md ml-2" />

        {/* 리스트 아이템 (3개 반복) */}
        {[1, 2, 3].map((index) => (
          <div 
            key={index} 
            className="flex p-3 gap-4 bg-[#1E293B] rounded-[16px] h-[120px] border border-white/5"
          >
            {/* 포스터 이미지 */}
            <div className="w-[80px] h-[100px] bg-white/10 rounded-[12px] flex-shrink-0" />

            {/* 텍스트 정보 */}
            <div className="flex-1 flex flex-col justify-center space-y-2.5">
              {/* 제목 */}
              <div className="h-5 w-4/5 bg-white/10 rounded-md" />
              {/* 아티스트 */}
              <div className="h-4 w-1/2 bg-white/5 rounded-md" />
              
              <div className="flex gap-2 mt-1">
                {/* 날짜/장소 */}
                <div className="h-3 w-16 bg-white/5 rounded-md" />
                <div className="h-3 w-16 bg-white/5 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ReservationSkeleton;