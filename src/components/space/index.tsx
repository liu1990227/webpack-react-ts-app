import { CSSProperties, FC, useMemo } from 'react';

import cls from 'classnames';

import styles from './index.module.scss';
import { IBaseComponentProps } from '../types';
import { classMapper } from '../utils';

type SpaceType = 'center' | 'first-center' | 'horizontal' | 'vertical' | 'inline';

export interface SpaceProps extends IBaseComponentProps {
  /**
   * 间距，默认 32 px
   */
  gap?: number;
  /**
   * 单个样式
   */
  singleStyle?: CSSProperties;
  /**
   * 类型，默认 horizontal
   * * horizontal，水平
   * * vertical，垂直
   * * center，居中
   * * first-center，首行居中
   * * inline，行内
   */
  type?: SpaceType | SpaceType[];
  /**
   * 弹性比例
   */
  flex?: number[];
}

export const Space: FC<SpaceProps> = ({
  gap = 32,
  children,
  className,
  style,
  singleStyle,
  type = 'horizontal',
  flex,
  ...props
}) => {
  const isSingle = Array.isArray(children) ? children.filter((v) => v).length === 1 : true;

  const nodes = useMemo(() => {
    const childNods = [children].flat().map((node, i) => {
      if (Array.isArray(flex)) {
        return (
          <div key={i} style={{ flex: flex[Math.min(flex.length - 1, i)] }}>
            {node}
          </div>
        );
      }

      return node;
    });

    const isFirstCenterType = [type].join().includes('first-center');

    if (!isFirstCenterType) {
      return childNods;
    }

    const [first, ...rest] = childNods;

    return (
      <>
        <div className={styles.firstNode}>{first}</div>
        {rest}
      </>
    );
  }, [type, children, flex]);

  return (
    <div
      {...props}
      className={cls(className, styles.spaceWrapper, classMapper(styles, type))}
      style={{ gap: `${gap}px`, ...style, ...(isSingle ? singleStyle : {}) }}
    >
      {nodes}
    </div>
  );
};
