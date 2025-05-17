import './App.scss';

import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from '@azure/msal-react';
import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'wouter';

import { Layout } from './components/Layout';
import { Path } from './constants/paths';
import AccreditationPage from './pages/AccreditationPage';
import AccreditationScanPage from './pages/AccreditationScanPage';
import AchievementPage from './pages/AchievementPage';
import { BoothPage } from './pages/BoothPage';
import CodePage from './pages/CodePage';
import { CompanyPage } from './pages/CompanyPage';
import EventPage from './pages/EventPage';
import { HomePage } from './pages/HomePage';
import { InterestPage } from './pages/InterestPage';
import RewardPage from './pages/RewardPage';
import SpeakerPage from './pages/SpeakerPage';
import TransactionScanPage from './pages/TransactionScanPage';

export const App = () => {
  useMsalAuthentication(InteractionType.Redirect);

  return (
    <>
      <Layout>
        <Switch>
          <Route path={Path.Home} component={HomePage} />
          <Route path={Path.Company} component={CompanyPage} />
          <Route path={Path.Interest} component={InterestPage} />
          <Route path={Path.Event} component={EventPage} />
          <Route path={Path.Speaker} component={SpeakerPage} />
          <Route path={Path.Booth} component={BoothPage} />
          <Route path={Path.Reward} component={RewardPage} />
          <Route path={Path.Achievement} component={AchievementPage} />
          <Route path={Path.Code} component={CodePage} />
          <Route path={Path.Accreditation} component={AccreditationPage} />
          <Route
            path={Path.AccreditationScan}
            component={AccreditationScanPage}
          />
          <Route path={Path.TransactionScan} component={TransactionScanPage} />
        </Switch>
      </Layout>
      <Toaster />
    </>
  );
};
