import { InteractionType } from '@azure/msal-browser';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsalAuthentication,
} from '@azure/msal-react';
import { Router } from './router/Router';

function App() {
  useMsalAuthentication(InteractionType.Redirect);

  return (
    <>
      <AuthenticatedTemplate>
        <Router />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div>Authenticating...</div>
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
