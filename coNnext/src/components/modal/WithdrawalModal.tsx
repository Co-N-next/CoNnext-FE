// src/components/modals/WithdrawalModal.tsx
import React, { useState } from 'react';
import CheckedCircle from '../../assets/Icons/checked_circle.svg';
import UncheckedCircle from '../../assets/Icons/unchecked_circle.svg';
import ConnextLogo from '../../assets/Icons/Con-next_bg-gradient.svg';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  const [step, setStep] = useState<'reason' | 'confirm'>('reason');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);

  const reasons = [
    '자주 이용하지 않음.',
    '휴식이 필요함.',
    '활용 과정이 복잡해요.',
    '알림이 너무 많아요.',
    '다시 돌아올거에요.',
    '다른 서비스를 이용하고 있어요.',
    '기타'
  ];

  const handleClose = () => {
    setStep('reason');
    setSelectedReason('');
    setIsChecked(false);
    onClose();
  };

  const handleReasonSubmit = () => {
    if (selectedReason) {
      setStep('confirm');
    }
  };

  const handleConfirm = () => {
    if (isChecked) {
      onConfirm(selectedReason);
      handleClose();
    }
  };

  const handleBackToReason = () => {
    setStep('reason');
    setIsChecked(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {step === 'reason' ? (
        // Bottom Sheet - 이유 선택
        <div
          className="fixed inset-0 flex items-end justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1000
          }}
          onClick={handleClose}
        >
          <div
            className="flex flex-col w-full animate-slide-up"
            style={{
              backgroundColor: '#1E293B',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              paddingTop: '12px',
              paddingBottom: '32px',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 드래그 핸들 바 */}
            <div className="flex justify-center" style={{ marginBottom: '24px' }}>
              <div
                style={{
                  width: '40px',
                  height: '4px',
                  backgroundColor: '#64748B',
                  borderRadius: '2px'
                }}
              />
            </div>

            <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
              {/* 이유 선택 단계 */}
              <h2
                style={{
                fontFamily: 'PretendardMedium',
                fontWeight: 500,
                  fontSize: '18px',
                color: '#FEFEFE',
                  marginBottom: '16px',
                  letterSpacing: '-2.5%'
                }}
              >
                탈퇴하시는 이유를 알려주세요.
              </h2>

              <p
                style={{
                  fontFamily: 'PretendardRegular',
                  fontWeight: 400,
                  fontSize: '13px',
                color: '#CCCCCC',
                  marginBottom: '32px',
                  letterSpacing: '-2.5%',
                  lineHeight: '1.6'
                }}
              >
              서비스를 아껴주신 시간에 감사드립니다. 앞으로의 서비스 발전을 위해 탈퇴의 이유를 작성 부탁드리며, 공유해주시면 더 나은 서비스를 만들어나갈 수 있도록 노력하겠습니다. 
              </p>

              <div className="flex flex-col" style={{ gap: '16px', marginBottom: '32px' }}>
                {reasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setSelectedReason(reason)}
                    className="flex items-center w-full transition-opacity hover:opacity-80"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    <img
                      src={selectedReason === reason ? CheckedCircle : UncheckedCircle}
                      alt={selectedReason === reason ? '선택됨' : '선택안됨'}
                      style={{ width: '20px', height: '20px', marginRight: '12px' }}
                    />
                    <span
                      style={{
                        fontFamily: 'PretendardRegular',
                        fontWeight: 400,
                        fontSize: '14px',
                      color: '#E8E8E8',
                        letterSpacing: '-2.5%',
                        textAlign: 'left'
                      }}
                    >
                      {reason}
                    </span>
                  </button>
                ))}
              </div>

            <div className="flex" style={{ gap: '8px' }}>
                <button
                  onClick={handleClose}
                  className="flex items-center justify-center transition-all active:scale-[0.98] hover:opacity-90"
                  style={{
                    flex: 1,
                  height: '40px',
                  width: '168px',
                  backgroundColor: '#7A7A7A',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <span
                    style={{
                    fontFamily: 'PretendardMedium',
                    fontWeight: 500,
                    fontSize: '13px',
                    color: '#FEFEFE',
                      letterSpacing: '-2.5%'
                    }}
                  >
                    취소하기
                  </span>
                </button>

                <button
                  onClick={handleReasonSubmit}
                  disabled={!selectedReason}
                  className="flex items-center justify-center transition-all active:scale-[0.98] hover:opacity-90"
                  style={{
                    flex: 1,
                  height: '40px',
                  width: '168px',
                    backgroundColor: selectedReason ? '#7F5AFF' : '#4A5568',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: selectedReason ? 'pointer' : 'not-allowed',
                    opacity: selectedReason ? 1 : 0.5
                  }}
                >
                  <span
                    style={{
                    fontFamily: 'PretendardMedium',
                    fontWeight: 500,
                    fontSize: '13px',
                    color: '#FEFEFE',
                      letterSpacing: '-2.5%'
                    }}
                  >
                    계속 진행하기
                  </span>
                </button>
              </div>
            </div>
          </div>

          <style>
            {`
              @keyframes slide-up {
                from {
                  transform: translateY(100%);
                }
                to {
                  transform: translateY(0);
                }
              }

              .animate-slide-up {
                animation: slide-up 0.3s ease-out;
              }
            `}
          </style>
        </div>
      ) : (
        // Center Modal - 확인 팝업
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1000
          }}
          onClick={handleBackToReason}
        >
          <div
            className="flex flex-col animate-fade-in"
            style={{
              width: '342px',
              backgroundColor: '#1E293B',
              borderRadius: '16px',
              padding: '32px 24px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 로고와 제목 */}
            <div className="flex items-center" style={{ marginBottom: '24px', gap: '16px' }}>
              <img
                src={ConnextLogo}
                alt="Co:N-next 로고"
                style={{ width: '60px', height: '60px' }}
              />
              <h2
                style={{
                  fontFamily: 'PretendardSemiBold',
                  fontWeight: 500,
                  fontSize: '16px',
                  color: '#E8E8E8',
                  letterSpacing: '-2.5%'
                }}
              >
                탈퇴 전 확인해주세요!
              </h2>
            </div>

            {/* 설명 */}
            <p
              style={{
                fontFamily: 'PretendardRegular',
                fontWeight: 400,
                fontSize: '13px',
                color: '#E8E8E8',
                marginBottom: '20px',
                letterSpacing: '-2.5%',
                lineHeight: '1.6'
              }}
            >
              탈퇴 시 Co:N-next의 정보는 모두 삭제되어,<br />
              모든 데이터는 복구가 불가능합니다.
            </p>

            {/* 주의사항 박스 */}
            <div
              style={{
                backgroundColor: '#293A5D',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '20px'
              }}
            >
              <ul
                style={{
                  listStyleType: 'disc',
                  paddingLeft: '20px',
                  margin: 0
                }}
              >
                <li
                  style={{
                    fontFamily: 'PretendardRegular',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#E8E8E8',
                    marginBottom: '8px',
                    letterSpacing: '-2.5%',
                    lineHeight: '1.5'
                  }}
                >
                  공연 방문 정보가 삭제됩니다.
                </li>
                <li
                  style={{
                    fontFamily: 'PretendardRegular',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#E8E8E8',
                    letterSpacing: '-2.5%',
                    lineHeight: '1.5'
                  }}
                >
                  메이트와 올렸던 공연정보 모두 삭제됩니다.
                </li>
              </ul>
            </div>

            {/* 체크박스 */}
            <button
              onClick={() => setIsChecked(!isChecked)}
              className="flex items-center w-full transition-opacity hover:opacity-80"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '12px 0',
                marginBottom: '24px'
              }}
            >
              <img
                src={isChecked ? CheckedCircle : UncheckedCircle}
                alt={isChecked ? '선택됨' : '선택안됨'}
                style={{ width: '20px', height: '20px', marginRight: '12px' }}
              />
              <span
                style={{
                  fontFamily: 'PretendardMedium',
                  fontWeight: 500,
                  fontSize: '13px',
                  color: '#E8E8E8',
                  letterSpacing: '-2.5%'
                }}
              >
                안내 사항을 모두 확인하였으며, 이에 동의합니다.
              </span>
            </button>

            {/* 버튼 그룹 */}
            <div className="flex" style={{ gap: '12px' }}>
              <button
                onClick={handleBackToReason}
                className="flex items-center justify-center transition-all active:scale-[0.98] hover:opacity-90"
                style={{
                  flex: 1,
                  height: '48px',
                  backgroundColor: '#64748B',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <span
                  style={{
                    fontFamily: 'PretendardSemiBold',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#FFFFFF',
                    letterSpacing: '-2.5%'
                  }}
                >
                  취소
                </span>
              </button>

              <button
                onClick={handleConfirm}
                disabled={!isChecked}
                className="flex items-center justify-center transition-all active:scale-[0.98] hover:opacity-90"
                style={{
                  flex: 1,
                  height: '48px',
                  backgroundColor: isChecked ? '#7F5AFF' : '#4A5568',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: isChecked ? 'pointer' : 'not-allowed',
                  opacity: isChecked ? 1 : 0.5
                }}
              >
                <span
                  style={{
                    fontFamily: 'PretendardSemiBold',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#FFFFFF',
                    letterSpacing: '-2.5%'
                  }}
                >
                  확인
                </span>
              </button>
            </div>
          </div>

          <style>
            {`
              @keyframes fade-in {
                from {
                  opacity: 0;
                  transform: scale(0.95);
                }
                to {
                  opacity: 1;
                  transform: scale(1);
                }
              }

              .animate-fade-in {
                animation: fade-in 0.2s ease-out;
              }
            `}
          </style>
        </div>
      )}
    </>
  );
};

export default WithdrawalModal;