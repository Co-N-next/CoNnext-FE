import React from 'react';

// 약관 내용 데이터
const termsContent = {
  service: {
    title: 'Co:N-next 이용약관 (Agree to Terms of Use)',
    subtitle: '본 이용약관은 Co:N-next(이하 "회사")가 제공하는 Co:N-next 애플리케이션 및 관련 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.',
    content: `제1조 (목적)
본 약관은 이용자가 Co:N-next가 제공하는 서비스를 이용함에 있어 필요한 사항을 규정함을 목적으로 합니다.

제2조 (정의)
1. "서비스"란 Co:N-next가 제공하는 모든 모바일 및 웹 기반 기능을 의미합니다.
2. "이용자"란 본 약관에 동의하고 서비스를 이용하는 자를 말합니다.
3. "계정"이란 이용자의 식별과 서비스 이용을 위하여 생성된 정보를 의미합니다.

제3조 (약관의 효력 및 변경)
1. 본 약관은 이용자가 동의함으로써 효력이 발생합니다.
2. 회사는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있습니다.
3. 약관이 변경될 경우, 서비스 내 공지사항을 통해 사전에 안내합니다.

제4조 (서비스의 제공)
회사는 다음과 같은 서비스를 제공합니다.
1. Co:N-next가 제공하는 핵심 기능
2. 이용자 간 상호작용 기능
3. 기타 회사가 정하는 기능
4. 회사는 서비스의 일부 또는 전부를 변경, 중단할 수 있으며, 이 경우 사전에 공지합니다.

제5조 (계정 관리)
1. 이용자는 본인의 계정을 스스로 관리해야 합니다.
2. 계정 정보의 도용, 부정 사용에 대한 책임은 이용자에게 있습니다.
3. 회사는 부정 사용이 확인될 경우 계정을 제한할 수 있습니다.

제6조 (이용자의 의무)
이용자는 다음 행위를 해서는 안 됩니다.
1. 타인의 정보를 도용하는 행위
2. 서비스 운영을 방해하는 행위
3. 법령 및 공서양속에 위반되는 행위
4. 허위 정보 작성

제7조 (서비스 이용 제한)
회사는 이용자가 본 약관을 위반할 경우 사전 통보 없이 서비스 이용을 제한할 수 있습니다.

제8조 (면책 조항)
1. 회사는 천재지변, 서버 장애 등 불가항력으로 인한 서비스 중단에 대해 책임지지 않습니다.
2. 이용자 간 발생한 문제에 대해 회사는 책임지지 않습니다.

제9조 (지적 재산권)
서비스 내 모든 콘텐츠에 대한 권리는 회사에 귀속됩니다.

제10조 (계약 해지)
이용자는 언제든지 계정을 삭제함으로써 서비스 이용을 종료할 수 있습니다.

제11조 (준거법 및 관할)
본 약관은 대한민국 법률에 따르며, 분쟁 발생 시 관할 법원은 대한민국 법원으로 합니다.`
  },
  privacy: {
    title: 'Co:N-next 개인정보 수집 및 이용 동의',
    subtitle: '본 동의서는 Co:N-next(이하 "서비스") 제공을 위하여 이용자의 개인정보를 수집하고 이용하는 사항을 규정합니다.',
    content: `제1조 (수집하는 개인정보 항목)
Co:N-next는 서비스 이용을 위해 다음의 개인정보를 수집할 수 있습니다.
- 이메일, 닉네임, 서비스 이용 기록

제2조 (개인정보 수집 및 이용 목적)
수집된 개인정보는 다음의 목적을 위해 이용됩니다.
1. 이용자 식별 및 계정 관리
2. 서비스 제공 및 기능 개선
3. 문의 응대 및 서비스 운영

제3조 (개인정보 보관 및 이용 기간)
개인정보는 이용자가 서비스를 이용하는 동안 보관되며, 회원 탈퇴 또는 수집 목적 달성 시 지체 없이 파기됩니다.

제4조 (동의 거부 권리)
이용자는 개인정보 수집 및 이용에 대해 동의를 거부할 권리가 있습니다. 다만, 이 경우 서비스 이용이 제한될 수 있습니다.

제5조 (개인정보 보호)
Co:N-next는 이용자의 개인정보를 보호하기 위해 관련 법령에 따른 보호 조치를 취합니다.`
  },
  marketing: {
    title: 'Co:N-next 마케팅 이용 동의',
    subtitle: '본 동의서는 Co:N-next(이하 "서비스")가 이용자에게 서비스 관련 소식, 이벤트, 업데이트 및 안내 사항을 전달하기 위해 개인정보를 이용하는 것에 대한 동의를 받기 위해 작성되었습니다.',
    content: `제1조 (수집 및 이용 항목)
Co:N-next는 마케팅 정보 제공을 위해 이용자의 이메일 정보를 이용할 수 있습니다.

제2조 (이용 목적)
수집된 정보는 다음의 목적으로 이용됩니다.
1. 서비스 업데이트 및 새로운 기능 안내
2. 이벤트 및 공지 사항 전달
3. 서비스 관련 혜택 및 안내 제공

제3조 (보관 및 이용 기간)
해당 정보는 이용자가 마케팅 정보 수신에 동의한 기간 동안 보관되며, 이용자가 수신 거부를 요청할 경우 즉시 이용을 중단하고 관련 정보를 파기합니다.

제4조 (동의 거부 권리)
이용자는 마케팅 정보 수신에 대해 동의를 거부할 권리가 있으며, 이 경우에도 서비스 이용에는 제한이 없습니다.`
  }
};

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'service' | 'privacy' | 'marketing';
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const terms = termsContent[type];

  return (
    <div
      className="fixed inset-0 flex items-end justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        className="flex flex-col w-full animate-slide-up"
        style={{
          backgroundColor: '#1E293B',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          paddingTop: '12px',
          // 하단 패딩을 버튼 높이를 고려하여 넉넉히 주거나 내부 컨텐츠 패딩으로 분리합니다.
          maxHeight: '85vh', 
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 드래그 핸들 바 */}
        <div className="flex justify-center" style={{ marginBottom: '24px' }}>
          <div
            style={{
              width: '40px',
              height: '4px',
              backgroundColor: '#7A7A7A',
              borderRadius: '2px'
            }}
          />
        </div>

        <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
          {/* 제목 */}
          <h2
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 600,
              fontSize: '18px',
              color: '#FEFEFE',
              marginBottom: '16px',
              letterSpacing: '-2.5%'
            }}
          >
            {terms.title}
          </h2>

          {/* 부제목 */}
          <p
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 400,
              fontSize: '13px',
              color: '#CCCCCC',
              marginBottom: '16px',
              letterSpacing: '-2.5%',
              lineHeight: '1.6'
            }}
          >
            {terms.subtitle}
          </p>

          {/* 내용 */}
          <div
            style={{
              marginBottom: '16px',
              padding: '20px',
              backgroundColor: '#0F172A',
              borderRadius: '12px',
              maxHeight: '400px',
              overflowY: 'auto'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '13px',
                color: '#CCCCCC',
                lineHeight: '1.6',
                margin: 0,
                whiteSpace: 'pre-line',
                letterSpacing: '-2.5%'
              }}
            >
              {terms.content}
            </p>
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="flex items-center justify-center transition-all active:scale-[0.98] hover:opacity-90"
            style={{
              width: '100%',
              height: '40px',
              backgroundColor: '#1E293B',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '24px'
            }}
          >
            <span
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 500,
                fontSize: '13px',
                color: '#FEFEFE',
                letterSpacing: '-2.5%'
              }}
            >
              닫기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
