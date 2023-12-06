import { Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Path } from './constants/paths';

import './App.scss';

import Layout from './components/Layout';
import AchievementsPage from './pages/AchievementsPage';
import HompePage from './pages/HomePage';
import GuestPage from './pages/GuestPage';
import EventsPage from './pages/EventsPage';

import { getCreateEventDto } from '@ddays-app/types';

const queryClient = new QueryClient();

const createEventDto = getCreateEventDto();
console.log(createEventDto);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Switch>
          <Route path={Path.Home} component={HompePage} />
          <Route path={Path.Guest} component={GuestPage} />˝
          <Route path={Path.Events} component={EventsPage} />
          <Route path={Path.Achievements} component={AchievementsPage} />
        </Switch>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
