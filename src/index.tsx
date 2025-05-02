import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App, Providers } from '@app';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Providers>
        <App />
      </Providers>
    </BrowserRouter>
  </StrictMode>
);
