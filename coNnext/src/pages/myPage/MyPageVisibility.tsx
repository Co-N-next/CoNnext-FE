import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackIcon from '../../assets/Icons/back.svg';
import CheckedCircle from '../../assets/Icons/checked_circle.svg';
import UncheckedCircle from '../../assets/Icons/unchecked_circle.svg';

const MyPageVisibility: React.FC = () => {
  const navigate = useNavigate();
  
  // 공개 범위 설정 상태
  const [publicInfoRange, setPublicInfoRange] = useState<'all' | 'following'>('following');
  const [seatInfoRange, setSeatInfoRange] = useState<'section' | 'row' | 'number'>('number');

  return (
    <div 
      className="min-h-screen flex flex-col items-center"
      style={{
        width: '405px', // 전체 레이아웃 너비
        background: '#0E172A',
        margin: '0 auto',
        opacity: 1
      }}
    >
      <div 
        className="flex items-center" 
        style={{ 
          width: '393px',
          height: '24px',
          marginTop: '16px', 
          marginBottom: '24px', 
          paddingLeft: '24px', // 본문 레이아웃(329px) 시작점에 맞춤
          gap: '12px',
          opacity: 1 
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <img src={BackIcon} alt="뒤로가기" style={{ width: '24px', height: '24px' }} />
        </button>
        <h1
          style={{
            width: '264px',
            fontFamily: 'PretendardSemiBold',
            fontWeight: 600,
            fontSize: '20px',
            color: '#FFFFFF',
            letterSpacing: '-2.5%'
          }}
        >
          공개 범위 설정
        </h1>
      </div>

      <div className="flex flex-col" style={{ marginTop: '24px', width: '393px' }}>
        
        {/* 1. 공연 정보 공개 범위 섹션 */}
        <div 
          className="flex flex-col items-center" 
          style={{ width: '393px', paddingBottom: '32px', gap: '24px' }}
        >
          {/* 섹션 헤더 및 설명 (본문 레이아웃 너비 329px) */}
          <div style={{ width: '329px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#FEFEFE', marginBottom: '8px' }}>공연 정보 공개 범위</h2>
            <p style={{ fontSize: '13px', color: '#E8E8E8', lineHeight: '1.5' }}>
              메이트에게 어떤 공연까지 보여줄 지 선택할 수 있어요.
            </p>
            
            {/* 선택 리스트 (Gap: 4 반영) */}
            <div className="flex flex-col" style={{ marginTop: '24px', gap: '4px' }}>
              <button
                onClick={() => setPublicInfoRange('all')}
                className="flex items-center"
                style={{ width: '329px', height: '42px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <img src={publicInfoRange === 'all' ? CheckedCircle : UncheckedCircle} style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                <span style={{ color: '#FFFFFF', fontSize: '14px' }}>오늘의 공연만 공개</span>
              </button>
              <button
                onClick={() => setPublicInfoRange('following')}
                className="flex items-center"
                style={{ width: '329px', height: '42px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <img src={publicInfoRange === 'following' ? CheckedCircle : UncheckedCircle} style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                <span style={{ color: '#FFFFFF', fontSize: '14px' }}>예매한 모든 공연 공개</span>
              </button>
            </div>
          </div>
        </div>

        {/* 중간 구분선 (Width: 393, Height: 4, Color: #101010) */}
        <div style={{ width: '393px', height: '4px', backgroundColor: '#101010' }} />

        {/* 2. 좌석 정보 공개 범위 섹션 */}
        <div 
          className="flex flex-col items-center" 
          style={{ width: '393px', paddingTop: '32px', gap: '24px' }}
        >
          <div style={{ width: '329px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#FEFEFE', marginBottom: '8px' }}>좌석 정보 공개 범위</h2>
            <p style={{ fontSize: '13px', color: '#E8E8E8', lineHeight: '1.5' }}>
              메이트에게 좌석 위치를 어디까지 공유할지 설정할 수 있어요.
            </p>

            {/* 선택 리스트 (Gap: 4 반영) */}
            <div className="flex flex-col" style={{ marginTop: '24px', gap: '4px' }}>
              <button
                onClick={() => setSeatInfoRange('section')}
                className="flex items-center"
                style={{ width: '329px', height: '42px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <img src={seatInfoRange === 'section' ? CheckedCircle : UncheckedCircle} style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                <span style={{ color: '#FFFFFF', fontSize: '14px' }}>구역까지만 공개</span>
              </button>
              <button
                onClick={() => setSeatInfoRange('row')}
                className="flex items-center"
                style={{ width: '329px', height: '42px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <img src={seatInfoRange === 'row' ? CheckedCircle : UncheckedCircle} style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                <span style={{ color: '#FFFFFF', fontSize: '14px' }}>열까지만 공개</span>
              </button>
              <button
                onClick={() => setSeatInfoRange('number')}
                className="flex items-center"
                style={{ width: '329px', height: '42px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <img src={seatInfoRange === 'number' ? CheckedCircle : UncheckedCircle} style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                <span style={{ color: '#FFFFFF', fontSize: '14px' }}>좌석 번호까지 공개</span>
              </button>
            </div>

            {/* 안내 문구 */}
            <p style={{ fontSize: '10px', color: '#A1A1A1', marginTop: '16px' }}>
              실제 티켓 번호나 티켓 이미지는 공개되지 않으니 안심하세요!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyPageVisibility;