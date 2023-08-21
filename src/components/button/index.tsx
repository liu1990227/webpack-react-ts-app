import { FC, useState } from 'react';

import styles from './index.scss';

export const Button: FC = () => {
  const [count, setCount] = useState(0);

  const handleCount = () => setCount(count + 1);

  return (
    <button className={styles.btn} onClick={handleCount}>
      {count}
    </button>
  );
};
