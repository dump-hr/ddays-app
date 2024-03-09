import './App.scss';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'wouter';

import favicon from './assets/favicon.ico';
import { Path } from './constants/paths';
import { getPageTitle } from './helpers';
import { LandingPage } from './pages/LandingPage';

export const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <link rel='icon' type='image/x-icon' href={favicon}></link>
        <title>{getPageTitle()}</title>
      </Helmet>

      <Switch>
        <Route path={Path.Landing} component={LandingPage} />
      </Switch>

      <Toaster />
    </HelmetProvider>
  );
};
