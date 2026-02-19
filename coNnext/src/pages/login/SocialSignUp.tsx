// src/pages/login/SocialSignUp.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getSocialSignUpInfo,
  socialSignUp,
  getRandomNickname,
  reissueToken,
} from '../../api/auth';

import BackButton from '../../assets/Icons/back.svg';
import SelectNone from '../../assets/Icons/SelectNone.svg';
import SelectAll from '../../assets/Icons/SelectAll.svg';
import Unchecked from '../../assets/Icons/Unchecked.svg';
import Checked from '../../assets/Icons/Checked.svg';

import TermsModal from '../../components/modal/TermsModal';

const SocialSignUp: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isLoadingEmail, setIsLoadingEmail] = useState(true);

  const [agreements, setAgreements] = useState({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'service' | 'privacy' | 'marketing' | null;
  }>({ isOpen: false, type: null });

  // ── 페이지 진입 시 Signup Token으로 이메일 자동 조회 ──────────
  useEffect(() => {
    const fetchSocialInfo = async () => {
      try {
        const res = await getSocialSignUpInfo();
        /**
         * 백엔드 응답 스펙: { email: "qwer@example.com" }
         * 일부 서버는 { payload: { email: "..." } } 로 감싸기도 하므로 둘 다 대응
         */
        const fetchedEmail =
          res.data?.email ?? (res.data as any)?.payload?.email ?? '';
        setEmail(fetchedEmail);
        if (fetchedEmail) sessionStorage.setItem('userEmail', fetchedEmail);
      } catch (error: any) {
        console.error('소셜 회원가입 정보 조회 실패:', error);
        if (error.response?.status === 401) {
          // Signup Token 없음/만료 → 로그인으로
          alert('소셜 로그인이 필요합니다.');
          navigate('/login');
        } else if (error.response?.status === 403) {
          // 이미 가입 완료된 유저(ACTIVE) → reissue 후 홈으로
          try {
            await reissueToken();
          } catch {
            // reissue 실패해도 홈으로 보냄
          }
          navigate('/home');
        }
      } finally {
        setIsLoadingEmail(false);
      }
    };
    fetchSocialInfo();
  }, [navigate]);

  // ── 약관 동의 핸들러 ──────────────────────────────────────────
  const handleAllAgreement = () => {
    const newValue = !agreements.all;
    setAgreements({
      all: newValue,
      service: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  const handleAgreement = (key: 'service' | 'privacy' | 'marketing') => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleShowTerms = (type: 'service' | 'privacy' | 'marketing') => {
    setModalState({ isOpen: true, type });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  // 개별 체크 → 전체 체크 동기화
  useEffect(() => {
    const allChecked =
      agreements.service && agreements.privacy && agreements.marketing;
    if (allChecked !== agreements.all) {
      setAgreements((prev) => ({ ...prev, all: allChecked }));
    }
  }, [agreements.service, agreements.privacy, agreements.marketing]);

  // 필수 약관(service, privacy) 체크 시 제출 버튼 활성화
  useEffect(() => {
    setIsFormValid(agreements.service && agreements.privacy);
  }, [agreements.service, agreements.privacy]);

  // ── 소셜 회원가입 제출 ────────────────────────────────────────
  const handleSocialSignUp = async () => {
    if (!isFormValid || isLoading) return;
    setIsLoading(true);
    setErrorMessage('');

    try {
      /**
       * 약관 ID 배열 구성 (백엔드 스펙 기준)
       * 1: 서비스 이용약관, 2: 개인정보 수집 및 이용, 4: 마케팅 이용 동의
       */
      const agreedTermIds: number[] = [];
      if (agreements.service) agreedTermIds.push(1);
      if (agreements.privacy) agreedTermIds.push(2);
      if (agreements.marketing) agreedTermIds.push(4);

      // 1단계: 소셜 회원가입 (Signup Token 쿠키로 서버가 이메일 처리)
      await socialSignUp(agreedTermIds);

      /**
       * 2단계: Access Token 재발급 (필수)
       * 소셜 회원가입 성공 후 Refresh Token이 발급되므로
       * reissue를 호출해야 실제 Access Token을 얻을 수 있음
       */
      await reissueToken();

      // 3단계: 닉네임 조회 후 sessionStorage 저장 (선택)
      try {
        const nicknameRes = await getRandomNickname();
        const nickname =
          nicknameRes.data?.payload?.nickname ??
          nicknameRes.data?.nickname ??
          '';
        if (nickname) sessionStorage.setItem('userNickname', nickname);
      } catch {
        // 닉네임 조회 실패는 무시하고 계속 진행
      }

      navigate('/home');
    } catch (error: any) {
      console.error('소셜 회원가입 실패:', error);
      const status = error.response?.status;
      if (status === 401) {
        setErrorMessage(
          '회원가입 토큰이 만료되었습니다. 다시 소셜 로그인해주세요.'
        );
      } else if (status === 400) {
        setErrorMessage(
          error.response?.data?.message ?? '유효하지 않은 요청입니다.'
        );
      } else {
        setErrorMessage(
          error.response?.data?.message ?? '회원가입에 실패했습니다.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── 로딩 화면 ─────────────────────────────────────────────────
  if (isLoadingEmail) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center"
        style={{ background: '#0a1628' }}
      >
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
      </div>
    );
  }

  // ── UI ────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center"
      style={{ background: '#0a1628', paddingTop: '60px' }}
    >
      <div className="w-full max-w-[345px]">
        {/* 뒤로가기 */}
        <button onClick={() => navigate('/login')} className="mb-6">
          <img src={BackButton} alt="뒤로가기" />
        </button>

        <h1 className="mb-12 text-white text-[23px] font-semibold">
          회원가입
        </h1>

        {/* 이메일 (읽기 전용 - Signup Token으로 자동 조회) */}
        <label className="text-[#E8E8E8] text-[13px] mb-2 block">
          이메일
        </label>
        <div
          style={{
            width: '345px',
            height: '42px',
            borderRadius: '8px',
            backgroundColor: '#1E293B',
            color: '#7A7A7A',
            padding: '0 16px',
            marginBottom: '32px',
            fontSize: '13px',
            fontFamily: 'Pretendard',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {email || '이메일을 불러오는 중...'}
        </div>

        {/* 약관 동의 */}
        <div className="mb-8">
          {/* 전체 동의 */}
          <div
            className="flex items-center"
            style={{ cursor: 'pointer', marginBottom: '14px' }}
            onClick={handleAllAgreement}
          >
            <img
              src={agreements.all ? SelectAll : SelectNone}
              alt="전체 동의"
              style={{ marginRight: '8px' }}
            />
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '16px',
                fontWeight: 500,
                color: '#E8E8E8',
              }}
            >
              전체 동의
            </span>
          </div>

          <div style={{ marginLeft: '32px' }}>
            {/* 서비스 이용약관 */}
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: '16px' }}
            >
              <div
                className="flex items-center"
                style={{ cursor: 'pointer' }}
                onClick={() => handleAgreement('service')}
              >
                <img
                  src={agreements.service ? Checked : Unchecked}
                  alt="서비스 이용약관"
                  style={{ marginRight: '8px' }}
                />
                <span
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '13px',
                    color: '#A1A1A1',
                  }}
                >
                  서비스 이용약관 동의{' '}
                  <span className="text-[#B59FFF]">(필수)</span>
                </span>
              </div>
              <button
                onClick={() => handleShowTerms('service')}
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '13px',
                  color: '#A1A1A1',
                  textDecoration: 'underline',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                보기
              </button>
            </div>

            {/* 개인정보 수집 */}
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: '16px' }}
            >
              <div
                className="flex items-center"
                style={{ cursor: 'pointer' }}
                onClick={() => handleAgreement('privacy')}
              >
                <img
                  src={agreements.privacy ? Checked : Unchecked}
                  alt="개인정보 수집"
                  style={{ marginRight: '8px' }}
                />
                <span
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '13px',
                    color: '#A1A1A1',
                  }}
                >
                  개인정보 수집 및 이용 동의{' '}
                  <span className="text-[#B59FFF]">(필수)</span>
                </span>
              </div>
              <button
                onClick={() => handleShowTerms('privacy')}
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '13px',
                  color: '#A1A1A1',
                  textDecoration: 'underline',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                보기
              </button>
            </div>

            {/* 마케팅 */}
            <div className="flex items-center justify-between">
              <div
                className="flex items-center"
                style={{ cursor: 'pointer' }}
                onClick={() => handleAgreement('marketing')}
              >
                <img
                  src={agreements.marketing ? Checked : Unchecked}
                  alt="마케팅 이용"
                  style={{ marginRight: '8px' }}
                />
                <span
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '13px',
                    color: '#A1A1A1',
                  }}
                >
                  마케팅 이용 동의 (선택)
                </span>
              </div>
              <button
                onClick={() => handleShowTerms('marketing')}
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '13px',
                  color: '#A1A1A1',
                  textDecoration: 'underline',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                보기
              </button>
            </div>
          </div>
        </div>

        {/* 에러 메시지 */}
        {errorMessage && (
          <p
            style={{
              fontFamily: 'Pretendard',
              fontSize: '13px',
              color: '#FF4848',
              marginBottom: '16px',
            }}
          >
            {errorMessage}
          </p>
        )}

        {/* 제출 버튼 */}
        <button
          onClick={handleSocialSignUp}
          disabled={!isFormValid || isLoading}
          className={`
            w-86.25 h-10 rounded-[10px] border-none
            font-['Pretendard'] font-medium text-[13px] leading-[130%] tracking-[-0.025em]
            text-[#FFFFFF] transition-all duration-300
            ${
              isFormValid && !isLoading
                ? 'bg-[#7F5AFF] cursor-pointer hover:opacity-90 active:scale-[0.98]'
                : 'bg-[#7A7A7A] cursor-not-allowed'
            }
          `}
        >
          {isLoading ? '처리 중...' : '다음'}
        </button>

        {/* 약관 팝업 모달 */}
        {modalState.type && (
          <TermsModal
            isOpen={modalState.isOpen}
            onClose={handleCloseModal}
            type={modalState.type}
          />
        )}
      </div>
    </div>
  );
};

export default SocialSignUp;
