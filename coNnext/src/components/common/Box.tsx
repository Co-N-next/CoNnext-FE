import type { ReactNode } from 'react';
import { Spacing } from '../../styles/tokens/spacing';

type SpacingKey = keyof typeof Spacing;

interface BoxProps {
  p?: SpacingKey;
  children: ReactNode;
}

export function Box({ p = 'space200', children }: BoxProps) {
  return (
    <div style={{ padding: Spacing[p] }}>
      {children}
    </div>
  );
}
