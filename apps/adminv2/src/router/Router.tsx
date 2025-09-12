import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from './Layout';
import { RouteNames } from './routes';
import { HomePage } from '../pages/HomePage';
import { AdministratorsPage } from '../pages/AdministratorsPage';
import { ShoppingPage } from '../pages/ShoppingPage';
import { SpeakersPage } from '../pages/SpeakersPage';
import { AchievementPage } from '../pages/AchievementPage';
import { EventPage } from '../pages/EventPage';
import { BoothPage } from '../pages/BoothPage';
import { CompanyPage } from '../pages/CompanyPage';
import { InterestsPage } from '../pages/InterestsPage';
import { RewardPage } from '../pages/RewardPage';
import { CodePage } from '../pages/CodePage';
import { UsersPage } from '../pages/UsersPage';
import DatabasePage from '../pages/DatabasePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path={RouteNames.HOME} element={<HomePage />} />
        <Route
          path={RouteNames.ADMINISTRATORS}
          element={<AdministratorsPage />}
        />
        <Route path={RouteNames.DATABASE} element={<DatabasePage />} />
        <Route path={RouteNames.USERS} element={<UsersPage />} />
        <Route path={RouteNames.SPEAKERS} element={<SpeakersPage />} />
        <Route path={RouteNames.SHOPPING} element={<ShoppingPage />} />
        <Route path={RouteNames.ACHIEVEMENTS} element={<AchievementPage />} />
        <Route path={RouteNames.EVENTS} element={<EventPage />} />
        <Route path={RouteNames.BOOTHS} element={<BoothPage />} />
        <Route path={RouteNames.COMPANIES} element={<CompanyPage />} />
        <Route path={RouteNames.INTERESTS} element={<InterestsPage />} />
        <Route path={RouteNames.REWARDS} element={<RewardPage />} />
        <Route path={RouteNames.CODES} element={<CodePage />} />
        <Route path={RouteNames.ERROR} element={<div>Error</div>} />
      </Route>
    </>,
  ),
  {
    basename: RouteNames.BASENAME,
  },
);

export const Router = () => {
  return <RouterProvider router={router} />;
};

export default router;
