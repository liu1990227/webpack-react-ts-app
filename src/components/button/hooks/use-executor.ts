import { useState } from 'react';

type Task<P, R> = (param?: P) => R | undefined;

interface UseExecutorOption<P, R> {
  task?: Task<P, R>;
}

type Executor<P, R> = Task<P, Promise<R | undefined>>;

interface UseExecutor<P, R> {
  isExecuting: boolean;
  executor: Executor<P, R>;
}

export const useExecutor = <P, R>({ task }: UseExecutorOption<P, R>): UseExecutor<P, R> => {
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const executor: Executor<P, R> = async (param) => {
    try {
      setIsExecuting(true);
      return await task?.(param);
    } finally {
      setIsExecuting(false);
    }
  };

  return { isExecuting, executor };
};
