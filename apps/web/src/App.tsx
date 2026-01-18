import './App.scss';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'wouter';

// import { Path } from './constants/paths';
import { getPageTitle } from './helpers';
// import { Chatbot } from './pages/Chatbot';
// import { LandingPage } from './pages/LandingPage';
import { TemporaryLandingPage } from './pages/TemporaryLandingPage';

export const App = () => {
  return (
    <HelmetProvider>
      <Helmet>

        <title>{getPageTitle()}</title>
      </Helmet>

      <Switch>
        {/* <Route path={Path.Landing} component={LandingPage} /> */}
        {/*<Route path={Path.Chatbot} component={Chatbot} /> */}
        <Route path='/' component={TemporaryLandingPage} />
      </Switch>

      <Toaster />
    </HelmetProvider>
  );
};
