import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getVisibilitySettings,
  updateVisibilitySettings,
  type PerformanceVisibility,
  type SeatVisibility,
} from '../../api/auth';

import BackIcon from '../../assets/Icons/back.svg';
import CheckedCircle from '../../assets/Icons/checked_circle.svg';
import UncheckedCircle from '../../assets/Icons/unchecked_circle.svg';

// API 값 ↔ UI 상태 매핑
const PERF_VIS_MAP: Record<PerformanceVisibility, 'all' | 'following'> = {
  TODAY_ONLY: 'all',
  ALL: 'following',
};
const PERF_VIS_REVERSE: Record<'all' | 'following', PerformanceVisibility> = {
  all: 'TODAY_ONLY',
  following: 'ALL',
};

const SEAT_VIS_MAP: Record<SeatVisibility, 'section' | 'row' | 'number'> = {
  SECTION_ONLY: 'section',
  ROW_ONLY: 'row',
  EXACT_SEAT: 'number',
};
const SEAT_VIS_REVERSE: Record<'section' | 'row' | 'number', SeatVisibility> = {
  section: 'SECTION_ONLY',
  row: 'ROW_ONLY',
  number: 'EXACT_SEAT',
};

const MyPageVisibility: React.FC = () => {
  const navigate = useNavigate();

  const [publicInfoRange, setPublicInfoRange] = useState<'all' | 'following'>('following');
  const [seatInfoRange, setSeatInfoRange] = useState<'section' | 'row' | 'number'>('number');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 초기 설정 조회
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getVisibilitySettings();
        const payload = res.data?.payload;
        if (payload) {
          setPublicInfoRange(PERF_VIS_MAP[payload.performanceVisibility] ?? 'following');
          setSeatInfoRange(SEAT_VIS_MAP[payload.seatVisibility] ?? 'number');
        }
      } catch (error) {
        console.error('공개 범위 설정 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // 변경 시 즉시 저장 (공연 공개 범위)
  const handlePublicInfoChange = async (value: 'all' | 'following') => {
    setPublicInfoRange(value);
    setIsSaving(true);
    try {
      await updateVisibilitySettings({
        performanceVisibility: PERF_VIS_REVERSE[value],
        seatVisibility: SEAT_VIS_REVERSE[seatInfoRange],
      });
    } catch (error) {
      console.error('공개 범위 설정 저장 실패:', error);
      // 실패 시 롤백
      setPublicInfoRange(publicInfoRange);
    } finally {
      setIsSaving(false);
    }
  };

  // 변경 시 즉시 저장 (좌석 공개 범위)
  const handleSeatInfoChange = async (value: 'section' | 'row' | 'number') => {
    setSeatInfoRange(value);
    setIsSaving(true);
    try {
      await updateVisibilitySettings({
        performanceVisibility: PERF_VIS_REVERSE[publicInfoRange],
        seatVisibility: SEAT_VIS_REVERSE[value],
      });
    } catch (error) {
      console.error('좌석 공개 범위 설정 저장 실패:', error);
      // 실패 시 롤백
      setSeatInfoRange(seatInfoRange);
    } finally {
      setIsSaving(false);
    }
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
      className="min-h-screen flex flex-col items-center"
      style={{
        paddingTop: '32px',
        width: '405px',
        background: '#0E172A',
        margin: '0 auto',
        opacity: isSaving ? 0.85 : 1,
        transition: 'opacity 0.2s',
      }}
    >
      <div
        className="flex items-center"
        style={{
          width: '393px',
          height: '24px',
          marginTop: '16px',
          marginBottom: '24px',
          paddingLeft: '24px',
          gap: '12px',
          opacity: 1,
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
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '20px',
            color: '#FFFFFF',
            letterSpacing: '-2.5%',
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
          <div style={{ width: '329px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#FEFEFE', marginBottom: '8px' }}>공연 정보 공개 범위</h2>
            <p style={{ fontSize: '13px', color: '#E8E8E8', lineHeight: '1.5' }}>
              메이트에게 어떤 공연까지 보여줄 지 선택할 수 있어요.
            </p>

            <div className="flex flex-col" style={{ marginTop: '24px', gap: '4px' }}>
              <button
                onClick={() => handlePublicInfoChange('all')}
                className="flex items-center"
                style={{ width: '329px', height: '42px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <img
                  src={publicInfoRange === 'all' ? CheckedCircle : UncheckedCircle}
                  style={{ width: '24px', height: '24px', marginRight: '12px' }}
                />
                <span style={{ color: '#FFFFFF', fontSize: '14px' }}>오늘의 공연만 공개</span>
              </button>
              <button
                onClick={() => handlePublicInfoChange('following')}
                className="flex items-center"
                style={{ width: '329px', height: '42px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <img
                  src={publicInfoRange === 'following' ? CheckedCircle : UncheckedCircle}
                  style={{ width: '24px', height: '24px', marginRight: '12px' }}
                />
                <span style={{ color: '#FFFFFF', fontSize: '14px' }}>예매한 모든 공연 공개</span>
              </button>
            </div>
          </div>
        </div>

        {/* 중간 구분선 */}
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

            <div className="flex flex-col" style={{ marginTop: '24px', gap: '4px' }}>
              <button
                onClick={() => handleSeatInfoChange('section')}
                className="flex items-center"
                style={{ width: '329px', height: '42px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <img
                  src={seatInfoRange === 'section' ? CheckedCircle : UncheckedCircle}
                  style={{ width: '24px', height: '24px', marginRight: '12px' }}
                />
                <span style={{ color: '#FFFFFF', fontSize: '14px' }}>구역까지만 공개</span>
              </button>
              <button
                onClick={() => handleSeatInfoChange('row')}
                className="flex items-center"
                style={{ width: '329px', height: '42px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <img
                  src={seatInfoRange === 'row' ? CheckedCircle : UncheckedCircle}
                  style={{ width: '24px', height: '24px', marginRight: '12px' }}
                />
                <span style={{ color: '#FFFFFF', fontSize: '14px' }}>열까지만 공개</span>
              </button>
              <button
                onClick={() => handleSeatInfoChange('number')}
                className="flex items-center"
                style={{ width: '329px', height: '42px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <img
                  src={seatInfoRange === 'number' ? CheckedCircle : UncheckedCircle}
                  style={{ width: '24px', height: '24px', marginRight: '12px' }}
                />
                <span style={{ color: '#FFFFFF', fontSize: '14px' }}>좌석 번호까지 공개</span>
              </button>
            </div>

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