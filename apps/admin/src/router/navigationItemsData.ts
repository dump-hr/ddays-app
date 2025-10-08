import { RouteNames } from './routes';
import HomeIcon from '@/assets/icons/home.svg?react';
import DatabaseIcon from '@/assets/icons/database.svg?react';
import ModelIcon from '@/assets/icons/model.svg?react';
import AccreditationIcon from '@/assets/icons/accreditation.svg?react';

export type NavigationItemData = {
  route: string;
  label: string;
  icon?: React.ElementType;
  subItems?: NavigationItemData[];
};

export const navigationItems: NavigationItemData[] = [
  {
    route: RouteNames.HOME,
    label: 'Početna',
    icon: HomeIcon,
  },

  {
    route: RouteNames.DATABASE,
    label: 'Baza podataka',
    icon: DatabaseIcon,
    subItems: [
      {
        route: RouteNames.USERS,
        label: 'Korisnici',
        icon: ModelIcon,
      },
      {
        route: RouteNames.COMPANIES,
        label: 'Kompanije',
        icon: ModelIcon,
      },
      {
        route: RouteNames.SPEAKERS,
        label: 'Speakeri',
        icon: ModelIcon,
      },
      {
        route: RouteNames.INTERESTS,
        label: 'Interesi',
        icon: ModelIcon,
      },
      {
        route: RouteNames.EVENTS,
        label: 'Događaji',
        icon: ModelIcon,
      },
      {
        route: RouteNames.BOOTHS,
        label: 'Štandovi',
        icon: ModelIcon,
      },
      {
        route: RouteNames.REWARDS,
        label: 'Nagrade',
        icon: ModelIcon,
      },
      {
        route: RouteNames.ACHIEVEMENTS,
        label: 'Postignuća',
        icon: ModelIcon,
      },
      {
        route: RouteNames.CODES,
        label: 'Kodovi',
        icon: ModelIcon,
      },
      {
        route: RouteNames.SHOPPING,
        label: 'Shopping',
        icon: ModelIcon,
      },
    ],
  },
  {
    route: RouteNames.MANAGEMENT,
    label: 'Upravljanje konferencijom',
    icon: AccreditationIcon,
    subItems: [
      {
        route: RouteNames.ACCREDITATION_PRINT,
        label: 'Ispis akreditacija',
        icon: ModelIcon,
      },
      {
        route: RouteNames.ACCREDITATION_SCAN,
        label: 'Skeniranje akreditacija',
        icon: ModelIcon,
      },
      {
        route: RouteNames.TRANSACTION_SCAN,
        label: 'Skeniranje transakcija',
        icon: ModelIcon,
      },
    ],
  },
  {
    route: RouteNames.SPONSOR_MANAGEMENT,
    label: 'Upravljanje sponzorima',
    icon: AccreditationIcon,
    subItems: [
      {
        route: RouteNames.POTENTIAL_SPONSORS,
        label: 'Potencijalni sponzori',
        icon: ModelIcon,
      },
      {
        route: RouteNames.SPONSOR_MATERIALS,
        label: 'Materijali za sponzore',
        icon: ModelIcon,
      },
    ],
  },
];
