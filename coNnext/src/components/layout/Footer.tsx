import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import HomeIcon from '../../assets/footer/Home.svg';
import ReserveIcon from '../../assets/footer/ReserveList.svg';
import FindHallIcon from '../../assets/footer/FindHall.svg';
import MateIcon from '../../assets/footer/Mate.svg';
import MyPageIcon from '../../assets/footer/MyPage.svg';

const Footer: React.FC = () => {
  const navigate = useNavigate(); 
  const location = useLocation();

   const navItems = [
   { id: 1, label: '홈', path: '/home', icon: HomeIcon },
    { id: 2, label: '예매 내역', path: '/reserve', icon: ReserveIcon },
    { id: 3, label: '공연장', path: '/find', icon: FindHallIcon },
    { id: 4, label: '메이트', path: '/mate', icon: MateIcon },
    { id: 5, label: '마이페이지', path: '/mypage', icon: MyPageIcon },
  ];

  const ACTIVE_COLOR = "#CBBBFF";
  const INACTIVE_COLOR = "#E8E8E8";

  const ACTIVE_FILTER = "brightness(0) saturate(100%) invert(84%) sepia(21%) saturate(541%) hue-rotate(206deg) brightness(101%) contrast(101%)";

  return (
    <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-[#0f1729] border-t border-gray-800 z-50 w-full max-w-[450px]">
      <nav className="w-full">
        <ul className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.id} className="flex-1">
                <button
                  onClick={() => navigate(item.path)}
                  className="w-full flex flex-col items-center gap-1.5"
                >
                  <div className="flex items-center justify-center" style={{ width: '20px', height: '20px' }}>
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="transition-all duration-200"
                      style={{
                        width: '20px',
                        height: '20px',
                        filter: isActive ? ACTIVE_FILTER : "none"
                      }}
                    />
                  </div>
                  <span
                    className="transition-colors duration-200 font-medium"
                    style={{ 
                      fontSize: '11px',
                      color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;