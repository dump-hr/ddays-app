import './App.scss';

import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from '@azure/msal-react';
import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'wouter';

import { Layout } from './components/Layout';
import { Path } from './constants/paths';
import { CompanyPage } from './pages/CompanyPage';
import EventPage from './pages/EventPage';
import { HomePage } from './pages/HomePage';
import { InterestPage } from './pages/InterestPage';

export const App = () => {
  useMsalAuthentication(InteractionType.Redirect);

  return (
    <>
      <Layout>
        <Switch>
          <Route path={Path.Home} component={HomePage} />
          <Route path={Path.Company} component={CompanyPage} />
          <Route path={Path.Interest} component={InterestPage} />
          <Route path={Path.Event} component={EventPage} />
        </Switch>
      </Layout>
      <Toaster />
    </>
  );
};
