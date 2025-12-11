import flyTalksSvg from '../assets/icons/fly-talks.svg';
import materialsSvg from '../assets/icons/materials.svg';
import profileSvg from '../assets/icons/profile.svg';
//import flyTalksSvg from '../assets/icons/fly-talks.svg';
import standSvg from '../assets/icons/stand.svg';
//import standSvg from '../assets/icons/stand.svg';
import { CompanyProfile } from '../pages/CompanyProfile';
import FlyTalksPage from '../pages/FlyTalksPage';
import { MaterialsPage } from '../pages/MaterialsPage';
import { SpotsPage } from '../pages/SpotsPage/SpotsPage';
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
    name: 'Materijali',
    icon: materialsSvg,
    Component: MaterialsPage,
  },
  {
    path: Path.FlyTalks,
    icon: flyTalksSvg,
    name: 'Fly Talks',
    Component: FlyTalksPage,
  },
  /*

  
  {
    path: Path.Stand,
    icon: standSvg,
    name: 'Štand',
    Component: MaterialsPage,
  },

  {
    path: Path.Stand,
    icon: standSvg,
    name: 'Štand',
    Component: MaterialsPage,
  },*/
  {
    path: Path.SpotsPage,
    name: 'Odabir mjesta',
    icon: standSvg,
    Component: SpotsPage,
  },
  {
    path: Path.Profile,
    icon: profileSvg,
    name: 'Profil tvrtke',
    Component: CompanyProfile,
  },
];
