import React from 'react';

const ReservationSkeleton = () => {
  // 스켈레톤 아이템을 몇 개 보여줄지 결정 (기본 4개)
  const skeletonItems = new Array(4).fill(0);

  return (
    <div className="flex flex-col gap-4 w-full px-[20px]">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="flex w-full items-center gap-4 p-4 bg-[#2E364A] rounded-[16px] border border-[#364057] animate-pulse"
        >
          {/* 포스터 이미지 영역 (왼쪽) */}
          <div className="w-[80px] h-[100px] bg-gray-600/50 rounded-[10px] flex-shrink-0" />

          {/* 텍스트 정보 영역 (오른쪽) */}
          <div className="flex flex-col flex-1 gap-2">
            {/* 상태 뱃지 (예: 예매완료) */}
            <div className="h-5 w-16 bg-gray-600/50 rounded-full mb-1" />
            
            {/* 공연 제목 (긴 막대) */}
            <div className="h-6 w-3/4 bg-gray-600/50 rounded-md" />
            
            {/* 날짜/시간 (중간 막대) */}
            <div className="h-4 w-1/2 bg-gray-600/50 rounded-md mt-1" />
            
            {/* 장소 (짧은 막대) */}
            <div className="h-4 w-1/3 bg-gray-600/50 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservationSkeleton;