import './App.scss';

import { getCreateEventDto } from '@ddays-app/types';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Switch } from 'wouter';

import Layout from './components/Layout';
import { Path } from './constants/paths';
import AchievementsPage from './pages/AchievementsPage';
import EventsPage from './pages/EventsPage';
import GuestPage from './pages/GuestPage';
import HomePage from './pages/HomePage';

const queryClient = new QueryClient();

const createEventDto = getCreateEventDto();
console.log(createEventDto);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Switch>
          <Route path={Path.Home} component={HomePage} />
          <Route path={Path.Guest} component={GuestPage} />˝
          <Route path={Path.Events} component={EventsPage} />
          <Route path={Path.Achievements} component={AchievementsPage} />
        </Switch>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
