import { BaseComponentProps } from '@/components/types';
import { FC, useEffect, useRef, useState } from 'react';

import styles from './index.scss';

import cls from 'classnames';

export interface GroupLineProps extends BaseComponentProps {
  index?: number;
  groupSize?: number;
}

export const GroupLine: FC<GroupLineProps> = ({ children, index = 0, groupSize = 1, className, ...props }) => {
  const groupRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);
  const lineJoinRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const isFirstGroup = index === 0;
  const isLastGroup = index === groupSize - 1;

  const lineClassName = cls({
    [styles.visible]: visible,
    [styles.isFirstGroup]: isFirstGroup,
    [styles.isLastGroup]: isLastGroup,
  });

  useEffect(() => {
    const { firstChild, lastChild } = groupRef.current;

    if (firstChild && lastChild) {
      const { top: y1, height: h1 } = (firstChild as HTMLDivElement).getBoundingClientRect();
      const { top: y2, height: h2 } = (lastChild as HTMLDivElement).getBoundingClientRect();
      lineTopRef.current.style.height = `${h1 + h2 / 2}px`;
      lineTopRef.current.style.top = `${h1 / 2}px`;
      lineBottomRef.current.style.height = `${y2 + h2 / 2 - (y1 + h1)}px`;
      lineBottomRef.current.style.top = `${h1}px`;
      lineJoinRef.current.style.top = `${h1 / 2}px`;
      setVisible(firstChild !== lastChild);
    }
  }, []);

  return (
    <div className={cls(styles.groupLine)}>
      <div className={cls(styles.line, styles.lineJoin, lineClassName)} ref={lineJoinRef} />
      <div className={cls(styles.line, styles.lineTop, lineClassName)} ref={lineTopRef} />
      <div className={cls(styles.line, styles.lineBottom, lineClassName)} ref={lineBottomRef} />
      <div {...props} ref={groupRef} className={cls(className, styles.content)}>
        {children}
      </div>
    </div>
  );
};
