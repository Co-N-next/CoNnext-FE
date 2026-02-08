import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import ConcertDetailModal from "../modal/ConcertDetailModal";
import type { ConcertDetail } from "../../types/concert";
import { useShake } from "../../hooks/useShake";

const Layout: React.FC = () => {
  const [open, setOpen] = useState(false);

  // 임시 더미 데이터 (나중에 API 연결)
  const data: ConcertDetail = {
    title: "Red Velvet 4th Concert",
    artist: "Red Velvet (레드벨벳)",
    place: "KSPO DOME",
    dateTime: "2025.11.15(월) 18:00",
    seat: "N층 MM구역 QQ열 ##번",
  };

  // 📱 흔들기 트리거
  useShake(() => setOpen(true));

  return (
    <div
      className="min-h-screen flex justify-center overflow-x-hidden"
      style={{ backgroundColor: "var(--color-bg-page)" }}
    >
      <div className="w-full max-w-[450px] min-h-screen flex flex-col relative">
        
        {/* 헤더 */}
        <Header onTicketClick={() => setOpen(true)} />

        {/* 메인 콘텐츠 */}
        <main
          className="flex-1 w-full overflow-y-auto overflow-x-hidden pt-20 pb-24"
          style={{ backgroundColor: "var(--color-bg-page)" }}
        >
          <Outlet />
        </main>

        {/* 푸터 */}
        <Footer />

        {/* 🎟 전역 모달 */}
        <ConcertDetailModal
          open={open}
          onClose={() => setOpen(false)}
          data={data}
        />
      </div>
    </div>
  );
};

export default Layout;
