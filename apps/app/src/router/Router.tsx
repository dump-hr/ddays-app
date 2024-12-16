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
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PasswordResetPage } from '../pages/PasswordResetPage';
import { ProfilePage } from '../pages/ProfilePage';
import { RegisterPage } from '../pages/RegisterPage';
import { SchedulePage } from '../pages/SchedulePage';
import { ShoppingPage } from '../pages/ShoppingPage';
import { NavigationLayout } from '../layout';

// TODO: better error boundary
// TODO: absolute imports
const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path={RouteNames.LOGIN} element={<LoginPage />} />
      <Route path={RouteNames.REGISTER} element={<RegisterPage />} />
      <Route path={RouteNames.PASSWORD_RESET} element={<PasswordResetPage />} />
      <Route element={<NavigationLayout />} errorElement={<>error</>}>
        <Route path={RouteNames.HOME} element={<HomePage />} />
        <Route path={RouteNames.PROFILE} element={<ProfilePage />} />
        <Route path={RouteNames.COMPANIES} element={<CompaniesPage />} />
        <Route path={RouteNames.SCHEDULE} element={<SchedulePage />} />
        <Route path={RouteNames.FLY_TALKS} element={<FlyTalksPage />} />
        <Route path={RouteNames.SHOPPING} element={<ShoppingPage />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </React.Fragment>,
  ),
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
