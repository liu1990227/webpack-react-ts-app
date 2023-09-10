import { BaseComponentProps } from '@/components/types';
import { FC } from 'react';
import { PipeLineTask } from '../task';

import styles from '../index.scss';
import { GroupLine } from '../group-line';

export interface PipeLineStage {
  id: string;
  title: string;
  tasks: PipeLineTask[];
}

export interface PipeLineStageProps extends PipeLineStage, BaseComponentProps {
  index?: number;
  stageSize?: number;
}

export const PipeLineStage: FC<PipeLineStageProps> = ({ title, index, stageSize: groupSize, tasks, ...props }) => {
  return (
    <div {...props} className={styles.pipelineStage}>
      <div className={styles.title}>{title}</div>
      <GroupLine className={styles.tasks} {...{ index, groupSize }}>
        {tasks.map((task) => (
          <PipeLineTask key={task.id} {...task} />
        ))}
      </GroupLine>
    </div>
  );
};
