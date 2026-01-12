import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate(); 

   const navItems = [
    { id: 1, label: '홈' },
    { id: 2, label: '예매 내역' },
    { id: 3, label: '공연장' },
    { id: 4, label: '메이트' },
    { id: 5, label: '마이페이지' },
  ];

   return (
   <footer className="fixed bottom-0 left-0 right-0 bg-[#0f1729] border-t border-gray-800 z-50">
      <nav className="max-w-7xl mx-auto">
        <ul className="flex items-center justify-around py-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <button className="flex flex-col items-center gap-1 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors">
                <div 
                  className="w-6 h-6 bg-white rounded-full flex items-center justify-center overflow-hidden"
                  style={{ width: '24px', height: '24px', flexShrink: 0 }} 
                ></div>
                <span className="text-gray-300" style={{ fontSize: '13px' }}>
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;