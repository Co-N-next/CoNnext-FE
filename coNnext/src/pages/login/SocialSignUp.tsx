import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BackButton from '../../assets/Icons/back.svg';
import EmailDelete from '../../assets/Icons/x.svg';
import CheckboxOn from '../../assets/Icons/Checked.svg';
import CheckboxOff from '../../assets/Icons/Unchecked.svg';

const SignUpScreen: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false); // 이메일 중복 여부
  
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
      agreements.service &&
      agreements.privacy &&
      agreements.marketing &&
      !isEmailDuplicate;
    
    setIsFormValid(isValid);
  }, [email, agreements, isEmailDuplicate]);

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
    marginBottom: '32px',
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
      <div className="w-full max-w-[345px]">
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
              src={agreements.all ? CheckboxOn : CheckboxOff} 
              alt="전체 동의" 
              style={{ width: '19px', height: '19px', marginRight: '8px' }} 
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
                  src={agreements.service ? CheckboxOn : CheckboxOff} 
                  alt="서비스 이용약관" 
                  style={{ width: '19px', height: '19px', marginRight: '8px' }} 
                />
                <span style={{
                  fontFamily: 'PretendardMedium',
                  fontSize: '13px',
                  color: '#A1A1A1'
                }}>
                  서비스 이용약관 동의 (필수)
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
                  src={agreements.privacy ? CheckboxOn : CheckboxOff} 
                  alt="개인정보 수집" 
                  style={{ width: '19px', height: '19px', marginRight: '8px' }} 
                />
                <span style={{
                  fontFamily: 'PretendardMedium',
                  fontSize: '13px',
                  color: '#A1A1A1'
                }}>
                  개인정보 수집 및 이용 동의 (필수)
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
                  src={agreements.marketing ? CheckboxOn : CheckboxOff} 
                  alt="마케팅 이용" 
                  style={{ width: '19px', height: '19px', marginRight: '8px' }} 
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
        <div
          style={{
            position: 'absolute',
            top: '774px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '345px'
          }}
        >
          <button
            onClick={() => {
              if (isFormValid) {
                navigate('/');
              }
            }}
            disabled={!isFormValid}
            style={{
               width: '345px',
              height: '40px',
              borderRadius: '10px',
              border: 'none',
              background: isFormValid ? '#7F5AFF' : '#7A7A7A',
              color: '#FFFFFF',
              fontFamily: 'PretendardMedium',
              fontWeight: 500,
              fontSize: '13px',
              lineHeight: '130%',
              letterSpacing: '-0.025em',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              opacity: 1
            }}
            className={isFormValid ? 'hover:opacity-90 active:scale-[0.98]' : ''}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;