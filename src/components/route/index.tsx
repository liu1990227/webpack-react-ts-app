import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Route, RouteContext } from './hooks/use-route';

import styles from './index.scss';
import { Link } from './link';
import { Page } from './page';

export interface RouteProps {
  routes?: Route[];
  defaultPath?: string;
  children?: ReactNode;
}

export const Router = ({ routes, defaultPath, children }: RouteProps) => {
  const [route, setRoute] = useState<Route>();
  const [path, _setPath] = useState<string>(defaultPath);

  const setPath = (newPath: string) => {
    if (newPath) {
      const title = routes?.find(({ path }) => path === newPath)?.title ?? '';
      setRoute({ path: newPath, title });
      _setPath(newPath);
      history.pushState({ path: newPath, title }, title, newPath);
    }
  };

  const configChildren = useMemo(() => {
    return (
      <div className={styles.app}>
        <ul className={styles.menu}>
          {routes.map(({ path }) => (
            <li key={path}>
              <Link path={path} />
            </li>
          ))}
        </ul>

        <div className={styles.page}>
          {routes.map(({ path, render }) => (
            <Page key={path} path={path}>
              {render}
            </Page>
          ))}
        </div>
      </div>
    );
  }, [routes]);

  useEffect(() => {
    const updatePath = ({ state }) => {
      if (state.path) {
        setPath(state.page);
      }
    };

    window.addEventListener('popstate', updatePath);

    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  return <RouteContext.Provider value={{ route, path, setPath }}>{children ?? configChildren}</RouteContext.Provider>;
};
