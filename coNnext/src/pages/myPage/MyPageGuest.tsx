import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import ProfileIcon from '../../assets/Variables/mask_on.svg';
import ConnextLogo from '../../assets/Icons/Con-next_bg-gradient.svg';

const MyPageGuest: React.FC = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleProfileClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      {/* Profile Section - Before Login - 클릭 가능 */}
      <div className="px-6 pb-6 flex justify-center">
        <button
          onClick={handleProfileClick}
          className="bg-[#293A5D] rounded-2xl flex items-center gap-4 px-5 w-full transition-opacity active:opacity-80" 
          style={{ maxWidth: '345px', height: '90px' }}
        >
          {/* 프로필 이미지 아이콘 */}
          <div 
            className="bg-white rounded-full flex items-center justify-center shrink-0 overflow-hidden"
            style={{ width: '48px', height: '48px' }}
          >
            <img 
                src={ProfileIcon} 
                alt="Profile Icon" 
                style={{ height: '60px' }}
              />
          </div>

          {/* 텍스트 영역 */}
          <div 
            className="text-white text-left"
            style={{
              fontFamily: 'PretendardSemiBold',
              fontWeight: 600, 
              fontSize: '16px',
              lineHeight: '130%', 
              letterSpacing: '0.025em'
            }}
          >
            로그인 후 이용 가능합니다
          </div>
        </button>
      </div>

      {/* Stats Section - Before Login (모두 0) */}
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
            0
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
            0
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
            0
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

      {/* 서비스 문의 Section */}
      <div className="px-6 pb-4 flex flex-col items-center">
        <div className="w-full" style={{ maxWidth: '345px' }}>
          <h2 
            className="mb-2 ml-1"
            style={{
              fontFamily: 'PretendardMedium',
              fontSize: '14px',
              color: '#9CA3AF'
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
                color: '#E5E7EB'
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

      {/* Login Modal - Bottom Box */}
      {showLoginModal && (
        <>
          {/* Dark Overlay - 헤더/푸터 제외 */}
          <div 
            className="fixed z-40"
            onClick={handleCloseModal}
            style={{ 
              top: '80px', // 헤더 높이만큼 아래
              bottom: '96px', // 푸터 높이만큼 위
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              animation: 'fadeIn 0.3s ease-out'
            }}
          />
          
          {/* Bottom Modal Box */}
          <div 
            className="fixed z-50"
            style={{ 
              width: '347px',
              height: '193px',
              left: '23px',
              bottom: '120px', // 푸터 위
              borderRadius: '10px',
              backgroundColor: '#1E293B',
              paddingTop: '24px',
              paddingRight: '16px',
              paddingBottom: '24px',
              paddingLeft: '16px',
              animation: 'slideUp 0.3s ease-out',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* 메시지 */}
            <div 
              className="text-center"
              style={{
                fontFamily: 'PretendardMedium',
                fontSize: '13px',
                color: '#FEFEFE',
                lineHeight: '130%'
              }}
            >
              로그인하여 더 많은 기능을 이용해보세요!
            </div>

            {/* Connext Logo */}
            <div className="flex items-center justify-center">
              <img 
                src={ConnextLogo} 
                alt="Connext Logo" 
                style={{ width: '121px' }}
              />
            </div>

            {/* 로그인하러 가기 텍스트 */}
            <button
              onClick={handleLoginClick}
              className="w-full text-center transition-opacity active:opacity-70"
              style={{
                fontFamily: 'PretendardsemiBold',
                fontSize: '16px',
                color: '#7F5AFF',
                padding: 0
              }}
            >
              로그인하러 가기
            </button>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            @keyframes slideUp {
              from { 
                opacity: 0;
                transform: translateY(20px);
              }
              to { 
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </>
      )}
    </>
  );
};

export default MyPageGuest;