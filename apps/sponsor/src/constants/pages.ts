import CompanyProfile from '../pages/CompanyProfile';
import HomePage from '../pages/HomePage';
import MaterialsPage from '../pages/MaterialsPage';
import { Path } from './paths';

type Page = {
  path: Path;
  name: string;
  icon: string;
  Component: React.FC;
};

export const pages: Page[] = [
  {
    path: Path.Materials,
    name: 'Predaja materijala',
    icon: '/materials.svg',
    Component: MaterialsPage,
  },
  {
    path: Path.Stand,
    icon: '/stand.svg',
    name: 'Štand',
    Component: HomePage,
  },
  {
    path: Path.FlyTalks,
    icon: '/fly-talks.svg',
    name: 'Fly Talks',
    Component: HomePage,
  },
  {
    path: Path.Profile,
    icon: '/profile.svg',
    name: 'Profil tvrtke',
    Component: CompanyProfile,
  },
];
