import { IBaseComponentProps } from '../types';
import { CSSProperties, FC, useMemo } from 'react';
import cls from 'classnames';
import styles from './index.module.scss';
import { classMapper } from '../utils';

type BlockType = 'center' | 'vertical-center';

export interface BlockProps extends IBaseComponentProps {
  /**
   * 背景
   * * 图片地址
   * * 颜色
   */
  bg?: string;
  /**
   * 对齐
   * * center，水平居中
   * * vertical-center，垂直居中
   */
  type?: BlockType | BlockType[];
  /**
   * 边框盒子，默认 false
   */
  borderBox?: boolean;
}

export const Block: FC<BlockProps> = ({ bg = '', children, className, style, type = '', borderBox, ...props }) => {
  const computedStyle = useMemo(() => {
    const s: CSSProperties = {};

    if (/^linear-gradiant/.test(bg)) {
      s.backgroundImage = `url(${bg})`;
    } else {
      s.backgroundColor = bg;
    }

    if (borderBox) {
      s.boxSizing = 'border-box';
    }

    return s;
  }, []);

  return (
    <div
      {...props}
      style={{ ...computedStyle, ...style }}
      className={cls(className, styles.bg, classMapper(styles, type))}
    >
      {children}
    </div>
  );
};
