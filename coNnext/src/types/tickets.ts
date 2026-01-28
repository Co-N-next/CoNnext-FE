export interface Concert {
  id: number;
  title: string;
  subtitle: string;
  artist: string;
  poster: string;
  dDay: number;
  isNew:boolean;
  views:number;
}

export interface Venue {
  id: number;
  name: string;
  location: string;
  image: string;
  dDay: number;
  isNew:boolean;
}

export interface BadgeProps {
  dDay: number;
  isNew: boolean;
}