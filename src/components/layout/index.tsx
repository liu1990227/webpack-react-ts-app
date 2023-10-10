import { FC, useMemo } from 'react';
import { LayoutContext, useLayout } from './hooks/use-layout';

import cls from 'classnames';

import styles from './index.module.scss';

import { computeLayoutStyle } from './utils';
import { Block, BlockProps } from '../block';

export * from './layout-root';

export interface LayoutProps extends BlockProps, Pick<LayoutContext, 'w' | 'h' | 'l' | 'r' | 't' | 'b'> {}

export const Layout: FC<LayoutProps> = ({
  w,
  h,
  t,
  r,
  b,
  l,

  children,
  style,
  className,
  ...props
}) => {
  const layout: LayoutContext = { w, h, t, r, b, l };

  const rootLayout = useLayout();

  const {
    scale: [scale_x, scale_y],
  } = rootLayout;

  const layoutStyle = useMemo(() => computeLayoutStyle(layout, rootLayout), [scale_x, scale_y]);

  return (
    <Block
      {...props}
      className={cls(className, {
        [styles.layout]: t || b || l || r,
        [styles.top]: t === true,
        [styles.right]: r === true,
        [styles.bottom]: b === true,
        [styles.left]: l === true,
      })}
      style={{
        ...style,
        ...layoutStyle,
      }}
    >
      {children}
    </Block>
  );
};
