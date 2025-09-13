// import { PublicClientApplication } from '@azure/msal-browser';
// import { MsalProvider } from '@azure/msal-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// import { msalConfig } from './configs/auth';
import { QueryClient, QueryClientProvider } from 'react-query';

// const msalInstance = new PublicClientApplication(msalConfig);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <MsalProvider instance={msalInstance}> */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    {/* </MsalProvider> */}
  </StrictMode>,
);
