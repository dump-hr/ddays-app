import './App.scss';

import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from '@azure/msal-react';
import { getCreateEventDto } from '@ddays-app/types';
import { Toaster } from 'react-hot-toast';
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

const createEventDto = getCreateEventDto();
console.log(createEventDto);

export const App = () => {
  useMsalAuthentication(InteractionType.Redirect);

  return (
    <>
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
    </>
  );
};

export default App;
