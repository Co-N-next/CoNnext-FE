import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileIcon from '../../assets/Variables/mask_off.svg';
import EditIcon from '../../assets/Icons/fix.svg';
import BackIcon from '../../assets/Icons/back.svg';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  
  // 1. 초기값과 현재값을 따로 관리하여 변경 여부를 체크합니다.
  const [initialNickname] = useState('커넥도리 234'); 
  const [nickname, setNickname] = useState('커넥도리 234');
  const [email] = useState('halinpark04@gmail.com');

  // 2. 변경 사항이 있는지 확인 (초기값과 다를 때 true)
  const isChanged = nickname !== initialNickname;

  const handleSave = () => {
    if (!isChanged) return; // 변경사항 없으면 작동 안 함

    // 실제로는 여기서 API 호출을 하지만, 지금은 바로 이동합니다.
    console.log('프로필 저장 시도:', { nickname });
    
    // 3. 마이페이지로 이동
    navigate('/mypage'); 
  };

  const handleCreateNickname = () => {
    const randomNum = Math.floor(Math.random() * 1000);
    setNickname(`커넥도리 ${randomNum}`);
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col"
      style={{
        background: '#0E172A',
        paddingTop: '20px',
        paddingLeft: '20px',
        paddingRight: '20px'
      }}
    >
      {/* Header */}
      <div className="flex items-center relative" style={{ marginBottom: '40px' }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center hover:opacity-70 transition-opacity"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <img src={BackIcon} alt="뒤로가기" style={{ width: '24px', height: '24px' }} />
        </button>
        <h1 style={{ fontFamily: 'PretendardSemiBold', fontWeight: 600, fontSize: '20px', color: '#FFFFFF', marginLeft: '16px' }}>
          내 정보 수정하기
        </h1>
      </div>

      {/* Profile Image Section */}
      <div className="flex justify-center" style={{ marginBottom: '16px' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
          <div className="flex items-center justify-center" style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#1E293B' }}>
            <img src={ProfileIcon} alt="프로필" className="w-full h-full object-cover" />
          </div>
          <button className="flex items-center justify-center transition-transform active:scale-95" style={{ position: 'absolute', bottom: 0, right: 0, width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#2a3a5c', border: '3px solid #0E172A', cursor: 'pointer' }}>
            <img src={EditIcon} alt="수정" />
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-col items-center w-full">
        {/* 닉네임 */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '13px', color: '#FFFFFF', marginBottom: '8px', display: 'block' }}>닉네임</label>
          <div className="flex" style={{ gap: '12px' }}>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              style={{ width: '219px', height: '42px', borderRadius: '8px', border: '1px solid #2a3a5c', backgroundColor: '#1E293B', color: '#FFFFFF', padding: '0 16px', fontSize: '13px', outline: 'none' }}
            />
            <button onClick={handleCreateNickname} style={{ width: '118px', height: '42px', backgroundColor: '#414141', borderRadius: '8px', color: '#FFFFFF', fontSize: '13px', cursor: 'pointer', border: 'none' }}>
              자동 생성
            </button>
          </div>
        </div>

        {/* 이메일 */}
        <div style={{ marginBottom: '32px' }}>
          <label style={{ fontSize: '13px', color: '#FFFFFF', marginBottom: '8px', display: 'block' }}>이메일 주소</label>
          <input
            type="email"
            value={email}
            readOnly
            style={{ width: '345px', height: '42px', borderRadius: '8px', border: '1px solid #2a3a5c', backgroundColor: '#1E293B', color: '#6B7280', padding: '0 16px', fontSize: '13px', outline: 'none' }}
          />
        </div>

        {/* 저장하기 버튼 */}
        <button
          onClick={handleSave}
          disabled={!isChanged} // 변경사항 없을 때 클릭 방지
          className="flex items-center justify-center transition-all active:scale-[0.98]"
          style={{
            width: '345px',
            height: '40px',
            // 변경 시 보라색(#7F5AFF), 미변경 시 회색(#7A7A7A)
            backgroundColor: isChanged ? '#7F5AFF' : '#7A7A7A',
            border: 'none',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 600,
            cursor: isChanged ? 'pointer' : 'default',
          }}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default EditProfile;