import './App.scss';

import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'wouter';

import Layout from './components/Layout';
import { pages } from './constants/pages';
import { Path } from './constants/paths';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

export const App = () => {
  return (
    <>
      <Switch>
        <Route path={Path.Home} component={HomePage} />

        {pages.map(({ path, component }) => (
          <Route
            key={path}
            path={path}
            children={<Layout>{component({})}</Layout>}
          />
        ))}

        <Route path={Path.Login} component={LoginPage} />
      </Switch>
      <Toaster />
    </>
  );
};

export default App;
