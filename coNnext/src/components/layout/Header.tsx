// src/components/layout/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Connext from '../../assets/Icons/Con-next.svg';
import Ticket from '../../assets/Icons/TicketLogo.svg';
import Bell from '../../assets/Icons/BellLogo.svg';

type HeaderProps = {
  onTicketClick?: () => void;
};

const Header: React.FC<HeaderProps> = ({ onTicketClick }) => {
  const navigate = useNavigate(); 

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 bg-[#0E172A] w-full max-w-[450px] px-6 py-4">
      <div className="flex items-center justify-between w-full">
        {/* 로고 */}
        <div className="flex items-center">
          <button className="hover:opacity-80 transition-opacity w-12 h-12 shrink-0"
          onClick={() => navigate('/home')}>
            <img src={Connext} alt="Connext Logo" className="h-6" />
          </button>
        </div>

        {/* 아이콘 */}
        <div className="flex items-center gap-2.5 justify-end">
          <button
            className="w-6 h-6 p-0 hover:opacity-80 transition-opacity shrink-0"
            onClick={() => {
              if (onTicketClick) onTicketClick(); // prop이 있으면 호출
            }}
          >
            <img src={Ticket} alt="Ticket" className="w-6 h-6 block" />
          </button>
          
          <button
            className="w-6 h-6 p-0 hover:opacity-80 transition-opacity shrink-0"
            onClick={() => navigate('/alarm')}
          >
            <img src={Bell} alt="Bell" className="w-6 h-6 block" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
