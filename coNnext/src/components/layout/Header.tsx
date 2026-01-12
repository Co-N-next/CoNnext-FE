import React from 'react';
import { useNavigate } from 'react-router-dom';

import Connext from '../assets/logo/Con-next.svg';
import Ticket from '../assets/logo/TicketLogo.svg';
import Bell from '../assets/logo/BellLogo.svg';
import Menu from '../assets/logo/MenuLogo.svg';

const Header: React.FC = () => {
  const navigate = useNavigate(); 

  return (
    <header className="bg-[#0E172A] px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* 로고 */}
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/Login')}
            style={{ width: '38.5px' }}
            className="hover:opacity-80 transition-opacity"
          >
            <img src={Connext} alt="Connext Logo" className="h-12" />
          </button>
        </div>

        {/* 아이콘 */}
        <div className="flex items-center gap-[10px] w-[92px] h-[24px] justify-end">
        
          <button className="w-6 h-6 p-0 hover:opacity-80 transition-opacity flex-shrink-0">
            <img src={Ticket} alt="Ticket" className="w-6 h-6 block" />
          </button>
          
          <button className="w-6 h-6 p-0 hover:opacity-80 transition-opacity flex-shrink-0">
            <img src={Bell} alt="Bell" className="w-6 h-6 block" />
          </button>
          
          <button className="w-6 h-6 p-0 hover:opacity-80 transition-opacity flex-shrink-0">
            <img src={Menu} alt="Menu" className="w-6 h-6 block" />
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;