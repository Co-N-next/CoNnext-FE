export type Concert = {
  id: number;
  title: string;
  artist: string;
  poster: string;
  dDay: number;
  isNew: boolean;
  subtitle?: string;  
  views?: number;    
};


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