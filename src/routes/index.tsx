import { Route } from '@/components/route/hooks/use-route';
import { Demo } from '@/pages/demo';
import { DraggableDemo } from '@/pages/draggable';
import { FormDemo } from '@/pages/form-demo';
import { PipeLineDemo } from '@/pages/pipeline-demo';

export const routes: Route[] = [
  {
    title: 'form',
    path: '/form',
    render: <FormDemo />,
  },
  {
    title: 'demo',
    path: '/demo',
    render: <Demo />,
  },
  {
    title: 'draggable',
    path: '/draggalbe',
    render: <DraggableDemo />,
  },
  {
    title: 'pipeline',
    path: '/pipeline',
    render: <PipeLineDemo />,
  },
];
