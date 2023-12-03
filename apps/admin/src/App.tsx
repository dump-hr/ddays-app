import { Route, Switch } from 'wouter';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Path } from './constants/paths';
import AchievementsPage from './pages/AchievementsPage';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path={Path.Achievements} component={AchievementsPage} />
      </Switch>
    </QueryClientProvider>
  );
};
