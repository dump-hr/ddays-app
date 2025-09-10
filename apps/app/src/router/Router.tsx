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
import { ProfileInterestsPage } from '../pages/ProfileInterestsPage';
import FlyTalksApplyPage from '../pages/FlyTalksApplyPage';
import { ConfirmEmailPage } from '../pages/ConfirmEmailPage/ConfirmEmailPage';
import { TermsAndConditionsPage } from '../pages/TermsAndConditionsPage';
import { ProfileAchievementsPage } from '@/pages/ProfileAchievementsPage';
import { AvatarsPage } from '@/pages/AvatarsPage';
import { RateCompanyPage } from '../pages/RateCompanyPage';
import { RateLecturePage } from '../pages/RateLecturePage';
import { ProfileLeaderboardPage } from '@/pages/ProfileLeaderboardPage';
import { RewardsPage } from '@/pages/RewardsPage';
import ProfileRecommendationsPage from '@/pages/ProfileRecommendationsPage';
import ScannerPage from '@/pages/ScannerPage/ScannerPage';
import { RegistrationLayout } from '@/layout/RegistrationLayout';
import FloorPlanPage from '@/pages/FloorPlanPage/FloorPlanPage';
import AccreditationScanPage from '@/pages/AccreditationScanPage';

// import ClosedAppPage from '@/pages/ClosedAppPage';

//maknit kad se otvori aplikacija
// const isDev = process.env.NODE_ENV === 'dev';

const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      {/* {isDev && ( */}
      {/* <> */}
      <Route
        path={RouteNames.TERMS_AND_CONDITIONS}
        element={<TermsAndConditionsPage />}
      />
      <Route path={RouteNames.LOGIN} element={<LoginPage />} />
      <Route element={<RegistrationLayout />}>
        <Route path={RouteNames.REGISTER} element={<RegisterPage />} />
        <Route path={RouteNames.PROFILE_AVATARS} element={<AvatarsPage />} />
      </Route>
      <Route path={RouteNames.CONFIRM_EMAIL} element={<ConfirmEmailPage />} />
      <Route path={RouteNames.PASSWORD_RESET} element={<PasswordResetPage />} />
      <Route
        path={RouteNames.PASSWORD_RESET_WITH_TOKEN}
        element={<PasswordResetPage />}
      />
      <Route path={RouteNames.NOTIFICATIONS} element={<NotificationsPage />} />
      <Route path={RouteNames.RATE_COMPANY} element={<RateCompanyPage />} />
      <Route path={RouteNames.RATE_EVENT} element={<RateLecturePage />} />
      <Route path={RouteNames.SCANNER} element={<ScannerPage />} />
      <Route path={RouteNames.FLOOR_PLAN} element={<FloorPlanPage />} />
      <Route element={<NavigationLayout />} errorElement={<>error</>}>
        <Route path={RouteNames.HOME} element={<Home />} />

        <Route path={RouteNames.PROFILE}>
          <Route index element={<ProfilePage />} />
          <Route
            path={RouteNames.PROFILE_INTERESTS}
            element={<ProfileInterestsPage />}
          />
          <Route path={RouteNames.PROFILE_REWARDS} element={<RewardsPage />} />
          <Route
            path={RouteNames.PROFILE_RECOMMENDATIONS}
            element={<ProfileRecommendationsPage></ProfileRecommendationsPage>}
          />
          <Route
            path={RouteNames.PROFILE_SETTINGS}
            element={<SettingsPage />}
          />
          <Route
            path={RouteNames.PROFILE_ACHIEVEMENTS}
            element={<ProfileAchievementsPage />}
          />
          <Route
            path={RouteNames.PROFILE_LEADERBOARD}
            element={<ProfileLeaderboardPage />}
          />
          <Route path={RouteNames.PROFILE_RECOMMENDATIONS} element={<></>} />
        </Route>
        <Route path={RouteNames.COMPANIES} element={<CompaniesPage />} />
        <Route path={RouteNames.SCHEDULE} element={<SchedulePage />} />
        <Route path={RouteNames.FLY_TALKS} element={<FlyTalksPage />} />
        <Route
          path={RouteNames.FLY_TALKS_APPLY}
          element={<FlyTalksApplyPage />}
        />
        <Route path={RouteNames.SHOPPING} element={<ShoppingPage />} />
        <Route
          path={RouteNames.ACCREDITATION_SCAN}
          element={<AccreditationScanPage />}
        />
      </Route>
      <Route path='/app/test' element={<TestPage />} />
      <Route path='*' element={<NotFoundPage />} />
      {/* </> */}
      {/* )} */}

      {/* <Route path='*' element={<ClosedAppPage />} /> */}
    </React.Fragment>,
  ),
);

export const Router = () => {
  return <RouterProvider router={router} />;
};

export default router;
