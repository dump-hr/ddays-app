import flyTalksSvg from '../assets/fly-talks.svg';
import materialsSvg from '../assets/materials.svg';
import profileSvg from '../assets/profile.svg';
import standSvg from '../assets/stand.svg';
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
    icon: materialsSvg,
    Component: MaterialsPage,
  },
  {
    path: Path.Stand,
    icon: standSvg,
    name: 'Štand',
    Component: HomePage,
  },
  {
    path: Path.FlyTalks,
    icon: flyTalksSvg,
    name: 'Fly Talks',
    Component: HomePage,
  },
  {
    path: Path.Profile,
    icon: profileSvg,
    name: 'Profil tvrtke',
    Component: CompanyProfile,
  },
];
