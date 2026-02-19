// src/pages/myPage/MyPageEdit.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomNickname, checkNicknameAvailability, updateNickname } from '../../api/auth';

import ProfileIcon from '../../assets/Variables/mask_off.svg';
import EditIcon from '../../assets/Icons/fix.svg';
import BackIcon from '../../assets/Icons/back.svg';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();

  const [initialNickname, setInitialNickname] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(true);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isChanged =
    nickname.trim() !== initialNickname &&
    nickname.trim().length > 0 &&
    !isNicknameDuplicate &&
    !isChecking;

  // sessionStorage에서 직접 읽기 (/auth/terms/me 500 에러로 API 호출 불필요)
  useEffect(() => {
    const savedNickname = sessionStorage.getItem('userNickname') ?? '';
    const savedEmail = sessionStorage.getItem('userEmail') ?? '';

    if (!savedEmail) {
      // 비로그인 상태면 마이페이지로 돌려보냄
      alert('로그인이 필요합니다.');
      navigate('/mypage');
      return;
    }

    setInitialNickname(savedNickname);
    setNickname(savedNickname);
    setEmail(savedEmail);
    setIsDataLoading(false);
  }, [navigate]);

  // 닉네임 중복 체크 (debounce 500ms)
  const checkDuplicate = useCallback(
    async (value: string) => {
      if (!value || value === initialNickname) {
        setIsNicknameDuplicate(false);
        setErrorMessage('');
        setIsChecking(false);
        return;
      }
      try {
        const res = await checkNicknameAvailability(value);
        const isAvailable =
          res.data?.payload?.available ?? res.data?.available ?? false;
        setIsNicknameDuplicate(!isAvailable);
        setErrorMessage(isAvailable ? '' : '이미 사용 중인 닉네임입니다.');
      } catch {
        setIsNicknameDuplicate(false);
        setErrorMessage('');
      } finally {
        setIsChecking(false);
      }
    },
    [initialNickname]
  );

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    setErrorMessage('');
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (!value || value === initialNickname) {
      setIsNicknameDuplicate(false);
      setIsChecking(false);
      return;
    }
    setIsChecking(true);
    debounceTimer.current = setTimeout(() => checkDuplicate(value), 500);
  };

  // 랜덤 닉네임 자동 생성
  const handleCreateNickname = async () => {
    try {
      const res = await getRandomNickname();
      const generated: string =
        res.data?.payload?.nickname ??
        res.data?.nickname ??
        `커넥도리${Math.floor(Math.random() * 9000) + 1000}`;
      setNickname(generated);
      setIsNicknameDuplicate(false);
      setIsChecking(false);
      setErrorMessage('');
    } catch {
      setNickname(`커넥도리${Math.floor(Math.random() * 9000) + 1000}`);
      setIsNicknameDuplicate(false);
      setIsChecking(false);
      setErrorMessage('');
    }
  };

  // 저장
  const handleSave = async () => {
    if (!isChanged || isLoading) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      await updateNickname(nickname.trim());
      sessionStorage.setItem('userNickname', nickname.trim());
      alert('닉네임이 변경되었습니다.');
      navigate('/mypage');
    } catch (error: any) {
      if (error.response?.status === 409) {
        setErrorMessage('이미 사용 중인 닉네임입니다.');
        setIsNicknameDuplicate(true);
      } else {
        setErrorMessage(
          error.response?.data?.message ?? '닉네임 변경에 실패했습니다. 다시 시도해주세요.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isDataLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center" style={{ background: '#0E172A' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: '#0E172A', paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px' }}
    >
      {/* Header */}
      <div className="flex items-center" style={{ marginBottom: '40px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <img src={BackIcon} alt="뒤로가기" style={{ width: '24px', height: '24px' }} />
        </button>
        <h1 style={{ fontFamily: 'Pretendard', fontWeight: 600, fontSize: '20px', color: '#FFFFFF', marginLeft: '16px' }}>
          내 정보 수정하기
        </h1>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center" style={{ marginBottom: '32px' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
          <div className="flex items-center justify-center" style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#1E293B' }}>
            <img src={ProfileIcon} alt="프로필" className="w-full h-full object-cover" />
          </div>
          <button
            className="flex items-center justify-center transition-transform active:scale-95"
            style={{ position: 'absolute', bottom: 0, right: 0, width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#2a3a5c', border: '3px solid #0E172A', cursor: 'pointer' }}
          >
            <img src={EditIcon} alt="수정" />
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col items-center w-full">

        {/* 닉네임 */}
        <div style={{ marginBottom: '8px', width: '345px' }}>
          <label style={{ fontFamily: 'Pretendard', fontSize: '13px', color: '#FFFFFF', marginBottom: '8px', display: 'block' }}>닉네임</label>
          <div className="flex" style={{ gap: '12px' }}>
            <input
              type="text"
              value={nickname}
              onChange={(e) => handleNicknameChange(e.target.value)}
              placeholder="닉네임을 입력하세요"
              style={{
                width: '219px', height: '42px', borderRadius: '8px',
                border: isNicknameDuplicate ? '1px solid #FF4848' : '1px solid #2a3a5c',
                backgroundColor: '#1E293B', color: '#FFFFFF',
                padding: '0 16px', fontSize: '13px',
                fontFamily: 'Pretendard', outline: 'none',
              }}
            />
            <button
              onClick={handleCreateNickname}
              style={{ width: '118px', height: '42px', backgroundColor: '#414141', borderRadius: '8px', color: '#FFFFFF', fontSize: '13px', fontFamily: 'Pretendard', cursor: 'pointer', border: 'none' }}
            >
              자동 생성
            </button>
          </div>

          {isChecking && (
            <p style={{ fontFamily: 'Pretendard', fontSize: '10px', color: '#A1A1A1', marginTop: '8px' }}>
              닉네임 확인 중...
            </p>
          )}
          {!isChecking && errorMessage && (
            <p style={{ fontFamily: 'Pretendard', fontSize: '10px', color: '#FF4848', marginTop: '8px' }}>
              {errorMessage}
            </p>
          )}
          {!isChecking && !errorMessage && nickname.trim() !== initialNickname && nickname.trim().length > 0 && !isNicknameDuplicate && (
            <p style={{ fontFamily: 'Pretendard', fontSize: '10px', color: '#4ADE80', marginTop: '8px' }}>
              사용 가능한 닉네임입니다.
            </p>
          )}
        </div>

        {/* 이메일 (읽기 전용) */}
        <div style={{ marginBottom: '32px', width: '345px', marginTop: '16px' }}>
          <label style={{ fontFamily: 'Pretendard', fontSize: '13px', color: '#FFFFFF', marginBottom: '8px', display: 'block' }}>이메일 주소</label>
          <input
            type="email"
            value={email}
            readOnly
            style={{
              width: '345px', height: '42px', borderRadius: '8px',
              border: '1px solid #2a3a5c', backgroundColor: '#1E293B',
              color: '#7A7A7A', padding: '0 16px',
              fontFamily: 'Pretendard', fontWeight: 500, fontSize: '13px',
              outline: 'none', cursor: 'default',
            }}
          />
        </div>

        {/* 저장 버튼 */}
        <button
          onClick={handleSave}
          disabled={!isChanged || isLoading}
          className="flex items-center justify-center transition-all active:scale-[0.98]"
          style={{
            width: '345px', height: '40px',
            backgroundColor: isChanged && !isLoading ? '#7F5AFF' : '#7A7A7A',
            border: 'none', borderRadius: '8px',
            color: '#FFFFFF', fontSize: '13px',
            fontFamily: 'Pretendard', fontWeight: 600,
            cursor: isChanged && !isLoading ? 'pointer' : 'not-allowed',
          }}
        >
          {isLoading ? '저장 중...' : '저장하기'}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;