import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getNotificationSettings,
  updateNotificationSettings,
} from '../../api/auth';

import BackIcon from '../../assets/Icons/back.svg';
import ConnextLogo from '../../assets/Icons/Con-next_bg-gradient.svg';

const MyPageNotification: React.FC = () => {
  const navigate = useNavigate();

  const [serviceNotification, setServiceNotification] = useState(false);
  const [pushNotification, setPushNotification] = useState(false);
  const [messageNotification, setMessageNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 초기 알림 설정 조회
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getNotificationSettings();
        const payload = res.data?.payload;
        if (payload) {
          setServiceNotification(payload.serviceEnabled);
          setPushNotification(payload.pushEnabled);
          setMessageNotification(payload.smsEnabled);
        }
      } catch (error) {
        console.error('알림 설정 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // 토글 변경 시 즉시 API 저장
  const handleToggle = async (
    field: 'service' | 'push' | 'sms',
    value: boolean
  ) => {
    // 낙관적 업데이트
    const prev = { serviceNotification, pushNotification, messageNotification };
    if (field === 'service') setServiceNotification(value);
    if (field === 'push') setPushNotification(value);
    if (field === 'sms') setMessageNotification(value);

    setIsSaving(true);
    try {
      await updateNotificationSettings({
        serviceEnabled: field === 'service' ? value : serviceNotification,
        pushEnabled: field === 'push' ? value : pushNotification,
        smsEnabled: field === 'sms' ? value : messageNotification,
      });
    } catch (error) {
      console.error('알림 설정 저장 실패:', error);
      // 실패 시 롤백
      setServiceNotification(prev.serviceNotification);
      setPushNotification(prev.pushNotification);
      setMessageNotification(prev.messageNotification);
    } finally {
      setIsSaving(false);
    }
  };

  // 토글 스위치 컴포넌트
  const ToggleSwitch: React.FC<{
    checked: boolean;
    onChange: (checked: boolean) => void;
  }> = ({ checked, onChange }) => {
    return (
      <button
        onClick={() => onChange(!checked)}
        disabled={isSaving}
        className="relative transition-colors duration-300 ease-in-out"
        style={{
          width: '51px',
          height: '31px',
          borderRadius: '100px',
          backgroundColor: '#F2EFFF',
          border: 'none',
          cursor: isSaving ? 'not-allowed' : 'pointer',
          padding: 0,
          flexShrink: 0,
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
            left: checked ? '22px' : '2px',
          }}
        />
      </button>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center" style={{ background: '#0E172A' }}>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: '#0E172A',
        paddingTop: '32px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      {/* Header */}
      <div className="flex items-center" style={{ marginBottom: '40px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <img src={BackIcon} alt="뒤로가기" style={{ width: '24px', height: '24px' }} />
        </button>
        <h1 style={{ fontWeight: 600, fontSize: '20px', color: '#FFFFFF', marginLeft: '16px' }}>알림 설정</h1>
      </div>

      {/* Main Content Area */}
      <div
        className="flex flex-col"
        style={{
          width: '338px',
          height: '422.53px',
          marginLeft: '8px',
          gap: '48px',
          opacity: 1,
        }}
      >
        {/* 설명 및 로고 섹션 */}
        <div className="flex flex-col" style={{ gap: '24px' }}>
          <p style={{ fontSize: '13px', color: '#E8E8E8', lineHeight: '1.5', letterSpacing: '-2.5%' }}>
            알림을 켜면 메이트의 위치 공유 알림, 친구 신청 알림 등 다양한<br />
            정보를 받을 수 있어요!
          </p>

          <div
            className="flex flex-col items-center justify-center"
            style={{
              width: '338px',
              height: '152.53px',
              backgroundColor: '#1E293B',
              borderRadius: '17px',
              padding: '24px 56px',
              gap: '8px',
              boxSizing: 'border-box',
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

        {/* 알림 리스트 */}
        <div className="flex flex-col" style={{ width: '322px', height: '156px', gap: '32px' }}>

          {/* 서비스 이용 알림 */}
          <div className="flex items-center justify-between" style={{ height: '42px' }}>
            <div className="flex flex-col">
              <h3 style={{ fontWeight: 600, fontSize: '16px', color: '#FFFFFF' }}>서비스 이용 알림</h3>
              <p style={{ fontSize: '13px', color: '#E8E8E8' }}>메이트가 보낸 알림, 오늘의 공연 알림 등</p>
            </div>
            <ToggleSwitch
              checked={serviceNotification}
              onChange={(v) => handleToggle('service', v)}
            />
          </div>

          {/* 푸시 알림 */}
          <div className="flex items-center justify-between" style={{ height: '31px' }}>
            <h3 style={{ fontWeight: 600, fontSize: '16px', color: '#FFFFFF' }}>푸시 알림</h3>
            <ToggleSwitch
              checked={pushNotification}
              onChange={(v) => handleToggle('push', v)}
            />
          </div>

          {/* 문자 알림 */}
          <div className="flex items-center justify-between" style={{ height: '31px' }}>
            <h3 style={{ fontWeight: 600, fontSize: '16px', color: '#FFFFFF' }}>문자 알림</h3>
            <ToggleSwitch
              checked={messageNotification}
              onChange={(v) => handleToggle('sms', v)}
            />
          </div>
        </div>
      </div>

      <style>{`
        .ease-spring {
          transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

export default MyPageNotification;