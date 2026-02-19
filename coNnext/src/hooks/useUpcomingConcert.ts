import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getMyTodayConcerts,
  getTodayConcerts,
  getUpcomingConcerts,
} from "../api/concertItem";
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
  const location = useLocation();

  useEffect(() => {
    const toDateTime = (startAt: string) => {
      const start = new Date(startAt);
      const yyyy = start.getFullYear();
      const mm = String(start.getMonth() + 1).padStart(2, "0");
      const dd = String(start.getDate()).padStart(2, "0");
      const hh = String(start.getHours()).padStart(2, "0");
      const min = String(start.getMinutes()).padStart(2, "0");

      return {
        date: `${yyyy}.${mm}.${dd}`,
        time: `${hh}:${min}`,
      };
    };

    const load = async () => {
      try {
        const myTodayRes = await getMyTodayConcerts(false);
        const first = myTodayRes.payload?.[0];
        if (first) {
          const { date, time } = toDateTime(first.startAt);

          setConcert({
            title: first.concertName,
            artist: first.artist || "",
            place: first.venue || "공연장 정보 없음",
            venueId: first.venueId,
            date,
            time,
            seat: formatSeat(first) || "좌석 정보 없음",
            poster: first.posterImage || "",
          });
          return;
        }

        const todayRes = await getTodayConcerts();
        const fallback = todayRes.payload?.[0];
        if (fallback) {
          const { date, time } = toDateTime(fallback.startAt);

          setConcert({
            title: fallback.concertName,
            artist: "",
            place: "공연장 정보 없음",
            date,
            time,
            seat: "좌석 정보 없음",
            poster: fallback.posterImage || "",
          });
          return;
        }

        const upcomingRes = await getUpcomingConcerts(0, 1);
        const upcoming = upcomingRes.payload?.[0];
        if (!upcoming) return;
        const { date, time } = toDateTime(upcoming.startAt);

        setConcert({
          title: upcoming.concertName,
          artist: "",
          place: "공연장 정보 없음",
          date,
          time,
          seat: "좌석 정보 없음",
          poster: upcoming.posterImage || "",
        });
      } catch (error) {
        try {
          const todayRes = await getTodayConcerts();
          const fallback = todayRes.payload?.[0];
          if (fallback) {
            const { date, time } = toDateTime(fallback.startAt);

            setConcert({
              title: fallback.concertName,
              artist: "",
              place: "공연장 정보 없음",
              date,
              time,
              seat: "좌석 정보 없음",
              poster: fallback.posterImage || "",
            });
            return;
          }

          const upcomingRes = await getUpcomingConcerts(0, 1);
          const upcoming = upcomingRes.payload?.[0];
          if (!upcoming) return;
          const { date, time } = toDateTime(upcoming.startAt);

          setConcert({
            title: upcoming.concertName,
            artist: "",
            place: "공연장 정보 없음",
            date,
            time,
            seat: "좌석 정보 없음",
            poster: upcoming.posterImage || "",
          });
        } catch (todayError) {
          console.error("Failed to fetch today concert:", todayError);
        }
        console.error("Failed to fetch my-today concert:", error);
      }
    };

    void load();
    
    const onFocus = () => {
      void load();
    };

    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, [location.key]);

  return concert;
};
