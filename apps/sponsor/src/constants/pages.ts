import HomePage from '../pages/HomePage';
import { Path } from './paths';

export const pages = [
  {
    path: Path.Materials,
    name: 'Materials',
    icon: '/materials.svg',
    component: HomePage,
  },
  {
    path: Path.Stand,
    icon: '/stand.svg',
    name: 'Stand',
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
    name: 'Profile',
    component: HomePage,
  },
];
