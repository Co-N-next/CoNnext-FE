import { useState } from "react";
import Header from "../../components/layout/Header";
import ConcertDetailModal from "../../components/modal/ConcertDetailModal";
import type { ConcertDetail } from "../../types/concert";
import { useShake } from "../../hooks/useShake";

export default function UpcomingConcertPage() {
  const [open, setOpen] = useState(false);

  const data: ConcertDetail = {
    title: "Red Velvet 4th Concert",
    artist: "Red Velvet (레드벨벳)",
    place: "KSPO DOME",
    dateTime: "2025.11.15(월) 18:00",
    seat: "N층 MM구역 QQ열 ##번",
  };

  // 흔들기 트리거
  useShake(() => setOpen(true));

  return (
    <>
      <Header onTicketClick={() => setOpen(true)} />

      {/* 페이지 콘텐츠 */}
      <div className="pt-[80px]">
        {/* 기존 페이지 내용 */}
      </div>

      {/* 모달 */}
      <ConcertDetailModal
        open={open}
        onClose={() => setOpen(false)}
        data={data}
      />
    </>
  );
}
