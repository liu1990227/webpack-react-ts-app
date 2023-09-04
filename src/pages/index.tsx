import { Router } from '@/components/route';
import { routes } from '@/routes';

export const App = () => <Router routes={routes} defaultPath={routes?.[0].path} />;
