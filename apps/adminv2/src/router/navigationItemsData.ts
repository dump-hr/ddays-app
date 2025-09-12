import { RouteNames } from './routes';

export type NavigationItemData = {
  route: string;
  label: string;
  icon?: string;
  subItems?: NavigationItemData[];
};

export const navigationItems: NavigationItemData[] = [
  {
    route: RouteNames.HOME,
    label: 'Početna',
  },
  {
    route: RouteNames.ADMINISTRATORS,
    label: 'Administratori',
  },
  {
    route: RouteNames.DATABASE,
    label: 'Baza podataka',
    subItems: [
      {
        route: RouteNames.USERS,
        label: 'Korisnici',
      },
      {
        route: RouteNames.COMPANIES,
        label: 'Kompanije',
      },
      {
        route: RouteNames.SPEAKERS,
        label: 'Speakeri',
      },
      {
        route: RouteNames.INTERESTS,
        label: 'Interesi',
      },
      {
        route: RouteNames.EVENTS,
        label: 'Događaji',
      },
      {
        route: RouteNames.BOOTHS,
        label: 'Štandovi',
      },
      {
        route: RouteNames.REWARDS,
        label: 'Nagrade',
      },
      {
        route: RouteNames.ACHIEVEMENTS,
        label: 'Postignuća',
      },
      {
        route: RouteNames.CODES,
        label: 'Kodovi',
      },
      {
        route: RouteNames.SHOPPING,
        label: 'Shopping',
      },
    ],
  },
];
