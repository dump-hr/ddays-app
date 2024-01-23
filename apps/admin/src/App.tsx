import './App.scss';

import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from '@azure/msal-react';
import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'wouter';

import { Layout } from './components/Layout';
import { Path } from './constants/paths';
import { AchievementsPage } from './pages/AchievementsPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { EventsPage } from './pages/EventsPage';
import { FrequentlyAskedQuestionsPage } from './pages/FrequentlyAskedQuestionsPage';
import { GuestPage } from './pages/GuestPage';
import { HomePage } from './pages/HomePage';
import { InterestsPage } from './pages/InterestsPage';
import { NotificationsPage } from './pages/NotificationsPage/NotificationsPage';
import { SurveyQuestionsPage } from './pages/SurveyQuestionsPage';

export const App = () => {
  useMsalAuthentication(InteractionType.Redirect);

  return (
    <>
      <Layout>
        <Switch>
          <Route path={Path.Home} component={HomePage} />
          <Route path={Path.Guest} component={GuestPage} />
          <Route path={Path.Events} component={EventsPage} />
          <Route path={Path.Achievements} component={AchievementsPage} />
          <Route path={Path.Interests} component={InterestsPage} />
          <Route
            path={Path.FrequentlyAskedQuestions}
            component={FrequentlyAskedQuestionsPage}
          />
          <Route path={Path.SurveyQuestions} component={SurveyQuestionsPage} />
          <Route path={Path.Notifications} component={NotificationsPage} />
          <Route path={Path.Companies} component={CompaniesPage} />
        </Switch>
      </Layout>
      <Toaster />
    </>
  );
};
