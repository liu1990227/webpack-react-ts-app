import { ReactNode, useMemo } from 'react';
import { useRoute } from '../hooks/use-route';

export interface PageProps {
  path: string;
  children?: ReactNode;
}

export const Page = ({ path, children }: PageProps) => {
  const { path: currentPath } = useRoute();

  const content = useMemo(() => (path === currentPath ? children : null), [currentPath, children]);

  return content;
};
