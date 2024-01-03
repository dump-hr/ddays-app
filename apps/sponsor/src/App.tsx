import './App.scss';

import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'wouter';

import { Path } from './constants/paths';
import HomePage from './pages/HomePage';

export const App = () => {
  return (
    <>
      <Switch>
        <Route path={Path.Home} component={HomePage} />
      </Switch>
      <Toaster />
    </>
  );
};

export default App;
