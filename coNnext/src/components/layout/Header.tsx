import React from "react";
import { useNavigate } from "react-router-dom";

import Connext from '../../assets/Icons/Con-next.svg';
import Ticket from '../../assets/Icons/TicketLogo.svg';
import Bell from '../../assets/Icons/Bell.svg';

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
          <button
            onClick={() => navigate("/Login")}
            style={{ width: "38.5px" }}
            className="hover:opacity-80 transition-opacity"
          >
            <img src={Connext} alt="Connext Logo" className="h-12" />
          </button>
        </div>

        {/* 아이콘 */}
        <div className="flex items-center gap-[10px] w-[92px] h-[24px] justify-end">
          {/* 🎟 예매 아이콘 */}
          <button
            onClick={onTicketClick}
            className="w-6 h-6 p-0 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <img src={Ticket} alt="Ticket" className="w-6 h-6 block" />
          </button>

          {/* 🔔 알림 */}
          <button className="w-6 h-6 p-0 hover:opacity-80 transition-opacity flex-shrink-0">
            <img src={Bell} alt="Bell" className="w-6 h-6 block" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;