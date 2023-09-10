import { FC } from 'react';
import { BaseComponentProps } from '../types';

import styles from './index.scss';
import { PipeLineStage } from './stage';

export interface PipeLine {
  stages: PipeLineStage[];
}

export interface PipeLineProps extends PipeLine, BaseComponentProps {}

export const PipeLine: FC<PipeLineProps> = ({ stages, ...props }) => {
  return (
    <div {...props} className={styles.pipeline}>
      {stages.map((stage, index) => (
        <PipeLineStage key={stage.id} {...stage} {...{ index, stageSize: stages.length }} />
      ))}
    </div>
  );
};
