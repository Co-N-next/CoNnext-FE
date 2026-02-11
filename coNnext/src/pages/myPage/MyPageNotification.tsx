import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackIcon from '../../assets/Icons/back.svg';
import ConnextLogo from '../../assets/Icons/Con-next_bg-gradient.svg';

const MyPageNotification: React.FC = () => {
  const navigate = useNavigate();
  
  const [serviceNotification, setServiceNotification] = useState(true);
  const [pushNotification, setPushNotification] = useState(false);
  const [messageNotification, setMessageNotification] = useState(false);

  // 토글 스위치 컴포넌트 (애니메이션 강화)
  const ToggleSwitch: React.FC<{ 
    checked: boolean; 
    onChange: (checked: boolean) => void;
  }> = ({ checked, onChange }) => {
    return (
      <button
        onClick={() => onChange(!checked)}
        className="relative transition-colors duration-300 ease-in-out"
        style={{
          width: '51px',
          height: '31px',
          borderRadius: '100px',
          backgroundColor: checked ? '#F2EFFF' : '#F2EFFF',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          flexShrink: 0
        }}
      >
        <div
          className="absolute transition-all duration-300 ease-spring"
          style={{
            width: '27px',
            height: '27px',
            borderRadius: '50%',
            backgroundColor: checked ? '#9576FF' : '#A1A1A1',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            top: '2px',
            left: checked ? '22px' : '2px', // 자연스러운 이동 거리
          }}
        />
      </button>
    );
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        background: '#0E172A',
        paddingTop: '20px',
        paddingLeft: '20px',
        paddingRight: '20px'
      }}
    >
      {/* Header (기존 유지) */}
      <div className="flex items-center" style={{ marginBottom: '40px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <img src={BackIcon} alt="뒤로가기" style={{ width: '24px', height: '24px' }} />
        </button>
        <h1 style={{ fontWeight: 600, fontSize: '20px', color: '#FFFFFF', marginLeft: '16px' }}>알림 설정</h1>
      </div>

      {/* Main Content Area (width: 338, left: 28, top: 133 기준 적용) */}
      <div 
        className="flex flex-col"
        style={{
          width: '338px',
          height: '422.53px',
          marginLeft: '8px', // 기본 padding(20px) + 8px = 28px 맞춤
          gap: '48px',
          opacity: 1
        }}
      >
        {/* 설명 및 로고 섹션 */}
        <div className="flex flex-col" style={{ gap: '24px' }}>
          <p style={{ fontSize: '13px', color: '#E8E8E8', lineHeight: '1.5', letterSpacing: '-2.5%' }}>
            알림을 켜면 메이트의 위치 공유 알림, 친구 신청 알림 등 다양한<br />
            정보를 받을 수 있어요!
          </p>

          {/* 로고 박스 (상세 수치 적용) */}
          <div
            className="flex flex-col items-center justify-center"
            style={{
              width: '338px',
              height: '152.53px',
              backgroundColor: '#1E293B',
              borderRadius: '17px',
              padding: '24px 56px',
              gap: '8px',
              boxSizing: 'border-box'
            }}
          >
            <img 
              src={ConnextLogo}
              alt="Co:N-next 로고"
              style={{ width: '130px', height: '100%', objectFit: 'contain' }}
            />
            <p style={{ fontWeight: 500, fontSize: '13px', color: '#CBBBFF', whiteSpace: 'nowrap' }}>
              기기 설정 &gt; 알림 &gt; Co:N-next에서 알림 허용
            </p>
          </div>
        </div>

        {/* 알림 리스트 (width: 322, gap: 32) */}
        <div className="flex flex-col" style={{ width: '322px', height: '156px', gap: '32px' }}>
          
          {/* 서비스 이용 알림 */}
          <div className="flex items-center justify-between" style={{ height: '42px' }}>
            <div className="flex flex-col">
              <h3 style={{ fontWeight: 600, fontSize: '16px', color: '#FFFFFF' }}>서비스 이용 알림</h3>
              <p style={{ fontSize: '13px', color: '#E8E8E8' }}>메이트가 보낸 알림, 오늘의 공연 알림 등</p>
            </div>
            <ToggleSwitch checked={serviceNotification} onChange={setServiceNotification} />
          </div>

          {/* 푸시 알림 */}
          <div className="flex items-center justify-between" style={{ height: '31px' }}>
            <h3 style={{ fontWeight: 600, fontSize: '16px', color: '#FFFFFF' }}>푸시 알림</h3>
            <ToggleSwitch checked={pushNotification} onChange={setPushNotification} />
          </div>

          {/* 문자 알림 */}
          <div className="flex items-center justify-between" style={{ height: '31px' }}>
            <h3 style={{ fontWeight: 600, fontSize: '16px', color: '#FFFFFF' }}>문자 알림</h3>
            <ToggleSwitch checked={messageNotification} onChange={setMessageNotification} />
          </div>
        </div>
      </div>

      <style>{`
        /* 토글의 부드러운 튕김 효과를 위한 커스텀 타이밍 함수 */
        .ease-spring {
          transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

export default MyPageNotification;