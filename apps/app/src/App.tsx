import { Router } from './router/Router';
import { MessageToast } from './components/MessageToast';
import { QueryClientProvider, QueryClient } from 'react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './constants/googleId';
import CustomCursor from './components/CustomCursor';

const queryClient = new QueryClient();

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <CustomCursor />
        <MessageToast />
        <Router />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
