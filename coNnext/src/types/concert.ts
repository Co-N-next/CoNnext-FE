export interface Concert {
  id: string;
  title: string;
  subtitle: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  seat: string;
  imageUrl: string;
}

export type ConcertDetail = {
title: string;
artist: string;
place: string;
dateTime: string;
seat: string;
};