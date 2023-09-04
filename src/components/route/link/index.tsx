import { ReactNode } from 'react';
import { useRoute } from '../hooks/use-route';

export interface LinkProps {
  path: string;
  children?: ReactNode;
}

export const Link = ({ path, children }: LinkProps) => {
  const { setPath } = useRoute();

  return <button onClick={() => setPath(path)}>{children ?? path}</button>;
};
