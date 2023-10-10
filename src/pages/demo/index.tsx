import { FC } from 'react';

import cls from 'classnames';

import styles from './index.scss';
import { Space } from '@/components/space';

export const Demo: FC = () => {
  return (
    <>
      <div className={cls(styles.gapWrapper, styles.polyfill)} style={{ '--size': '32px' } as any}>
        <div className={styles.item}>一</div>

        <div className={styles.item}>二</div>

        <div className={styles.item}>二</div>
      </div>

      <Space type="vertical" className={styles.gapWrapper}>
        <div className={styles.item}>一</div>

        <div className={styles.item}>二</div>

        <div className={styles.item}>二</div>
      </Space>
    </>
  );
};
