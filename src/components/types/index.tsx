import { CSSProperties, ReactNode } from 'react';

export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface IBaseComponentProps {
  /**
   * 子节点
   */
  children?: ReactNode;
  /**
   * 类名
   */
  className?: string;
  /**
   * 内联样式
   */
  style?: CSSProperties;
}

export interface IBaseFormComponentProps<T = any> {
  /**
   * 值
   */
  value?: T;
  /**
   * 修改器
   */
  onChange?: (value?: T) => any;
}

export interface IBaseOption {
  /**
   * 标签
   */
  label: string;
  /**
   * 数据值
   */
  value: string;
  /**
   * 是否可选
   */
  disabled?: boolean;
}
