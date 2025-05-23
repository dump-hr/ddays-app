import './App.scss';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Redirect, Route, Switch } from 'wouter';

import favicon from './assets/favicon.ico';
import { Layout } from './components/Layout';
import { pages } from './constants/pages';
import { Path } from './constants/paths';
import { LoginPage } from './pages/LoginPage';

export const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <link rel='icon' type='image/x-icon' href={favicon}></link>
        <title>DUMP Days Partners</title>
      </Helmet>

      <Switch>
        <Route path={Path.Login} component={LoginPage} />

        {pages.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            children={<Layout children={<Component />} />}
          />
        ))}
        <Route
          path='/sponsor/materials'
          children={<Redirect to={Path.Materials} />}
        />
        {/*     
        <Route
          path='/sponsor/stand'
          children={<Redirect to={Path.SpotsPage} />}
        />
        */}
      </Switch>
      <Toaster />
    </HelmetProvider>
  );
};
