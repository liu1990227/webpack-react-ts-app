import { Route } from '@/components/route/hooks/use-route';
import { Demo } from '@/pages/demo';
import { FormDemo } from '@/pages/form-demo';

export const routes: Route[] = [
  {
    title: 'form-demo',
    path: '/app/form',
    render: <FormDemo />,
  },
  {
    title: 'demo',
    path: '/app/demo',
    render: <Demo />,
  },
];
