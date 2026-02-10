import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import api from "../../api/api.ts";

import BackButton from '../../assets/logo/BackButton.svg';
import kakaoSymbol from '../../assets/logo/kakaotalkSymbol.svg';
import naverSymbol from '../../assets/logo/naverSymbol.svg';
import googleSymbol from '../../assets/logo/googleSymbol.svg';


const LoginScreen: React.FC = () => {
  const navigate = useNavigate()

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')



  const inputStyle: React.CSSProperties = {
    width: '345px',
    height: '42px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#1E293B',
    color: '#A1A1A1',
    paddingLeft: '16px',
    fontSize: '13px',
    fontFamily: 'PretendardMedium',
    fontWeight: 500,
    lineHeight: '1.3',
    outline: 'none',
  };

  const handleLogin = async () => {
    if (!id || !password) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const res = await api.post(
        "/auth/login/local",
        { email: id, password },
        { withCredentials: true } // 🔥 refresh 쿠키 받기 필수
      );

      // ✅ 1. HTTP 200이면 무조건 성공
      const authHeader =
        res.headers["authorization"] || res.headers["Authorization"];

      // ✅ 2. Access Token이 있으면 저장 (있을 수도 있고 없을 수도 있음)
      if (authHeader) {
        localStorage.setItem(
          "accessToken",
          authHeader.replace("Bearer ", "")
        );
      }

      setErrorMessage("");
      navigate("/");

    } catch (error: any) {
      const status = error.response?.status;

      if (status === 401) {
        setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else if (status === 403) {
        setErrorMessage("탈퇴한 회원입니다.");
      } else {
        setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start"
      style={{
        background: '#0E172A',
        paddingTop: '110px'
      }}>

      {/* 전체 컨테이너 - 두 박스를 세로로 배치 */}
      <div className="flex flex-col w-full max-w-86.25 gap-16">

        {/* 첫 번째 박스: Back Button + 로고 + ? 버튼 */}
        <div
          style={{
            width: '342px',
            height: '118px',
            position: 'relative'
          }}
        >

          {/* Back Button */}
          <button
            onClick={() => navigate('/splash')}
            className="absolute flex items-start justify-start hover:opacity-70 transition-opacity"
            style={{
              width: '24px',
              height: '24px',
              top: '0',
              left: '0'
            }}
          >
            <img
              src={BackButton}
              alt="뒤로가기"
              style={{
                width: '8px',
                height: '14px',
                marginTop: '6px',
                marginLeft: '8px'
              }}
            />
          </button>

          {/* 하단 작은 박스 (342x60)*/}
          <div
            className="absolute flex"
            style={{
              width: '342px',
              height: '60px',
              bottom: '0',
              left: '0'
            }}
          >
            {/* Co:N-next */}
            <h1
              style={{
                fontFamily: 'PretendardSemiBold',
                fontWeight: 600,
                fontSize: '23px',
                lineHeight: '1.2',
                color: '#FFFFFF',
                margin: 0,
                alignSelf: 'flex-start',
                letterSpacing: '-2.5%'
              }}
            >
              Co:N-next와 함께 <br />
              콘서트를 즐길 준비 되셨나요?
            </h1>


          </div>
        </div>

        {/* 두 번째 박스: input + 로그인버튼 + links + 로고 */}
        <div
          className="flex flex-col"
        >
          <div
            className="flex flex-col items-center"
            style={{ gap: '16px' }}
          >
            {/* 이메일 라벨 추가 */}
            <div style={{ width: '345px' }}>
              <label
                style={{
                  fontFamily: 'PretendardMedium',
                  fontWeight: 500,
                  fontSize: '13px',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block',
                  letterSpacing: '-2.5%',
                  lineHeight: '1.3',
                }}
              >
                이메일
              </label>
              <input
                type="text"
                placeholder="이메일을 입력하세요."
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  setErrorMessage(''); // 입력 시 에러 메시지 제거
                }}
                style={inputStyle}
                className="placeholder-[#6B7280]"
              />
            </div>

            {/* 비밀번호 라벨 추가 */}
            <div style={{ width: '345px' }}>
              <label
                style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block'
                }}
              >
                비밀번호
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage(''); // 입력 시 에러 메시지 제거
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin();
                  }
                }}
                style={inputStyle}
                className="placeholder-[#6B7280]"
              />
            </div>
          </div>

          {/* 에러 메시지 */}
          {errorMessage && (
            <div style={{ marginTop: '24px', width: '345px', marginLeft: 'auto', marginRight: 'auto' }}>
              <p
                style={{
                  fontFamily: 'PretendardRegular',
                  fontWeight: 400,
                  fontSize: '13px',
                  lineHeight: '130%',
                  letterSpacing: '-2.5%',
                  color: '#FF4848',
                  margin: 0
                }}
              >
                {errorMessage}
              </p>
            </div>
          )}

          {/* 로그인 버튼 */}
          <div className="flex justify-center" style={{ marginTop: '24px' }}>
            <button
              onClick={handleLogin}
              className="flex items-center justify-center transition-all active:scale-[0.98] hover:opacity-90 shadow-md"
              style={{
                width: '345px',
                height: '40px',
                background: '#7F5AFF',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                opacity: 1
              }}
            >
              <span
                style={{
                  fontFamily: 'PretendardMedium',
                  fontWeight: 500,
                  fontSize: '13px',
                  lineHeight: '1.3',
                  color: '#FFFFFF',
                  textAlign: 'center',
                  letterSpacing: '0%',
                  opacity: 1
                }}
              >
                로그인
              </span>
            </button>
          </div>

          <div className="flex flex-col items-center" style={{ marginTop: '64px' }}> {/* 34px -> 48px */}
            <p
              style={{
                fontFamily: 'PretendardRegular',
                fontWeight: 400,
                fontSize: '13px',
                color: '#FFFFFF',
                marginBottom: '12px'
              }}
            >
              또는 SNS 계정으로 로그인하기
            </p>

            <div className="flex items-center justify-center" style={{ gap: '16px' }}>
              {/* Kakao */}
              <button
                onClick={() => navigate('/socialsignup')}
                className="relative rounded-full flex items-center justify-center transition-transform active:scale-95 shadow-lg"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#FEE500'
                }}
              >
                <img
                  src={kakaoSymbol}
                  alt="Kakao"
                  style={{
                    width: '24px',
                    height: '24px'
                  }}
                />
              </button>

              {/* Naver */}
              <button
                className="relative rounded-full flex items-center justify-center transition-transform active:scale-95 shadow-lg"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#2DB400'
                }}
              >
                <img
                  src={naverSymbol}
                  alt="Naver"
                  style={{
                    width: '24px',
                    height: '24px'
                  }}
                />
              </button>

              {/* Google */}
              <button
                className="relative rounded-full flex items-center justify-center transition-transform active:scale-95 shadow-lg bg-white"
                style={{
                  width: '40px',
                  height: '40px'
                }}
              >
                <img
                  src={googleSymbol}
                  alt="Google"
                  style={{
                    width: '24px',
                    height: '24px'
                  }}
                />
              </button>
            </div>
          </div>

        </div>
      </div>


      {/* 회원가입 버튼 - 수정됨 */}
      <div
        className="flex justify-center"
        style={{
          position: 'absolute',
          top: '774px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '345px'
        }}
      >
        <button
          onClick={() => navigate('/signup')}
          className="flex items-center justify-center transition-all active:scale-[0.98] hover:opacity-90"
          style={{
            width: '345px',
            height: '40px',
            backgroundColor: 'transparent',
            borderRadius: '10px',
            border: '1px solid #FFFFFF',
            cursor: 'pointer',
            opacity: 1
          }}
        >
          <span
            style={{
              fontFamily: 'PretendardMedium',
              fontWeight: 500,
              fontSize: '13px',
              lineHeight: '1.3',
              color: '#FFFFFF',
              textAlign: 'center',
              letterSpacing: '-2.5%',
              opacity: 1
            }}
          >
            회원가입하기
          </span>
        </button>
      </div>




    </div>



  );
};

export default LoginScreen;