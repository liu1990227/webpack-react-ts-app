import { PipeLine } from '@/components/pipeline';

export const PipeLineDemo = () => {
  const stages: PipeLine = {
    stages: [
      {
        id: '1',
        title: '编译',
        tasks: [
          {
            id: '1',
            state: 'done',
            title: '编译',
            timeline: [new Date()],
          },
        ],
      },
      {
        id: '2',
        title: '代码扫描和检查',
        tasks: [
          {
            id: '1',
            state: 'done',
            title: 'STC',
            timeline: [new Date()],
          },
          {
            id: '2',
            state: 'done',
            title: 'PMD',
            timeline: [new Date()],
          },
        ],
      },
      {
        id: '3',
        title: '集成测试',
        tasks: [
          {
            id: '1',
            state: 'processing',
            title: '集成测试',
            timeline: [new Date()],
          },
          {
            id: '2',
            state: 'processing',
            title: '集成测试',
            timeline: [new Date()],
          },
        ],
      },
      {
        id: '4',
        title: '发布',
        tasks: [
          {
            id: '1',
            state: 'processing',
            title: '发布',
            timeline: [new Date()],
          },
        ],
      },
    ],
  };

  return <PipeLine {...stages} />;
};
