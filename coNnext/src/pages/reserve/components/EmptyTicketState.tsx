const EmptyTicketState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* 경고 아이콘 - 빨간색 원형 배경에 느낌표 */}
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-red-900/30 rounded-full flex items-center justify-center">
          <div className="text-5xl font-bold text-red-500 mb-1">!</div>
        </div>
      </div>

      {/* 안내 메시지 */}
      <p className="text-white text-[16px] font-medium mb-6">
        예매한 공연이 없어요!
      </p>
    </div>
  );
};

export default EmptyTicketState;
