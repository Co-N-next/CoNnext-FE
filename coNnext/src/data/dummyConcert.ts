import Revel1 from "../assets/dumy/Revel1.png";

export type ConcertData = {
  title: string;
  artist: string;
  place: string;
  date: string;
  time: string;
  seat: string;
  poster: string;
};

export const dummyConcert: ConcertData = {
  title: "Red Velvet 4th Concert",
  artist: "Red Velvet (레드벨벳)",
  place: "KSPO DOME",
  date: "2025.11.15(일)",
  time: "18:00",
  seat: "N층 MM구역 QQ열 ##번",
  poster: Revel1,
};
