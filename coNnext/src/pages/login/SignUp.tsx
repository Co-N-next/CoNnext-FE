//src/pages/login/SignUp.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  localSignUp,
  checkEmailAvailability,
  getRandomNickname,
} from '../../api/auth';


import BackButton from '../../assets/Icons/back.svg';
import EmailDelete from '../../assets/Icons/x.svg';
import EyeOn from '../../assets/Icons/Eye.svg';
import EyeOff from '../../assets/Icons/Eye_off.svg';
import SelectNone from '../../assets/Icons/SelectNone.svg';
import SelectAll from '../../assets/Icons/SelectAll.svg';
import Unchecked from '../../assets/Icons/Unchecked.svg';
import Checked from '../../assets/Icons/Checked.svg';

import TermsModal from '../../components/modal/TermsModal';

const SignUpScreen: React.FC = () => {
   const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);

  const isPasswordDiff = passwordConfirm.length > 0 && password !== passwordConfirm;
  

  const [agreements, setAgreements] = useState({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // 약관 팝업 상태
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'service' | 'privacy' | 'marketing' | null;
  }>({
    isOpen: false,
    type: null
  });

  // 전체 동의 체크박스 핸들러
  const handleAllAgreement = () => {
    const newValue = !agreements.all;
    setAgreements({
      all: newValue,
      service: newValue,
      privacy: newValue,
      marketing: newValue
    });
  };

  // 개별 동의 체크박스 핸들러
  const handleAgreement = (key: 'service' | 'privacy' | 'marketing') => {
    setAgreements(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // 약관 보기 버튼 핸들러
  const handleShowTerms = (type: 'service' | 'privacy' | 'marketing') => {
    setModalState({
      isOpen: true,
      type
    });
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      type: null
    });
  };

  // 전체 동의 상태 업데이트
  useEffect(() => {
    const allChecked = agreements.service && agreements.privacy && agreements.marketing;
    if (allChecked !== agreements.all) {
      setAgreements(prev => ({ ...prev, all: allChecked }));
    }
  }, [agreements.service, agreements.privacy, agreements.marketing]);

   /* ================= 이메일 중복 체크 ================= */
  const checkEmailDuplicate = async () => {
  // 프론트 1차 형식 체크 (선택)
  if (!emailRegex.test(email)) {
    setEmailError('올바른 이메일 형식이 아닙니다.');
    setIsEmailDuplicate(true);
    return false;
  }

  try {
    await checkEmailAvailability(email);

    // ✅ 200: 사용 가능
    setEmailError('');
    setIsEmailDuplicate(false);
    return true;

  } catch (error: any) {
    const status = error?.response?.status;

    if (status === 400) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else if (status === 409) {
      setEmailError(
        '이 이메일 주소는 사용 중입니다. 다른 메일로 시도하시거나 다시 로그인하세요.'
      );
    } else {
      setEmailError('이메일 확인 중 오류가 발생했습니다.');
    }

    setIsEmailDuplicate(true);
    return false;
  }
};




/* ================= 회원가입 ================= */
 const handleLocalSignUp = async () => {
  const emailValid = await checkEmailDuplicate();
  if (!emailValid) return;

  if (!isFormValid) return;

  try {
    // 서버 스펙: agreedTermIds 배열로 전송
    // 약관 ID는 서버 기준: 서비스(1), 개인정보(2), 마케팅(4) - 실제 ID는 GET /auth/terms 응답 기준
    const agreedTermIds: number[] = [];
    if (agreements.service) agreedTermIds.push(1);
    if (agreements.privacy) agreedTermIds.push(2);
    if (agreements.marketing) agreedTermIds.push(4);

    await localSignUp(email, password, agreedTermIds);

    sessionStorage.setItem('userEmail', email);

    // 회원가입 성공 시 서버가 자동 부여한 닉네임을 가져와 sessionStorage에 저장
    try {
      const nicknameRes = await getRandomNickname();
      const nickname = nicknameRes.data?.payload?.nickname ?? '';
      if (nickname) sessionStorage.setItem('userNickname', nickname);
    } catch {
      // 닉네임 조회 실패해도 회원가입 자체는 성공이므로 무시
    }

    navigate('/home');
  } catch (e: any) {
    if (e?.response?.status === 409) {
      alert('이미 사용 중인 이메일입니다.');
    } else {
      alert('회원가입에 실패했습니다.');
    }
    console.error(e);
  }
};

    /* ================= 폼 유효성 ================= */
  useEffect(() => {
    const valid =
      email.length > 0 &&
      password.length >= 8 &&
      password === passwordConfirm &&
      agreements.service &&
      agreements.privacy &&
      !isEmailDuplicate;

    setIsFormValid(valid);
  }, [
    email,
    password,
    passwordConfirm,
    agreements.service,
    agreements.privacy,
    isEmailDuplicate,
  ]);

  const inputStyle: React.CSSProperties = {
    width: '347px',
    height: '42px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#1E293B',
    color: '#FFFFFF',
    paddingLeft: '16px',
    paddingRight: '16px',
    fontSize: '13px',
    fontFamily: 'Pretendard',
    fontWeight: 500,
    outline: 'none',
  };

  const inputErrorStyle: React.CSSProperties = {
    ...inputStyle,
    border: '0.5px solid #FF4848',
  };

  const inputContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '347px',
    display: 'flex',
    alignItems: 'center'
  };

  const iconButtonStyle: React.CSSProperties = {
    position: 'absolute',
    right: '16px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px'
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center"
      style={{
        background: '#0a1628',
        paddingTop: '60px',
        position: 'relative'
      }}
    >
      <div className="w-full max-w-86.25">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/login')}
          className="mb-6 hover:opacity-70 transition-opacity"
          style={{
            width: '24px',
            height: '24px'
          }}
        >
          <img 
            src={BackButton} 
            alt="뒤로가기" 
          />
        </button>

        {/* Title */}
        <h1 
          className="mb-10"
          style={{
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '23px',
            lineHeight: '1.3',
            color: '#FFFFFF',
            margin: 0,
            marginBottom: '48px'
          }}
        >
          회원가입
        </h1>

        {/* Email Input */}
        <div className="mb-4">
          <label 
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 500,
              fontSize: '13px',
              color: '#E8E8E8',
              marginBottom: '8px',
              display: 'block'
            }}
          >
            이메일
          </label>
          <div style={inputContainerStyle}>
            <input
              type="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
              setIsEmailDuplicate(false);
            }}

              style={isEmailDuplicate ? inputErrorStyle : inputStyle}
              className="placeholder-[#A1A1A1]"
            />
            {email && (
              <button
                onClick={() => {
                  setEmail('');
                  setIsEmailDuplicate(false);
                }}
                style={iconButtonStyle}
              >
                <img src={EmailDelete} alt="삭제" style={{ width: '16px', height: '16px' }} />
              </button>
            )}
          </div>
          {emailError && (
  <p style={{
    fontFamily: 'Pretendard',
    fontSize: '10px',
    color: '#FF4848',
    marginTop: '8px',
    marginLeft: '4px'
  }}>
    {emailError}
  </p>
)}

        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label 
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 400,
              fontSize: '14px',
              color: '#E8E8E8',
              marginBottom: '8px',
              display: 'block'
            }}
          >
            비밀번호
          </label>
          <div style={inputContainerStyle}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="8자 이상의 영문, 숫자로 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              className="placeholder-[#A1A1A1]"
            />
            {password && (
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={iconButtonStyle}
              >
                <img 
                  src={showPassword ? EyeOn : EyeOff} 
                  alt="비밀번호 표시" 
                  style={{ width: '16px', height: '16px' }} 
                />
              </button>
            )}
          </div>
        </div>

        {/* Password Confirm Input */}
        <div className="mb-8">
          <label 
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 400,
              fontSize: '14px',
              color: '#E8E8E8',
              marginBottom: '8px',
              display: 'block'
            }}
          >
            비밀번호 확인
          </label>
          <div style={inputContainerStyle}>
            <input
              type={showPasswordConfirm ? 'text' : 'password'}
              placeholder="동일한 비밀번호를 입력해주세요."
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              style={isPasswordDiff ? inputErrorStyle : inputStyle}
              className="placeholder-[#A1A1A1]"
            />
            {passwordConfirm && (
              <button
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                style={iconButtonStyle}
              >
                <img 
                  src={showPasswordConfirm ? EyeOn : EyeOff} 
                  alt="비밀번호 표시" 
                  style={{ width: '16px', height: '16px' }} 
                />
              </button>
            )}
          </div>
          {isPasswordDiff && (
            <p style={{
              fontFamily: 'Pretendard',
              fontSize: '10px',
              color: '#FF4848',
              marginTop: '8px',
              marginLeft: '4px'
            }}>
              비밀번호가 일치하지 않습니다. 다시 작성해주세요.
            </p>
          )}
        </div>

        {/* Agreements */}
        <div className="mb-8">
          {/* All Agreement */}
          <div 
            className="flex items-center"
            style={{ 
              cursor: 'pointer',
              marginBottom: '14px'
            }}
            onClick={handleAllAgreement}
          >
            <img 
              src={agreements.all ? SelectAll : SelectNone} 
              alt="전체 동의" 
              style={{ marginRight: '8px' }} 
            />
            <span style={{
              fontFamily: 'Pretendard',
              fontSize: '16px',
              fontWeight: 500,
              color: '#E8E8E8'
            }}>
              전체 동의
            </span>
          </div>

          {/* Individual Agreements */}
          <div style={{ marginLeft: '32px' }}>
            {/* Service Agreement */}
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
                <span style={{
                  fontFamily: 'Pretendard',
                  fontSize: '13px',
                  color: '#A1A1A1'
                }}>
                  서비스 이용약관 동의 <span className="text-[#B59FFF]">(필수)</span>
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
                  cursor: 'pointer'
                }}
              >
                보기
              </button>
            </div>

            {/* Privacy Agreement */}
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
                <span style={{
                  fontFamily: 'Pretendard',
                  fontSize: '13px',
                  color: '#A1A1A1'
                }}>
                  개인정보 수집 및 이용 동의 <span className="text-[#B59FFF]">(필수)</span>
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
                  cursor: 'pointer'
                }}
              >
                보기
              </button>
            </div>

            {/* Marketing Agreement */}
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
                <span style={{
                  fontFamily: 'Pretendard',
                  fontSize: '13px',
                  color: '#A1A1A1'
                }}>
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
                  cursor: 'pointer'
                }}
              >
                보기
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="fixed bottom-10 left-1/2 w-86.25 -translate-x-1/2 z-50">
          <button
            onClick={handleLocalSignUp}
            disabled={!isFormValid}
            className={`
              w-86.25 h-10 rounded-[10px] border-none
              font-['Pretendard'] font-medium text-[13px] leading-[130%] tracking-[-0.025em]
              text-[#FFFFFF] transition-all duration-300 opacity-100
              ${
                isFormValid
                  ? 'bg-[#7F5AFF] cursor-pointer hover:opacity-90 active:scale-[0.98]'
                  : 'bg-[#7A7A7A] cursor-not-allowed'
              }
            `}
          >
            다음
          </button>
        </div>
      </div>

      {/* 약관 팝업 모달 */}
      {modalState.type && (
        <TermsModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          type={modalState.type}
        />
      )}
    </div>
  );
};

export default SignUpScreen;