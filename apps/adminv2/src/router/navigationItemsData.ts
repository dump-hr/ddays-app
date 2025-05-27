export type NavigationItemData = {
  route: string;
  label: string;
  icon?: string;
  subItems?: NavigationItemData[];
};

export const navigationItems: NavigationItemData[] = [
  {
    route: '/',
    label: 'Početna',
  },
  {
    route: '/administrators',
    label: 'Administratori',
  },
  {
    route: '/database',
    label: 'Baza podataka',
    subItems: [
      {
        route: '/users',
        label: 'Korisnici',
      },
      {
        route: '/companies',
        label: 'Kompanije',
      },
      {
        route: '/speakers',
        label: 'Speakeri',
      },
      {
        route: '/interests',
        label: 'Interesi',
      },
      {
        route: '/events',
        label: 'Događaji',
      },
      {
        route: '/booths',
        label: 'Štandovi',
      },
      {
        route: '/rewards',
        label: 'Nagrade',
      },
      {
        route: '/achievements',
        label: 'Postignuća',
      },
      {
        route: '/codes',
        label: 'Kodovi',
      },
      {
        route: '/shopping',
        label: 'Shopping',
      },
    ],
  },
];
