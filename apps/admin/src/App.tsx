import { Route, Switch } from 'wouter';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Path } from './constants/paths';

import Layout from './components/Layout';
import AchievementsPage from './pages/AchievementsPage';
import HompePage from './pages/HomePage';
import GuestPage from './pages/GuestPage';
import EventsPage from './pages/EventsPage';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Switch>
          <Route path='/' component={HompePage} />
          <Route path='/guest' component={GuestPage} />˝
          <Route path='/events' component={EventsPage} />
          <Route path={Path.Achievements} component={AchievementsPage} />
        </Switch>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
