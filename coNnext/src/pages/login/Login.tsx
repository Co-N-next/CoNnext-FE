// src/pages/login/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localLogin } from '../../api/auth';

import BackButton from '../../assets/Icons/back.svg';
import kakaoSymbol from '../../assets/Variables/kakao.svg';
import naverSymbol from '../../assets/Variables/naver.svg';
import googleSymbol from '../../assets/Variables/google.svg';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    try {
      const res = await localLogin(email, password);
      /**
       * ✅ Access Token은 응답 헤더(authorization)로 옴
       * api.ts 응답 인터셉터가 자동으로 감지해서 메모리에 저장함
       * → reissueToken() 별도 호출 불필요
       *
       * Refresh Token은 Set-Cookie(HttpOnly)로 자동 저장됨
       */
      const savedEmail =
        res.data?.payload?.email ?? res.data?.email ?? email;
      const savedNickname =
        res.data?.payload?.nickname ?? res.data?.nickname ?? '';

      sessionStorage.setItem('userEmail', savedEmail);
      if (savedNickname) sessionStorage.setItem('userNickname', savedNickname);

      navigate('/home');
    } catch (err: any) {
      if (err.response?.status === 401) {
        setErrorMessage('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setErrorMessage('로그인에 실패했습니다.');
      }
    }
  };

  const handleSocialLogin = (provider: 'kakao' | 'google' | 'naver') => {
    window.location.href = `https://api.con-next.xyz/oauth2/authorization/${provider}`;
  };

  const inputStyle: React.CSSProperties = {
    width: '345px', height: '42px', borderRadius: '8px', border: 'none',
    backgroundColor: '#1E293B', color: '#A1A1A1', paddingLeft: '16px',
    fontSize: '13px', fontFamily: 'Pretendard', fontWeight: 500,
    lineHeight: '1.3', outline: 'none',
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start" style={{ background: '#0E172A', paddingTop: '110px' }}>
      <div className="flex flex-col w-full max-w-86.25 gap-16">
        <div style={{ width: '342px', height: '118px', position: 'relative' }}>
          <button onClick={() => navigate('/')} className="absolute flex items-start justify-start hover:opacity-70 transition-opacity" style={{ width: '24px', height: '24px' }}>
            <img src={BackButton} alt="뒤로가기" />
          </button>
          <div className="absolute flex" style={{ width: '342px', height: '60px', bottom: '0', left: '0' }}>
            <h1 style={{ fontFamily: 'Pretendard', fontWeight: 600, fontSize: '23px', lineHeight: '1.2', color: '#FFFFFF', margin: 0, alignSelf: 'flex-start', letterSpacing: '-2.5%' }}>
              Co:N-next와 함께 <br />콘서트를 즐길 준비 되셨나요?
            </h1>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col items-center" style={{ gap: '16px' }}>
            <div style={{ width: '345px' }}>
              <label style={{ fontFamily: 'Pretendard', fontWeight: 500, fontSize: '13px', color: '#FFFFFF', marginBottom: '8px', display: 'block', letterSpacing: '-2.5%', lineHeight: '1.3' }}>이메일</label>
              <input type="text" placeholder="이메일을 입력하세요." value={email}
                onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
                style={inputStyle} className="placeholder-[#6B7280]" />
            </div>
            <div style={{ width: '345px' }}>
              <label style={{ fontFamily: 'Pretendard', fontWeight: 400, fontSize: '14px', color: '#FFFFFF', marginBottom: '8px', display: 'block' }}>비밀번호</label>
              <input type="password" placeholder="비밀번호를 입력하세요." value={password}
                onChange={(e) => { setPassword(e.target.value); setErrorMessage(''); }}
                onKeyPress={(e) => { if (e.key === 'Enter') handleLogin(); }}
                style={inputStyle} className="placeholder-[#6B7280]" />
            </div>
          </div>

          {errorMessage && (
            <div style={{ marginTop: '24px', width: '345px', marginLeft: 'auto', marginRight: 'auto' }}>
              <p style={{ fontFamily: 'Pretendard', fontWeight: 400, fontSize: '13px', lineHeight: '130%', letterSpacing: '-2.5%', color: '#FF4848', margin: 0 }}>{errorMessage}</p>
            </div>
          )}

          <div className="flex justify-center" style={{ marginTop: '24px' }}>
            <button onClick={handleLogin} className="flex items-center justify-center transition-all active:scale-[0.98] hover:opacity-90 shadow-md"
              style={{ width: '345px', height: '40px', background: '#7F5AFF', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
              <span style={{ fontFamily: 'Pretendard', fontWeight: 500, fontSize: '13px', lineHeight: '1.3', color: '#FFFFFF', textAlign: 'center' }}>로그인</span>
            </button>
          </div>

          <div className="flex flex-col items-center" style={{ marginTop: '64px' }}>
            <p style={{ fontFamily: 'Pretendard', fontWeight: 400, fontSize: '13px', color: '#FFFFFF', marginBottom: '12px' }}>또는 SNS 계정으로 로그인하기</p>
            <div className="flex items-center justify-center" style={{ gap: '16px' }}>
              <button onClick={() => handleSocialLogin('kakao')} className="relative rounded-full flex items-center justify-center transition-transform active:scale-95 shadow-lg" style={{ width: '40px', height: '40px', backgroundColor: '#FEE500' }}>
                <img src={kakaoSymbol} alt="Kakao" />
              </button>
              <button onClick={() => handleSocialLogin('naver')} className="relative rounded-full flex items-center justify-center transition-transform active:scale-95 shadow-lg" style={{ width: '40px', height: '40px', backgroundColor: '#2DB400' }}>
                <img src={naverSymbol} alt="Naver" />
              </button>
              <button onClick={() => handleSocialLogin('google')} className="relative rounded-full flex items-center justify-center transition-transform active:scale-95 shadow-lg bg-white" style={{ width: '40px', height: '40px' }}>
                <img src={googleSymbol} alt="Google" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center" style={{ position: 'absolute', top: '774px', left: '50%', transform: 'translateX(-50%)', width: '345px' }}>
        <button onClick={() => navigate('/signup')} className="flex items-center justify-center transition-all active:scale-[0.98] hover:opacity-90"
          style={{ width: '345px', height: '40px', backgroundColor: 'transparent', borderRadius: '10px', border: '1px solid #FFFFFF', cursor: 'pointer' }}>
          <span style={{ fontFamily: 'Pretendard', fontWeight: 500, fontSize: '13px', lineHeight: '1.3', color: '#FFFFFF', textAlign: 'center', letterSpacing: '-2.5%' }}>회원가입하기</span>
        </button>
      </div>
    </div>
  );
};

export default Login;