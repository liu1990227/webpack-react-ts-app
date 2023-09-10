import { FC, useEffect, useRef, useState } from 'react';

import styles from './index.scss';

export type Position = { x: number; y: number };

import cls from 'classnames';
import { BaseComponentProps } from '../types';

export interface DraggableProps extends BaseComponentProps {
  disabled?: boolean;
}

export const Draggable: FC<DraggableProps> = ({ disabled, className, style, children, ...props }) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isHolding, setIsHolding] = useState<Position | null>(null);
  const [basePosition, setBasePosition] = useState<Position>(null);
  const draggableDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getMousePosition = (e: MouseEvent) => {
      if (isHolding) {
        const [x, y] = [e.clientX - basePosition.x - isHolding.x, e.clientY - basePosition.y - isHolding.y];
        setPosition({ x, y });
      }
    };

    window.addEventListener('mousemove', getMousePosition);

    return () => window.removeEventListener('mousemove', getMousePosition);
  }, [isHolding, basePosition]);

  useEffect(() => {
    const { left: x, top: y } = draggableDom.current.getBoundingClientRect();
    setBasePosition({ x, y });
  }, []);

  return (
    <div
      {...props}
      onMouseDown={({ nativeEvent: { offsetX: x, offsetY: y } }) => {
        if (!disabled) {
          setIsHolding({ x, y });
        }
      }}
      onMouseUp={() => setIsHolding(null)}
      ref={draggableDom}
      style={{ ...style, transform: `translate(${position.x}px, ${position.y}px)` }}
      className={cls(styles.draggable, className)}
    >
      {children}
    </div>
  );
};
