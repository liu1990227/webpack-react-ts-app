import { FC } from 'react';

import styles from './index.scss';
import { Draggable } from '@/components/draggable';

export const DraggableDemo: FC = () => {
  return (
    <>
      <div style={{ position: 'absolute', right: 20, top: 50, outline: 'gray 5px solid' }}>
        <Draggable className={styles.draggable} style={{ background: 'red' }}>
          red
        </Draggable>

        <Draggable className={styles.draggable} style={{ background: 'green' }}>
          green
        </Draggable>

        <Draggable className={styles.draggable} style={{ background: 'blue' }}>
          blue
        </Draggable>
      </div>
      <h1>h1</h1>
    </>
  );
};
