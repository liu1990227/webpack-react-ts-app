import { ReactNode, createContext, useContext } from 'react';

export interface Route {
  path?: string;
  render?: ReactNode;
  title?: string;
}

export interface RouteContext {
  route?: Route;
  path?: string;
  setPath?: (path: string) => any;
}

export const RouteContext = createContext<RouteContext>({});

export const useRoute = () => {
  return useContext(RouteContext);
};
