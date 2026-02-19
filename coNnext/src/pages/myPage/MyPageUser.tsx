import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileIcon from '../../assets/Variables/mask_off.svg';
import WithdrawalModal from '../../components/modal/WithdrawalModal';

export interface MyPageUserProps {
  user: {
    nickname: string;
    favoriteVenues: number;
    visitedConcerts: number;
    friendMates: number;
  };
  onLogout: () => void;
}

const MyPageUser: React.FC<MyPageUserProps> = ({ 
  user, 
  onLogout
}) => {
  const navigate = useNavigate();
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

  const handleEditProfile = () => {
    navigate('/mypage/edit');
  };

  const handleEditVisibility = () => {
    navigate('/mypage/visibility');
  };

  const handleEditNotification = () => {
    navigate('/mypage/notification');
  };

  const handleWithdrawal = (reason: string) => {
    // 탈퇴 API 호출
    console.log('탈퇴 이유:', reason);
    // TODO: 탈퇴 API 호출 후 처리
    // 예: navigate('/') 또는 로그아웃 처리
  };

  return (
    <>
      {/* Profile Section */}
      <div className="px-6 pb-6 flex justify-center">
        <div 
          className="bg-[#293A5D] rounded-2xl flex items-center gap-4 px-5 relative" 
          style={{ width: '345px', height: '90px' }}
        >
          {/* 프로필 이미지 아이콘 */}
          <div 
            className="bg-white rounded-full flex items-center justify-center shrink-0 overflow-hidden"
            style={{ width: '48px', height: '48px' }}
          >
            <img 
              src={ProfileIcon} 
              alt="프로필" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* 닉네임 */}
          <div 
            className="flex-1"
            style={{
              fontFamily: 'PretendardSemiBold',
              fontWeight: 600, 
              fontSize: '16px',
              lineHeight: '130%', 
              letterSpacing: '0.025em', 
              color: '#FFFFFF' 
            }}
          >
            {user.nickname}
          </div>

          {/* 정보 수정 버튼 */}
          <button
            onClick={handleEditProfile}
            className="rounded-full px-3 py-1 transition-all active:scale-95"
            style={{
              background: '#9576FF',
              fontFamily: 'PretendardMedium',
              fontSize: '13px',
              color: '#FFFFFF',
              whiteSpace: 'nowrap'
            }}
          >
            정보 수정
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 pb-6 grid grid-cols-3 gap-3">
        <div className="bg-[#1E293B] rounded-xl p-4">
          <div 
            className="text-gray-400 mb-1"
            style={{
              fontFamily: 'PretendardMedium',
              fontSize: '12px',
              lineHeight: '130%',
            }}
          >
            즐겨찾은 공연장
          </div>
          <div 
            className="font-bold"
            style={{
              fontFamily: 'PretendardSemiBold',
              fontSize: '24px',
              lineHeight: '130%',
              color: '#FFFFFF'
            }}
          >
            {user.favoriteVenues}
          </div>
        </div>
        <div className="bg-[#1E293B] rounded-xl p-4">
          <div 
            className="text-gray-400 mb-1"
            style={{
              fontFamily: 'PretendardMedium',
              fontSize: '12px',
              lineHeight: '130%',
            }}
          >
            방문한 콘서트
          </div>
          <div 
            className="font-bold"
            style={{
              fontFamily: 'PretendardSemiBold',
              fontSize: '24px',
              lineHeight: '130%',
              color: '#FFFFFF'
            }}
          >
            {user.visitedConcerts}
          </div>
        </div>
        <div className="bg-[#1E293B] rounded-xl p-4">
          <div 
            className="text-gray-400 mb-1"
            style={{
              fontFamily: 'PretendardMedium',
              fontSize: '12px',
              lineHeight: '130%',
            }}
          >
            친구인 메이트
          </div>
          <div 
            className="font-bold"
            style={{
              fontFamily: 'PretendardSemiBold',
              fontSize: '24px',
              lineHeight: '130%',
              color: '#FFFFFF'
            }}
          >
            {user.friendMates}
          </div>
        </div>
      </div>

      {/* 구분선 */}
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
        <div className="w-full" style={{ maxWidth: '345px' }}>
          <h2 
            className="mb-2 ml-1"
            style={{
              fontFamily: 'PretendardMedium',
              fontSize: '13px',
              color: '#E8E8E8'
            }}
          >
            서비스 설정
          </h2>
        </div>

        <div className="flex flex-col w-full" style={{ maxWidth: '345px' }}>
          {/* 공개 범위 설정 */}
          <button 
            onClick={handleEditVisibility}
            className="w-full flex items-center justify-between border-b border-gray-800/50 active:opacity-50 transition-opacity"
            style={{ height: '52px' }}
          >
            <span 
              style={{
                fontFamily: 'PretendardMedium',
                fontSize: '16px',
                color: '#E8E8E8'
              }}
            >
              공개 범위 설정
            </span>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 알림 설정 */}
          <button 
            onClick={handleEditNotification}
            className="w-full flex items-center justify-between border-b border-gray-800/50 active:opacity-50 transition-opacity"
            style={{ height: '52px' }}
          >
            <span 
              style={{
                fontFamily: 'PretendardMedium',
                fontSize: '16px',
                color: '#E8E8E8'
              }}
            >
              알림 설정
            </span>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 구분선 */}
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
        <div className="w-full" style={{ maxWidth: '345px' }}>
          <h2 
            className="mb-2 ml-1"
            style={{
              fontFamily: 'PretendardMedium',
              fontSize: '14px',
              color: '#E8E8E8'
            }}
          >
            서비스 문의
          </h2>
        </div>

        <div className="flex flex-col w-full" style={{ maxWidth: '345px' }}>
          {/* 고객센터 */}
          <button 
            className="w-full flex items-center justify-between border-b border-gray-800/50 active:opacity-50 transition-opacity"
            style={{ height: '52px' }}
          >
            <span 
              style={{
                fontFamily: 'PretendardMedium',
                fontSize: '16px',
                color: '#E8E8E8'
              }}
            >
              고객센터
            </span>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 구분선 */}
      <div 
        style={{ 
          width: '100%', 
          height: '9px', 
          backgroundColor: '#1E293B', 
          marginBottom: '16px'
        }} 
      />

      {/* Account Actions */}
      <div className="px-6 pb-6 flex flex-col gap-4" style={{ paddingLeft: '33px' }}>
        <button 
          onClick={onLogout}
          className="text-left transition-colors active:opacity-50"
          style={{
            fontFamily: 'PretendardMedium',
            fontSize: '16px',
            color: '#A1A1A1'
          }}
        >
          로그아웃
        </button>
        <button 
          onClick={() => setShowWithdrawalModal(true)}
          className="text-left transition-colors active:opacity-50"
          style={{
            fontFamily: 'PretendardMedium',
            fontSize: '16px',
            color: '#A1A1A1'
          }}
        >
          계정탈퇴
        </button>
      </div>

      {/* 탈퇴 모달 */}
      <WithdrawalModal
        isOpen={showWithdrawalModal}
        onClose={() => setShowWithdrawalModal(false)}
        onConfirm={handleWithdrawal}
      />
    </>
  );
};

export default MyPageUser;
