import { createRoot } from 'react-dom/client';

import { Button } from '@/components/button';

import './index.css';

createRoot(document.querySelector('#webpack-app')).render(
  <>
    <div style={{ display: 'flex', columnGap: 8 }}>
      <Button />
      <Button />
    </div>
  </>,
);
