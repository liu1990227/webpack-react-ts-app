import { BaseComponentProps } from '@/components/types';

import styles from '../index.scss';
import { FC } from 'react';

export interface PipeLineTask {
  id: string;
  state: 'init' | 'processing' | 'done';
  title: string;
  timeline: (Date | string)[];
}

export interface PipeLineTaskProps extends PipeLineTask, BaseComponentProps {}

export const PipeLineTask: FC<PipeLineTaskProps> = ({ state, title, timeline }: PipeLineTaskProps) => {
  return (
    <div className={styles.pipelineTask}>
      <div className={styles.state}>{state === 'done' ? '✅' : '...'}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.timeline}>
        {timeline.map((time) => (
          <div key={time.toLocaleString()}>{time.toLocaleString()}</div>
        ))}
      </div>
    </div>
  );
};
