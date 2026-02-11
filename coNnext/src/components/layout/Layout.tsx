// src/components/layout/Layout.tsx
import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import ConcertDetailModal from "../modal/ConcertDetailModal";
import { useUpcomingConcert } from "../../hooks/useUpcomingConcert";
import { useShake } from "../../hooks/useShake";

const Layout: React.FC = () => {
  const ticketData = useUpcomingConcert();
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  useShake(() => {
    if (ticketData) setIsTicketOpen(true);
  });

  return (
    <div className="min-h-screen flex justify-center bg-[#0a0f1e]">
      <div className="w-full max-w-[450px] min-h-screen flex flex-col relative bg-[#0a0f1e]">
        {/* Header 클릭 시 modal 열림 */}
        <Header
          onTicketClick={() => {
            if (ticketData) setIsTicketOpen(true);
          }}
        />

        <main
          ref={mainRef}
          className="flex-1 w-full overflow-y-auto bg-[#0a0f1e] pt-20 pb-[66px]"
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
