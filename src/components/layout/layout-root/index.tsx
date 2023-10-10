import { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import { LayoutContext } from '../hooks/use-layout';

import cls from 'classnames';

import styles from '../index.module.scss';
import { useThrottleFn } from 'ahooks';
import { Size, computeLayout, computeLayoutStyle } from '../utils';
import { Block, BlockProps } from '../../block';

export interface LayoutRootProps extends BlockProps, Pick<LayoutContext, 'w' | 'h' | 'maxScale' | 'minScale' | 'unit'> {
  /**
   * 容器大小，默认取视口大小
   */
  rootSize?: Size;
  /**
   * 页面属性
   */
  pageProps?: BlockProps;
}

export const LayoutRoot: FC<LayoutRootProps> = ({
  w,
  h,
  maxScale = [Infinity, Infinity],
  minScale = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  unit = 'px',

  rootSize,
  pageProps: { style: pageStyle, ...pageProps } = {},

  children,
  className,
  ...props
}) => {
  const computeRootLayout = () =>
    computeLayout(
      {
        w,
        h,
        scale: [1, 1],
        maxScale,
        minScale,
        root: true,
        unit,
      },
      rootSize ?? {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      },
    );

  const [rootLayout, setRootLayout] = useState<LayoutContext>(computeRootLayout);

  const {
    scale: [scale_x, scale_y],
  } = rootLayout;

  const layoutStyle: CSSProperties = useMemo(() => computeLayoutStyle({ w, h }, rootLayout), [scale_x, scale_y]);

  const { run: resetRootLayout } = useThrottleFn(
    () => {
      setRootLayout(computeRootLayout);
    },
    { leading: false },
  );

  useEffect(resetRootLayout, [rootSize?.width, rootSize?.height]);

  useEffect(() => {
    if (!rootSize) {
      window.addEventListener('resize', resetRootLayout);

      return () => window.removeEventListener('resize', resetRootLayout);
    }
  }, []);

  return (
    <LayoutContext.Provider value={rootLayout}>
      <Block {...props} className={cls(className, styles.layoutRoot)}>
        <Block {...pageProps} style={{ ...pageStyle, ...layoutStyle }}>
          {children}
        </Block>
      </Block>
    </LayoutContext.Provider>
  );
};
