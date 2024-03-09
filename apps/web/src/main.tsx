import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { App } from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
