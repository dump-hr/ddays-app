import './App.scss';

import { getCreateEventDto } from '@ddays-app/types';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Switch } from 'wouter';

import Layout from './components/Layout';
import { Path } from './constants/paths';
import AchievementsPage from './pages/AchievementsPage';
import EventsPage from './pages/EventsPage';
import FrequentlyAskedQuestionPage from './pages/FrequentlyAskedQuestion';
import GuestPage from './pages/GuestPage';
import HomePage from './pages/HomePage';
import NotificationsPage from './pages/NotificationsPage/NotificationsPage';
import SurveyQuestionsPage from './pages/SurveyQuestionsPage';

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
          <Route
            path={Path.FrequentlyAskedQuestions}
            component={FrequentlyAskedQuestionPage}
          />
          <Route path={Path.SurveyQuestions} component={SurveyQuestionsPage} />
          <Route path={Path.Notifications} component={NotificationsPage} />
        </Switch>
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
