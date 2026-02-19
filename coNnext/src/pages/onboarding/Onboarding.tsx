// src/pages/Onboarding/Onboarding.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoGroup from '../../assets/logo/logo_group.svg';
import StageIcon from '../../assets/logo/stage.svg';
import HeadsetIcon from '../../assets/logo/headset.svg';
import LightstickIcon from '../../assets/logo/lightstick.svg';
import SkipIcon from '../../assets/logo/skip.svg';
import Underline from '../../assets/logo/text_underline.svg';
import Blur from '../../assets/logo/logo_blur.svg';
import Crying from '../../assets/logo/icon_crying.svg';
import Help from '../../assets/logo/help_mark.svg';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showDecorations, setShowDecorations] = useState(false);

  const onboardingSteps = [
    {
      title: '',
      subtitle: '',
      image: LogoGroup,
      isLogo: true,
      duration: 2000,
      showProgress: false,
      showSkip: false,
      progressGroup: 0
    },
    {
      title: '콘서트장... 오기는 했는데',
      subtitle: '제 자리가 어디죠?',
      image: StageIcon, // StageIcon 매칭
      isLogo: false,
      duration: 2500,
      showProgress: true,
      showSkip: true,
      highlightWord: '자리',
      underline: true,
      progressGroup: 1
    },
    {
      title: '콘서트장... 오기는 했는데',
      subtitle: '혼자 관람하기 싫어요.',
      image: HeadsetIcon, // Headset 매칭 (왼쪽)
      secondImage: LightstickIcon, // Lightstick 매칭 (오른쪽)
      isLogo: false,
      duration: 2500,
      showProgress: true,
      showSkip: true,
      highlightWord: '혼자',
      underline: true,
      progressGroup: 2
    },
    {
      title: 'Co:N-next와 함께',
      subtitle: '콘서트를 즐길 준비 되셨나요?',
      image: Blur,
      isLogo: false,
      isFinal: true,
      showProgress: false,
      showSkip: false,
      showBackButton: true,
      progressGroup: 3
    }
  ];

  const currentData = onboardingSteps[currentStep];

  // 타이핑 및 자동넘김 로직 (기존과 동일하여 중략 가능하나 구조 유지를 위해 포함)
  useEffect(() => {
    if (currentData.isLogo || currentData.isFinal) {
      setDisplayedTitle(''); setDisplayedSubtitle(''); setShowDecorations(false);
      return;
    }
    setIsTyping(true); setDisplayedTitle(''); setDisplayedSubtitle(''); setShowDecorations(false);
    let titleIndex = 0;
    const titleInterval = setInterval(() => {
      if (titleIndex <= currentData.title.length) {
        setDisplayedTitle(currentData.title.slice(0, titleIndex));
        titleIndex++;
      } else {
        clearInterval(titleInterval);
        if (currentData.subtitle) {
          let subtitleIndex = 0;
          const subtitleInterval = setInterval(() => {
            if (subtitleIndex <= currentData.subtitle.length) {
              setDisplayedSubtitle(currentData.subtitle.slice(0, subtitleIndex));
              subtitleIndex++;
            } else {
              clearInterval(subtitleInterval); setIsTyping(false);
              setTimeout(() => setShowDecorations(true), 200);
            }
          }, 50);
        } else {
          setIsTyping(false); setTimeout(() => setShowDecorations(true), 200);
        }
      }
    }, 50);
    return () => clearInterval(titleInterval);
  }, [currentStep]);

  useEffect(() => {
    if (!currentData.isFinal && !isTyping) {
      const timer = setTimeout(() => handleNext(), currentData.duration);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isTyping]);

  const handleNext = () => { if (currentStep < onboardingSteps.length - 1) setCurrentStep(currentStep + 1); };
  const handleSkip = () => { if (currentStep < onboardingSteps.length - 1) setCurrentStep(currentStep + 1); };
  const handleBack = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };
  const handleLogin = () => navigate('/login');
  const handleStartWithoutLogin = () => navigate('/home');

  const renderTextWithHighlight = (text: string, highlightWord?: string, useUnderline?: boolean) => {
    if (!highlightWord) return text;
    const parts = text.split(highlightWord);
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ color: '#b59fff' }}>{highlightWord}</span>
                {useUnderline && showDecorations && (
                  <img src={Underline} alt="" 
                  style={{ 
      position: 'absolute', 
      bottom: '-5px', 
      left: '0', 
      width: '100%', 
      height: 'auto',
      // --- 효과 추가 ---
      opacity: showDecorations ? 1 : 0,
      transition: 'opacity 2s ease-out', // 0.6초 동안 스르륵
      pointerEvents: 'none'
    
    }} />)}
              </span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col relative overflow-hidden"
      style={{
        background: 'linear-gradient(344.5deg, #0E172A 13.81%, #4A329F 114.09%)',
        paddingTop: currentData.isLogo ? '0' : '60px'
      }}
    >
      {/* Progress Bar */}
      {currentData.showProgress && (
        <div className="absolute top-0 left-0 right-0 flex" style={{ marginTop: '50px', marginLeft: '20px', marginRight: '20px', gap: '8px', zIndex: 20 }}>
          {[1, 2, 3].map((group) => (
            <div key={group} style={{ flex: 1, height: '3.66px', borderRadius: '4px', backgroundColor: currentData.progressGroup >= group ? '#B59FFF' : '#1A1A1A', transition: 'background-color 0.3s ease' }} />
          ))}
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-between" style={{ paddingBottom: '80px', position: 'relative' }}>
        
        {/* Step 0: Logo */}
        {currentData.isLogo && (
          <div className="flex-1 flex flex-col items-center justify-center relative w-full">
            <img src={currentData.image} alt="로고" style={{ width: '300px', height: 'auto', objectFit: 'contain' }} />
          </div>
        )}

        {/* 2. Step 1 & 2 Text UI */}
{!currentData.isLogo && !currentData.isFinal && (
  <div className="w-full px-6" style={{ marginTop: '50px', zIndex: 10, position: 'relative' }}>
    <h1
      style={{
        fontFamily: 'PretendardSemiBold',
        fontWeight: 600,
        fontSize: '24px',
        color: '#FEFEFEE5',
        textAlign: 'left',
        letterSpacing: '-2.5%',
        lineHeight: '1.4',
        marginBottom: currentData.subtitle ? '8px' : '0',
        position: 'relative'
      }}
    >
      {renderTextWithHighlight(displayedTitle, currentData.highlightWord, false)}
    </h1>

    {/* 데코레이션 아이콘 로직 분리 */}
    {showDecorations && (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none' }}>
        
        {/* [Step 1 전용] Help 아이콘 */}
{currentStep === 1 && (
  <img 
    src={Help} 
    alt="help" 
    style={{ 
      position: 'absolute',
      top: '-40px',
      left: '240px',
      transform: `rotate(10deg) ${showDecorations ? 'translateY(0)' : 'translateY(5px)'}`, // 살짝 올라오는 효과 추가
      // --- 효과 추가 ---
      opacity: showDecorations ? 1 : 0,
      transition: 'opacity 2s ease-out, transform 2s ease-out',
      zIndex: 20
    }} 
  />
)}

{/* [Step 2 전용] Crying 아이콘들 */}
{currentStep === 2 && (
  <>
    <img 
      src={Crying} 
      alt="crying_1" 
      style={{ 
        position: 'absolute',
        top: '-30px',
        left: '240px',
        transform: `rotate(-7deg) ${showDecorations ? 'scale(1)' : 'scale(0.8)'}`, // 살짝 커지는 효과 추가
        // --- 효과 추가 ---
        opacity: showDecorations ? 1 : 0,
        transition: 'opacity 2s ease-out, transform 2s ease-out',
        zIndex: 20
      }} 
    />

    <img 
      src={Crying} 
      alt="crying_2" 
      style={{ 
        position: 'absolute',
        top: '35px',
        left: '218px',
        transform: `rotate(35deg) ${showDecorations ? 'scale(1)' : 'scale(0.8)'}`,
        // --- 효과 추가 ---
        opacity: showDecorations ? 1 : 0,
        transition: 'opacity 2s ease-out 2s', // 0.2초 딜레이를 주어 순차적으로 등장
        zIndex: 20
      }} 
    />
  </>
)}
      </div>
    )}

    {currentData.subtitle && displayedSubtitle && (
      <h2
        style={{
          fontFamily: 'PretendardSemiBold',
          fontWeight: 600,
          fontSize: '24px',
          color: '#FEFEFEE5',
          textAlign: 'left',
          letterSpacing: '-2.5%',
          lineHeight: '1.4',
          position: 'relative',
          display: 'inline-block'
        }}
      >
        {renderTextWithHighlight(displayedSubtitle, currentData.highlightWord, currentData.underline)}
      </h2>
    )}
  </div>
)}

        {/* --- 이미지 레이아웃 핵심 수정 구간 --- */}
        {!currentData.isLogo && currentData.image && !currentData.isFinal && (
          <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}>
            {currentData.secondImage ? (
  <div style={{ 
    position: 'absolute', 
    width: '100%', 
    height: '100%', 
    top: 0, 
    left: 0, 
    zIndex: 1, 
    pointerEvents: 'none',
    
  }}>
    {/* 1. LightstickIcon (오른쪽 뒤편에서 뻗어 나옴) */}
    <img
      src={currentData.secondImage}
      alt="lightstick"
      style={{
        width: '450px',
        height: '450px',
        position: 'absolute',
        bottom: '120px', // 하단에서 위로 배치
        right: '-57px',  // 우측으로 살짝 나감
        transform: 'rotate(0deg)', // 별 부분이 위를 향하도록 조정
        opacity: 1,
        objectFit: 'contain',
        zIndex: 1 // 헤드셋보다 뒤에 위치
      }}
    />

    {/* 2. HeadsetIcon (왼쪽 앞면에 크게 배치) */}
    <img
      src={currentData.image}
      alt="headset"
      style={{
        width: '460px', // 이미지 느낌에 맞춰 크기 살짝 키움
        height: '460px',
        position: 'absolute',
        bottom: '100px', // 하단에 걸치도록
        left: '-20px',   // 왼쪽으로 반쯤 나감
        transform: 'rotate(0deg)', // 살짝 오른쪽으로 기운 느낌
        opacity: 1,
        objectFit: 'contain',
        zIndex: 2 // 응원봉보다 앞에 위치
      }}
    />
  </div>
            ) : (
              /* 3. StageIcon (중앙 하단) */
              <img
                src={currentData.image}
                alt="stage"
                style={{
                  width: '800px',
                  height: '800px',
                  position: 'absolute',
                  top: '50px',
                  left: '40px',
                  transform: 'rotate(-2deg)',
                  opacity: 1,
                  objectFit: 'contain'
                }}
              />
            )}
          </div>
        )}
        {/* ---------------------------------- */}

        {/* Step 3: Final */}
        {currentData.isFinal && (
          <>
            <div className="absolute flex flex-col" style={{ width: '258px', height: '116px', top: '50px', left: '38px', gap: '32px', zIndex: 10 }}>
              <button onClick={handleBack} style={{ width: '24px', height: '24px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div style={{ width: '280px', height: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h1 style={{ fontFamily: 'PretendardSemiBold', fontWeight: 600, fontSize: '23px', color: '#FEFEFE', textAlign: 'left', letterSpacing: '-2.5%', lineHeight: '1.3', margin: 0 }}>
                  {currentData.title}<br />{currentData.subtitle}
                </h1>
              </div>
            </div>
            <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 1 }}>
              <img src={Blur} alt="blur" style={{ width: 'auto', height: 'auto', position: 'absolute', top: '48%', left: '64%', transform: 'translate(-50%, -50%)', opacity: 0.8 }} />
            </div>
            <div className="absolute w-full px-6" style={{ bottom: '80px', left: 0, zIndex: 20 }}>
              <div className="flex flex-col items-center" style={{ gap: '12px', width: '100%' }}>
                <button onClick={handleStartWithoutLogin} className="flex items-center justify-center" style={{ width: '345px', height: '40px', backgroundColor: '#7A7A7A', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
                  <span style={{ fontFamily: 'PretendardMedium', fontSize: '13px', color: '#FEFEFE' }}>로그인 없이 시작하기</span>
                </button>
                <button onClick={handleLogin} className="flex items-center justify-center" style={{ width: '345px', height: '40px', backgroundColor: '#7F5AFF', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
                  <span style={{ fontFamily: 'PretendardMedium', fontSize: '13px', color: '#FEFEFE' }}>로그인하기</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Skip Button */}
        {currentData.showSkip && (
          <button onClick={handleSkip} className="transition-opacity hover:opacity-70" style={{ position: 'absolute', bottom: '30px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, zIndex: 30 }}>
            <img src={SkipIcon} alt="건너뛰기" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;