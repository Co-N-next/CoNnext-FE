// src/pages/myPage/MyPageUser.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../api/auth';

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

const MyPageUser: React.FC<MyPageUserProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdrawal = async (_reason: string) => {
    if (isWithdrawing) return;
    setIsWithdrawing(true);
    try {
      // ✅ apiClient 기반 deleteAccount() 사용
      await deleteAccount();
      alert('회원 탈퇴가 완료되었습니다.');
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('userNickname');
      window.location.href = '/login';
    } catch (error: any) {
      alert(error.response?.data?.message ?? '회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
      setShowWithdrawalModal(false);
    } finally {
      setIsWithdrawing(false);
    }
  };

  const menuItems = [
    { label: '공개 범위 설정', path: '/mypage/visibility' },
    { label: '알림 설정', path: '/mypage/notification' },
  ];

  const ArrowIcon = () => (
    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <>
      {/* 프로필 카드 */}
      <div className="px-6 pb-6 flex justify-center">
        <div
          className="bg-[#293A5D] rounded-2xl flex items-center gap-4 px-5 relative"
          style={{ width: '345px', height: '90px' }}
        >
          <div
            className="bg-white rounded-full flex items-center justify-center shrink-0 overflow-hidden"
            style={{ width: '48px', height: '48px' }}
          >
            <img src={ProfileIcon} alt="프로필" className="w-full h-full object-cover" />
          </div>

          <div
            className="flex-1"
            style={{ fontFamily: 'Pretendard', fontWeight: 600, fontSize: '16px', lineHeight: '130%', letterSpacing: '0.025em', color: '#FFFFFF' }}
          >
            {user.nickname || '닉네임 없음'}
          </div>

          <button
            onClick={() => navigate('/mypage/edit')}
            className="rounded-full px-3 py-1 transition-all active:scale-95"
            style={{ background: '#9576FF', fontFamily: 'Pretendard', fontSize: '13px', color: '#FFFFFF', whiteSpace: 'nowrap', border: 'none', cursor: 'pointer' }}
          >
            정보 수정
          </button>
        </div>
      </div>

      {/* 통계 */}
      <div className="px-6 pb-6 grid grid-cols-3 gap-3">
        {[
          { label: '즐겨찾은 공연장', value: user.favoriteVenues },
          { label: '방문한 콘서트', value: user.visitedConcerts },
          { label: '친구인 메이트', value: user.friendMates },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#1E293B] rounded-xl p-4">
            <div className="text-gray-400 mb-1" style={{ fontFamily: 'Pretendard', fontSize: '12px', lineHeight: '130%' }}>
              {label}
            </div>
            <div className="font-bold" style={{ fontFamily: 'Pretendard', fontSize: '24px', lineHeight: '130%', color: '#FFFFFF' }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ width: '100%', height: '9px', backgroundColor: '#1E293B', marginBottom: '16px' }} />

      {/* 서비스 설정 */}
      <div className="px-6 pb-4 flex flex-col items-center">
        <div className="w-full" style={{ maxWidth: '345px' }}>
          <h2 className="mb-2 ml-1" style={{ fontFamily: 'Pretendard', fontSize: '13px', color: '#E8E8E8' }}>
            서비스 설정
          </h2>
        </div>
        <div className="flex flex-col w-full" style={{ maxWidth: '345px' }}>
          {menuItems.map(({ label, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="w-full flex items-center justify-between border-b border-gray-800/50 active:opacity-50 transition-opacity"
              style={{ height: '52px', background: 'none', border: 'none', borderBottom: '1px solid rgba(31,41,55,0.5)', cursor: 'pointer' }}
            >
              <span style={{ fontFamily: 'Pretendard', fontSize: '16px', color: '#E8E8E8' }}>{label}</span>
              <ArrowIcon />
            </button>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', height: '9px', backgroundColor: '#1E293B', marginBottom: '16px' }} />

      {/* 서비스 문의 */}
      <div className="px-6 pb-4 flex flex-col items-center">
        <div className="w-full" style={{ maxWidth: '345px' }}>
          <h2 className="mb-2 ml-1" style={{ fontFamily: 'Pretendard', fontSize: '14px', color: '#E8E8E8' }}>
            서비스 문의
          </h2>
        </div>
        <div className="flex flex-col w-full" style={{ maxWidth: '345px' }}>
          <button
            className="w-full flex items-center justify-between active:opacity-50 transition-opacity"
            style={{ height: '52px', background: 'none', border: 'none', borderBottom: '1px solid rgba(31,41,55,0.5)', cursor: 'pointer' }}
          >
            <span style={{ fontFamily: 'Pretendard', fontSize: '16px', color: '#E8E8E8' }}>고객센터</span>
            <ArrowIcon />
          </button>
        </div>
      </div>

      <div style={{ width: '100%', height: '9px', backgroundColor: '#1E293B', marginBottom: '16px' }} />

      {/* 로그아웃 / 탈퇴 */}
      <div className="px-6 pb-6 flex flex-col gap-4" style={{ paddingLeft: '33px' }}>
        <button
          onClick={onLogout}
          className="text-left transition-colors active:opacity-50"
          style={{ fontFamily: 'Pretendard', fontSize: '16px', color: '#A1A1A1', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          로그아웃
        </button>
        <button
          onClick={() => setShowWithdrawalModal(true)}
          disabled={isWithdrawing}
          className="text-left transition-colors active:opacity-50"
          style={{ fontFamily: 'Pretendard', fontSize: '16px', color: '#A1A1A1', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          계정탈퇴
        </button>
      </div>

      <WithdrawalModal
        isOpen={showWithdrawalModal}
        onClose={() => !isWithdrawing && setShowWithdrawalModal(false)}
        onConfirm={handleWithdrawal}
      />
    </>
  );
};

export default MyPageUser;