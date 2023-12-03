import { Route, Switch } from 'wouter';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Path } from './constants/paths';

import Layout from './components/Layout';
import AchievementsPage from './pages/AchievementsPage';
import HompePage from './pages/HomePage';
import GuestPage from './pages/GuestPage';
import EventsPage from './pages/EventsPage';
import React from 'react';

const queryClient = new QueryClient();

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
