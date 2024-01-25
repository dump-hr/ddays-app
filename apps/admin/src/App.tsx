import './App.scss';

import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from '@azure/msal-react';
import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'wouter';

import { Layout } from './components/Layout';
import { Path } from './constants/paths';
import { CompanyPage } from './pages/CompanyPage';
import { HomePage } from './pages/HomePage';

export const App = () => {
  useMsalAuthentication(InteractionType.Redirect);

  return (
    <>
      <Layout>
        <Switch>
          <Route path={Path.Home} component={HomePage} />
          <Route path={Path.Company} component={CompanyPage} />
        </Switch>
      </Layout>
      <Toaster />
    </>
  );
};
