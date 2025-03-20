import { Router } from './router/Router';
import { MessageToast } from './components/MessageToast';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <MessageToast />
      <Router />
    </UserProvider>
  );
}

export default App;
