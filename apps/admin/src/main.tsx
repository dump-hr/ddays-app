import { MsalProvider } from '@azure/msal-react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { msalInstance } from './configs/msalInstance';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import React from 'react';

const queryClient = new QueryClient();

msalInstance.initialize().then(() => {
  msalInstance.handleRedirectPromise().then(() => {
    createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <MsalProvider instance={msalInstance}>
          <QueryClientProvider client={queryClient}>
            <App />
            <Toaster />
          </QueryClientProvider>
        </MsalProvider>
      </React.StrictMode>,
    );
  });
});
