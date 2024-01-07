import HomePage from '../pages/HomePage';
import MaterialsPage from '../pages/MaterialsPage';
import { Path } from './paths';

type Page = {
  path: Path;
  name: string;
  icon: string;
  component: React.FC;
};

export const pages: Page[] = [
  {
    path: Path.Materials,
    name: 'Predaja materijala',
    icon: '/materials.svg',
    component: MaterialsPage,
  },
  {
    path: Path.Stand,
    icon: '/stand.svg',
    name: 'Štand',
    component: HomePage,
  },
  {
    path: Path.FlyTalks,
    icon: '/fly-talks.svg',
    name: 'Fly Talks',
    component: HomePage,
  },
  {
    path: Path.Profile,
    icon: '/profile.svg',
    name: 'Profil tvrtke',
    component: HomePage,
  },
];
