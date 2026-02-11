// src/components/layout/Layout.tsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import ConcertDetailModal from "../modal/ConcertDetailModal";
import { useUpcomingConcert } from "../../hooks/useUpcomingConcert";
import { useShake } from "../../hooks/useShake";

const Layout: React.FC = () => {
  const ticketData = useUpcomingConcert();
  const [isTicketOpen, setIsTicketOpen] = useState(false);

  useShake(() => {
    if (ticketData) setIsTicketOpen(true);
  });

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[450px] min-h-screen flex flex-col relative">
        {/* Header 클릭 시 modal 열림 */}
        <Header
          onTicketClick={() => {
            if (ticketData) setIsTicketOpen(true);
          }}
        />

        <main className="flex-1 w-full overflow-y-auto pt-20 pb-[66px]">
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
