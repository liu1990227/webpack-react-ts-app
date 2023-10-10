import { createContext, useContext } from 'react';

export interface LayoutContext {
  /**
   * 容器宽 | 拉伸
   */
  w?: number | boolean;
  /**
   * 容器高 | 拉伸
   */
  h?: number | boolean;
  /**
   * 上偏移 | 吸顶
   */
  t?: number | boolean;
  /**
   * 右偏移 | 吸右
   */
  r?: number | boolean;
  /**
   * 下偏移 | 吸底
   */
  b?: number | boolean;
  /**
   * 左偏移 | 吸左
   */
  l?: number | boolean;
  /**
   * 缩放比
   */
  scale?: number[];
  /**
   * 最大缩放比
   */
  maxScale?: number[];
  /**
   * 最小缩放比
   */
  minScale?: number[];
  /**
   * 根节点标识
   */
  root?: boolean;
  /**
   * 单位，默认 px
   */
  unit?: 'px' | 'rpx';
}

export const LayoutContext = createContext<LayoutContext>({});

export const useLayout = () => useContext(LayoutContext);
