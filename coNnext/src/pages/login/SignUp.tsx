import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BackButton from '../../assets/logo/BackButton.svg';
import EmailDelete from '../../assets/logo/EmailDelete.svg';
import EyeOn from '../../assets/logo/EyeOn.svg';
import EyeOff from '../../assets/logo/EyeOff.svg';
import SelectNone from '../../assets/logo/SelectNone.svg';
import SelectAll from '../../assets/logo/SelectAll.svg';
import Unchecked from '../../assets/logo/Unchecked.svg';
import Checked from '../../assets/logo/Checked.svg';

const SignUpScreen: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false); // 이메일 중복 여부
  
  const isPasswordDiff = passwordConfirm.length > 0 && password !== passwordConfirm;

  const [agreements, setAgreements] = useState({
    all: false,
    service: false,
    privacy: false,
    marketing: false
  });

  const [isFormValid, setIsFormValid] = useState(false);

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

  // 전체 동의 상태 업데이트
  useEffect(() => {
    const allChecked = agreements.service && agreements.privacy && agreements.marketing;
    if (allChecked !== agreements.all) {
      setAgreements(prev => ({ ...prev, all: allChecked }));
    }
  }, [agreements.service, agreements.privacy, agreements.marketing]);

  // 폼 유효성 검사
  useEffect(() => {
    const isValid = 
      email.length > 0 &&
      password.length >= 8 &&
      password === passwordConfirm && // 비밀번호 일치 확인
      agreements.service &&
      agreements.privacy &&
      agreements.marketing &&
      !isEmailDuplicate;
    
    setIsFormValid(isValid);
  }, [email, password, passwordConfirm, agreements, isEmailDuplicate]);

  // 이메일 중복 체크 (임시 - 추후 백엔드 연동)
  const checkEmailDuplicate = (emailValue: string) => {
    // 임시로 특정 이메일을 중복으로 처리
    if (emailValue === 'test@example.com') {
      setIsEmailDuplicate(true);
    } else {
      setIsEmailDuplicate(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    checkEmailDuplicate(value);
  };

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
    fontFamily: 'PretendardMedium',
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
            style={{ 
              width: '6px', 
              height: '12px'
            }} 
          />
        </button>

        {/* Title */}
        <h1 
          className="mb-10"
          style={{
            fontFamily: 'PretendardSemiBold',
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
              fontFamily: 'PretendardMedium',
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
              onChange={handleEmailChange}
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
          {isEmailDuplicate && (
            <p style={{
              fontFamily: 'PretendardRegular',
              fontSize: '10px',
              color: '#FF4848',
              marginTop: '8px',
              marginLeft: '4px'
            }}>
              이 이메일 주소는 사용 중입니다. 다른 메일로 시도하시거나 다시 로그인하세요.
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
          {/* 비밀번호 불일치 안내 문구 추가 */}
          {isPasswordDiff && (
            <p style={{
              fontFamily: 'PretendardRegular',
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
              marginBottom: '14px' // 전체 동의와 아래 박스 간격
            }}
            onClick={handleAllAgreement}
          >
            <img 
              src={agreements.all ? SelectAll : SelectNone} 
              alt="전체 동의" 
              style={{  marginRight: '8px' }} 
            />
            <span style={{
              fontFamily: 'PretendardMedium',
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
              style={{ marginBottom: '16px' }} // 16px 간격
            >
              <div 
                className="flex items-center"
                style={{ cursor: 'pointer' }}
                onClick={() => handleAgreement('service')}
              >
                <img 
                  src={agreements.service ? Checked : Unchecked} 
                  alt="서비스 이용약관" 
                  style={{  marginRight: '8px' }} 
                />
                <span style={{
                  fontFamily: 'PretendardMedium',
                  fontSize: '13px',
                  color: '#A1A1A1'
                }}>
                  서비스 이용약관 동의 <span className="text-[#B59FFF]">(필수)</span>
                </span>
              </div>
              <button style={{
                fontFamily: 'PretendardMedium',
                fontSize: '13px',
                color: '#A1A1A1',
                textDecoration: 'underline',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}>
                보기
              </button>
            </div>

            {/* Privacy Agreement */}
            <div 
              className="flex items-center justify-between"
              style={{ marginBottom: '16px' }} // 16px 간격
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
                  fontFamily: 'PretendardMedium',
                  fontSize: '13px',
                  color: '#A1A1A1'
                }}>
                  개인정보 수집 및 이용 동의 <span className="text-[#B59FFF]">(필수)</span>
                </span>
              </div>
              <button style={{
                fontFamily: 'PretendardMedium',
                fontSize: '13px',
                color: '#A1A1A1',
                textDecoration: 'underline',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}>
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
                  style={{  marginRight: '8px' }} 
                />
                <span style={{
                  fontFamily: 'PretendardMedium',
                  fontSize: '13px',
                  color: '#A1A1A1'
                }}>
                  마케팅 이용 동의 (선택)
                </span>
              </div>
              <button style={{
                fontFamily: 'PretendardMedium',
                fontSize: '13px',
                color: '#A1A1A1',
                textDecoration: 'underline',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}>
                보기
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button - 수정됨 */}
        <div className="fixed bottom-10 left-1/2 w-86.25 -translate-x-1/2 z-50">
      <button
        onClick={() => {
          if (isFormValid) {
            navigate('/');
          }
        }}
        disabled={!isFormValid}
        className={`
          w-86.25 h-10 rounded-[10px] border-none
          font-['PretendardMedium'] font-medium text-[13px] leading-[130%] tracking-[-0.025em]
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
    </div>
  );
};

export default SignUpScreen;