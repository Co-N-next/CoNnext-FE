import type { ReactNode } from 'react';
import { Colors } from '../../styles/tokens/colors';

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div
      style={{
        background: Colors.content.card,
        borderRadius: '16px',
        padding: '16px',
      }}
    >
      {children}
    </div>
  );
}
