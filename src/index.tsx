import { createRoot } from 'react-dom/client';

import './index.css';
import { Demo } from './components/demo';

createRoot(document.querySelector('#webpack-app')).render(
  <>
    <Demo />
  </>,
);
