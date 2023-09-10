import { CSSProperties, ReactNode } from 'react';

export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
