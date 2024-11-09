import './App.scss';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'wouter';

import faviconBlack from './assets/favicon-black.png';
import faviconWhite from './assets/favicon-white.png';
import favicon from './assets/Favicon.jpg'
import openGraphImage from './assets/Open graph image.jpg';

import { Path } from './constants/paths';
import { getPageTitle } from './helpers';
import { Chatbot } from './pages/Chatbot';
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
        <link
          href={favicon}
          rel='icon'
        />
        <meta property='og:image' content={openGraphImage} />

        <title>{getPageTitle()}</title>
      </Helmet>

      <Switch>
        <Route path={Path.Landing} component={LandingPage} />
        <Route path={Path.Chatbot} component={Chatbot} />
      </Switch>

      <Toaster />
    </HelmetProvider>
  );
};
