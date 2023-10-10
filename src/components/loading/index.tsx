import { FC } from 'react';

import cls from 'classnames';

import { BaseComponentProps } from '@/components/types';

import styles from './index.scss';

export interface LoadingProps extends BaseComponentProps {
  /**
   * 边颜色
   */
  color?: string;
  /**
   * 是否 Loading，默认 true
   */
  loading?: boolean;
}

export const Loading: FC<LoadingProps> = ({ color, className, style, children, loading = true, ...props }) => {
  const loadingIcon = (
    <div className={cls(className, styles.loading)} style={{ borderColor: color, ...style }} {...props} />
  );

  if (!children) {
    return loadingIcon;
  }

  return (
    <div className={styles.loadingGroup}>
      <span style={{ visibility: loading ? 'hidden' : undefined }}>{children}</span>
      {loading && <div className={styles.loadingWrapper}>{loadingIcon}</div>}
    </div>
  );
};
