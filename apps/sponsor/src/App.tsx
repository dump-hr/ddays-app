import './App.scss';

import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'wouter';

import favicon from './assets/favicon.ico';
import { Layout } from './components/Layout';
import { pages } from './constants/pages';
import { Path } from './constants/paths';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';

export const App = () => {
  return (
    <>
      <Helmet>
        <link rel='icon' type='image/x-icon' href={favicon}></link>
        <title>DUMP Days Partners</title>
      </Helmet>
      <Switch>
        <Route path={Path.Home} component={HomePage} />
        <Route path={Path.Login} component={LoginPage} />

        {pages.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            children={<Layout children={<Component />} />}
          />
        ))}
      </Switch>
      <Toaster />
    </>
  );
};
