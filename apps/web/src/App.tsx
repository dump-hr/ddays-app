import './App.scss';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'wouter';

import faviconBlack from './assets/favicon-black.png';
import faviconWhite from './assets/favicon-white.png';
import { Path } from './constants/paths';
import { getPageTitle } from './helpers';
import { LandingPage } from './pages/LandingPage';

export const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <link
          href={faviconBlack}
          rel='icon'
          media='(prefers-color-scheme: light)'
        />
        <link
          href={faviconWhite}
          rel='icon'
          media='(prefers-color-scheme: dark)'
        />

        <title>{getPageTitle()}</title>
      </Helmet>

      <Switch>
        <Route path={Path.Landing} component={LandingPage} />
      </Switch>

      <Toaster />
    </HelmetProvider>
  );
};
