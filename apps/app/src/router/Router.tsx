import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { RouteNames } from './routes';
import { CompaniesPage } from '../pages/CompaniesPage';
import { FlyTalksPage } from '../pages/FlyTalksPage';
import { LoginPage } from '../pages/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PasswordResetPage } from '../pages/PasswordResetPage';
import { ProfilePage } from '../pages/ProfilePage';
import { SettingsPage } from '../pages/SettingsPage';
import { RegisterPage } from '../pages/RegisterPage';
import { SchedulePage } from '../pages/SchedulePage';
import { ShoppingPage } from '../pages/ShoppingPage';
import { NotificationsPage } from '../pages/NotificationsPage';
import { NavigationLayout } from '../layout';
import Home from '../pages/Home';
import TestPage from '../pages/TestPage/TestPage';
import { ConfirmEmailPage } from '../pages/ConfirmEmailPage/ConfirmEmailPage';
import { TermsAndConditionsPage } from '../pages/TermsAndConditionsPage';
import { ProfileAchievementsPage } from '@/pages/ProfileAchievementsPage';
import { RateCompanyPage } from '../pages/RateCompanyPage';
import { ProfileLeaderboardPage } from '@/pages/ProfileLeaderboardPage';
import { RewardsPage } from '@/pages/RewardsPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route
        path={RouteNames.TERMS_AND_CONDITIONS}
        element={<TermsAndConditionsPage />}
      />
      <Route path={RouteNames.LOGIN} element={<LoginPage />} />
      <Route path={RouteNames.REGISTER} element={<RegisterPage />} />
      <Route path={RouteNames.CONFIRM_EMAIL} element={<ConfirmEmailPage />} />
      <Route path={RouteNames.PASSWORD_RESET} element={<PasswordResetPage />} />
      <Route path={RouteNames.NOTIFICATIONS} element={<NotificationsPage />} />
      <Route path={RouteNames.RATE_COMPANY} element={<RateCompanyPage />} />
      <Route element={<NavigationLayout />} errorElement={<>error</>}>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.PROFILE}>
          <Route index element={<ProfilePage />} />
          <Route path={RouteNames.PROFILE_INTERESTS} element={<></>} />
          <Route path={RouteNames.PROFILE_REWARDS} element={<RewardsPage />} />
          <Route
            path={RouteNames.PROFILE_SETTINGS}
            element={<SettingsPage />}
          />
          <Route
            path={RouteNames.PROFILE_ACHIEVEMENTS}
            element={<ProfileAchievementsPage />}
          />
          <Route path={RouteNames.PROFILE_AVATARS} element={<></>} />
          <Route
            path={RouteNames.PROFILE_LEADERBOARD}
            element={<ProfileLeaderboardPage />}
          />
          <Route path={RouteNames.PROFILE_RECOMMENDATIONS} element={<></>} />
        </Route>
        <Route path={RouteNames.COMPANIES} element={<CompaniesPage />} />
        <Route path={RouteNames.SCHEDULE} element={<SchedulePage />} />
        <Route path={RouteNames.FLY_TALKS} element={<FlyTalksPage />} />
        <Route path={RouteNames.SHOPPING} element={<ShoppingPage />} />
      </Route>
      <Route path='/app/test' element={<TestPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </React.Fragment>,
  ),
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
