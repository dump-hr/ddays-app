import { Router } from './router/Router';
import { MessageToast } from './components/MessageToast';
import { UserProvider } from './context/UserContext';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <MessageToast />
        <Router />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
