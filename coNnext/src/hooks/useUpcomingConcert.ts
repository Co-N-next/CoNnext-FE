import { useEffect, useState } from "react";
import { getTodayConcerts } from "../api/concertItem";
import type { ConcertData } from "../types/concert";

export const useUpcomingConcert = () => {
  const [concert, setConcert] = useState<ConcertData | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getTodayConcerts();
        const first = res.payload?.[0];
        if (!first) return;

        const start = new Date(first.startAt);
        const yyyy = start.getFullYear();
        const mm = String(start.getMonth() + 1).padStart(2, "0");
        const dd = String(start.getDate()).padStart(2, "0");
        const hh = String(start.getHours()).padStart(2, "0");
        const min = String(start.getMinutes()).padStart(2, "0");

        setConcert({
          title: first.concertName,
          artist: "",
          place: "",
          date: `${yyyy}.${mm}.${dd}`,
          time: `${hh}:${min}`,
          seat: "",
          poster: first.posterImage,
        });
      } catch (error) {
        console.error("오늘 공연 조회 실패:", error);
      }
    };

    load();
  }, []);

  return concert;
};
