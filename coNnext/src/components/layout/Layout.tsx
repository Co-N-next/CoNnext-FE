// src/components/layout/Layout.tsx
import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import ConcertDetailModal from "../modal/ConcertDetailModal";
import { useUpcomingConcert } from "../../hooks/useUpcomingConcert";
import { useShake } from "../../hooks/useShake";

const Layout: React.FC = () => {
  const ticketData = useUpcomingConcert();
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(() => {
      mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [location.pathname, location.search]);

  useShake(() => {
    if (ticketData) setIsTicketOpen(true);
  });

  const handleTicketClick = () => {
    if (ticketData) {
      setIsTicketOpen(true);
      return;
    }

    window.alert("오늘 공연이 없습니다. 예매 내역 페이지로 이동합니다.");
    navigate("/reserve");
  };

  return (
    <div className="min-h-screen flex justify-center bg-[#0a0f1e]">
      <div className="w-full max-w-[450px] h-[100dvh] flex flex-col relative bg-[#0a0f1e]">
        {/* Header 클릭 시 modal 열림 */}
        <Header onTicketClick={handleTicketClick} />

        <main
          key={`${location.pathname}${location.search}`}
          ref={mainRef}
          className="flex-1 min-h-0 w-full overflow-y-auto bg-[#0a0f1e] pt-20 pb-[66px]"
        >
          <Outlet />
        </main>

        <Footer />

        {/* 공연 modal */}
        {ticketData && (
          <ConcertDetailModal
            open={isTicketOpen}
            onClose={() => setIsTicketOpen(false)}
            data={ticketData}
          />
        )}
      </div>
    </div>
  );
};

export default Layout;
