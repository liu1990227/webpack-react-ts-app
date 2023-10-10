import { FC, HTMLProps } from 'react';

import cls from 'classnames';

import styles from './index.module.scss';
import { useExecutor } from './hooks/use-executor';
import { IBaseComponentProps } from '../types';
import { classMapper } from '../utils';
import { Loading, LoadingProps } from '../loading';

type ButtonType = 'light' | 'dark' | 'block';

export interface ButtonProps extends IBaseComponentProps, Omit<HTMLProps<HTMLButtonElement>, 'size' | 'type'> {
  /**
   * 尺寸
   */
  size?: 'small' | 'middle' | 'large';
  /**
   * 样式
   * * light，浅色
   * * drak，深色
   * * block，整块
   */
  type?: ButtonType | ButtonType[];
  /**
   * Loading 属性
   */
  loadingProps?: LoadingProps;
}

export const Button: FC<ButtonProps> = ({
  size = 'middle',
  type = 'light',
  children,
  className,
  onClick,
  disabled,
  loadingProps,
  ...props
}) => {
  const { executor: handleOnClick, isExecuting } = useExecutor({ task: onClick });

  const loadingColor = [type].flat().includes('dark') ? 'white' : '#242B38';

  return (
    <button
      {...props}
      disabled={isExecuting || disabled}
      className={cls(className, styles.button, styles[size], classMapper(styles, type), {
        [styles.disabled]: disabled,
      })}
      onClick={handleOnClick}
    >
      <Loading loading={isExecuting} color={loadingColor} {...loadingProps}>
        {children}
      </Loading>
    </button>
  );
};
