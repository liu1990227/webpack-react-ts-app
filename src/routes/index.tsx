import { Route } from '@/components/route/hooks/use-route';
import { Demo } from '@/pages/demo';
import { DraggableDemo } from '@/pages/draggable-demo';
import { FormDemo } from '@/pages/form-demo';
import { LayoutDemo } from '@/pages/layout-demo';
import { PipeLineDemo } from '@/pages/pipeline-demo';

export const routes: Route[] = [
  {
    title: 'demo',
    path: '/demo',
    render: <Demo />,
  },
  {
    title: 'layout',
    path: '/layout',
    render: <LayoutDemo />,
  },
  {
    title: 'form',
    path: '/form',
    render: <FormDemo />,
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
