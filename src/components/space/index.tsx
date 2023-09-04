import { FC, ReactNode } from 'react';

export interface SpaceProps {
  gap?: number;
  children?: ReactNode;
}

export const Space: FC<SpaceProps> = ({ children, gap = 10, ...props }) => (
  <div style={{ display: 'flex', gap }} {...props}>
    {children}
  </div>
);
