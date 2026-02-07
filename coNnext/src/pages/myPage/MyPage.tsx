import React from 'react';

import ProfileIcon from '../../assets/logo/Profile.svg';

const MyPage: React.FC = () => {
 

  return (
   <div className="min-h-screen w-full bg-[#0E172A] text-white pb-24 overflow-y-auto"
     style={{
    background: '#0E172A',
  }}>
    
      {/* Header */}
<div className="p-6">
  <h1 
    style={{
      fontFamily: 'PretendardSemiBold',
      fontWeight: 600, 
      fontSize: '23px',
      lineHeight: '130%', 
      letterSpacing: '-0.025em', 
      color: '#FFFFFF' 
    }}
  >
    마이페이지
  </h1>
</div>
      {/* Profile Section */}
<div className="px-6 pb-6 flex justify-center"> {/* 중앙 정렬을 위해 flex justify-center 추가 */}
  <div 
    className="bg-[#293A5D] rounded-2xl flex items-center gap-4 px-5" 
    style={{ width: '345px', height: '90px' }} // 정확한 345*90 고정 크기
  >
    {/* 프로필 이미지 아이콘 */}
    <div 
      className="bg-white rounded-full flex items-center justify-center shrink-0 overflow-hidden"
      style={{ width: '48px', height: '48px' }} 
    >
      <img 
        src={ProfileIcon} 
        alt="프로필" 
       
      />
    </div>

    {/* 텍스트 영역 */}
    <div className="text-base text-white font-medium leading-tight"
    style={{
      fontFamily: 'PretendardSemiBold',
      fontWeight: 600, 
      fontSize: '16px',
      lineHeight: '130%', 
      letterSpacing: '2.5%', 
      color: '#FFFFFF' 
    }}>
      커넥돌이 234
    </div>
  </div>
</div>

      {/* Stats Section */}
      <div className="px-6 pb-6 grid grid-cols-3 gap-3"
      style={{
      fontFamily: 'PretendardSemiBold',
      fontWeight: 600, 
      fontSize: '18px',
      lineHeight: '130%', 
      letterSpacing: '-0.025em', 
      color: '#FFFFFF' 
    }}
    >
        <div className="bg-[#1E293B] rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">즐겨찾은 공연장</div>
          <div className="text-2xl font-bold">3</div>
        </div>
        <div className="bg-[#1E293B] rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">방문한 콘서트</div>
          <div className="text-2xl font-bold">12</div>
        </div>
        <div className="bg-[#1E293B] rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">친구인 메이트</div>
          <div className="text-2xl font-bold">3</div>
        </div>
      </div>

      {/* 구분선 (Height 9px, Color #1E293B) */}
<div 
  style={{ 
    width: '100%', 
    height: '9px', 
    backgroundColor: '#1E293B', 
    marginBottom: '16px'
  }} 
/>

     {/* Service Settings Section */}
<div className="px-6 pb-4 flex flex-col items-center">
  {/* 타이틀 영역 */}
  <div className="w-full max-w-[345px]">
    <h2 className="text-sm text-gray-500 mb-2 ml-1">서비스 설정</h2>
  </div>

  <div className="flex flex-col w-full max-w-[345px]">
    {/* 1. 공개 범위 설정 */}
    <button className="w-full h-[52px] flex items-center justify-between border-b border-gray-800/50 active:opacity-50 transition-opacity">
      <span className="text-base text-gray-200">공개 범위 설정</span>
      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>

    {/* 2. 알림 설정 */}
    <button className="w-full h-[52px] flex items-center justify-between border-b border-gray-800/50 active:opacity-50 transition-opacity">
      <span className="text-base text-gray-200">알림 설정</span>
      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>

    {/* 3. 테마 설정 */}
    <button className="w-full h-[52px] flex items-center justify-between border-b border-gray-800/50 active:opacity-50 transition-opacity">
      <span className="text-base text-gray-200">테마 설정</span>
      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>

      <div 
  style={{ 
    width: '100%', 
    height: '9px', 
    backgroundColor: '#1E293B', 
    marginBottom: '16px'
  }} 
/>

      {/* Service Info Section */}
<div className="px-6 pb-4 flex flex-col items-center">
  {/* 타이틀 영역 */}
  <div className="w-full max-w-[345px]">
    <h2 className="text-sm text-gray-500 mb-2 ml-1">서비스 문의</h2>
  </div>

  <div className="flex flex-col w-full max-w-[345px]">
    {/* 1. 고객센터 */}
    <button className="w-full h-[52px] flex items-center justify-between border-b border-gray-800/50 active:opacity-50 transition-opacity">
      <span className="text-base text-gray-200">고객센터</span>
      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>

    {/* 2. 계정 휴면/탈퇴 */}
    <button className="w-full h-[52px] flex items-center justify-between border-b border-gray-800/50 active:opacity-50 transition-opacity">
      <span className="text-base text-gray-200">계정 휴면/탈퇴</span>
      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>

      <div 
  style={{ 
    width: '100%', 
    height: '9px', 
    backgroundColor: '#1E293B', 
    marginBottom: '16px'
  }} 
/>

     {/* Account Actions */}
<div className="px-6 pb-6 flex flex-col items-start gap-4">
  <button className="text-base text-gray-300 hover:text-white transition-colors">
    계정추가
  </button>
  <button className="text-base text-gray-300 hover:text-white transition-colors">
    로그아웃
  </button>
</div>
    </div>
  );
};

export default MyPage;