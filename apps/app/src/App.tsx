import { Router } from './router/Router';
import { MessageToast } from './components/MessageToast';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MessageToast />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
