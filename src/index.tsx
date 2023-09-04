import { createRoot } from 'react-dom/client';

import './index.css';

import { App } from './pages';

createRoot(document.querySelector('#webpack-app')).render(<App />);
