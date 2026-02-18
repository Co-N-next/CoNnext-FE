import { useEffect, useState } from "react";
import { getMyTodayConcertCount, getMyTodayConcerts } from "../api/concertItem";
import type { ConcertData } from "../types/concert";

const formatSeat = (item: {
  floor?: number;
  section?: string;
  row?: string;
  seat?: number;
}) => {
  const floorText = typeof item.floor === "number" ? `${item.floor}F` : "";
  const sectionText = item.section ? `${item.section} Section` : "";
  const rowText = item.row ? `${item.row} Row` : "";
  const seatText = typeof item.seat === "number" ? `${item.seat} Seat` : "";

  return [floorText, sectionText, rowText, seatText].filter(Boolean).join(" ");
};

export const useUpcomingConcert = () => {
  const [concert, setConcert] = useState<ConcertData | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [countRes, todayRes] = await Promise.all([
          getMyTodayConcertCount(),
          getMyTodayConcerts(false),
        ]);

        if (import.meta.env.DEV) {
          console.group("[my-today diagnostics]");
          console.log("count payload:", countRes.payload);
          console.log("my-today payload length:", todayRes.payload?.length ?? 0);
          console.groupEnd();
        }

        const first = todayRes.payload?.[0];
        if (!first) return;

        const start = new Date(first.startAt);
        const yyyy = start.getFullYear();
        const mm = String(start.getMonth() + 1).padStart(2, "0");
        const dd = String(start.getDate()).padStart(2, "0");
        const hh = String(start.getHours()).padStart(2, "0");
        const min = String(start.getMinutes()).padStart(2, "0");

        setConcert({
          title: first.concertName,
          artist: first.artist || "",
          place: first.venue || "",
          date: `${yyyy}.${mm}.${dd}`,
          time: `${hh}:${min}`,
          seat: formatSeat(first),
          poster: first.posterImage,
        });
      } catch (error) {
        console.error("Failed to fetch my-today concert:", error);
      }
    };

    void load();
  }, []);

  return concert;
};
