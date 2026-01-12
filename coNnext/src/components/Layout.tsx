import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
     <div className="layout-container">
      {/* 1. 모든 페이지에 고정될 헤더 */}
      <Header />

      {/* 2. 주소에 따라 내용이 바뀌는 부분 (Home, About 등) */}
      <main className="content">
        <Outlet />
      </main>

      {/* 3. 모든 페이지에 고정될 푸터 */}
      <Footer />
    </div>
  );
};

export default Layout;