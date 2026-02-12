import { useState, useEffect } from "react";
import { getUpcomingConcerts, getConcertDetailById } from "../api/concertItem";
import type { ConcertData } from "../types/concert";

export const useUpcomingConcert = () => {
  const [concert, setConcert] = useState<ConcertData | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        // 1. 다가오는 공연 조회
        const res = await getUpcomingConcerts(0, 1);
        const first = res.payload?.[0];
        if (!first) return;

        // 2. 상세 API 호출
        const detailRes = await getConcertDetailById(first.detailId);
        const detail = detailRes.payload;

        const start = new Date(detail.startAt);
        const yyyy = start.getFullYear();
        const mm = String(start.getMonth() + 1).padStart(2, "0");
        const dd = String(start.getDate()).padStart(2, "0");
        const hh = String(start.getHours()).padStart(2, "0");
        const min = String(start.getMinutes()).padStart(2, "0");

        setConcert({
          title: detail.name,
          artist: "아티스트 정보 없음",
          place: "장소 미정",
          date: `${yyyy}.${mm}.${dd}`,
          time: `${hh}:${min}`,
          seat: "좌석 정보 없음",
          poster: detail.posterImage,
        });
      } catch (e) {
        console.error("공연 상세 조회 실패:", e);
      }
    };

    load();
  }, []);

  return concert;
};
