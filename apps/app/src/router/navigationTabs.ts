import { RouteNames } from './routes';

export enum NAVIGATION_TAB_ID {
  HOME,
  FLY_TALKS,
  PROFILE,
  SCHEDULE,
  COMPANIES,
}

export type NavigationTabInfo = {
  id: NAVIGATION_TAB_ID;
  name: string;
  icon: string;
  width: number;
  height: number;
  route: string;
};

export const navigationTabs: NavigationTabInfo[] = [
  {
    id: NAVIGATION_TAB_ID.HOME,
    name: 'Home',
    icon: 'home-icon',
    width: 24,
    height: 24,
    route: RouteNames.HOME,
  },
  {
    id: NAVIGATION_TAB_ID.FLY_TALKS,
    name: 'Fly Talks',
    icon: 'fly-talks-icon',
    width: 22,
    height: 24,
    route: RouteNames.FLY_TALKS,
  },
  {
    id: NAVIGATION_TAB_ID.PROFILE,
    name: 'Profil',
    icon: 'profile-icon',
    width: 22,
    height: 22,
    route: RouteNames.PROFILE,
  },
  /*
    {
    id: NAVIGATION_TAB_ID.SCHEDULE,
    name: 'Raspored',
    icon: 'schedule-icon',
    width: 25,
    height: 24,
    route: RouteNames.SCHEDULE,
  },
  

  {
    id: NAVIGATION_TAB_ID.COMPANIES,
    name: 'Tvrtke',
    icon: 'companies-icon',
    width: 23,
    height: 24,
    route: RouteNames.COMPANIES,
  },
  */
];
