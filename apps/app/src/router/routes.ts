export enum ModalNames {
  NOTIFICATIONS = 'notifikacije',
  ENTER_CODE = 'unesi kod',
  RATE_BOOTH = 'ocjeni sponzorski štand',
  RATE_LECTURE = 'ocjeni predavanje',

  INTERESTS = 'interesi',
  ACHIEVEMENTS = 'postignuća',
  AVATARS = 'avatari',
  LEADERBOARD = 'leaderboard',
  RECCOMENDATIONS = 'preporuke',
  PRIZES = 'nagrade',
  SETTINGS = 'postavke profila',

  TRANSACTIONS = 'transakcije',
  CART = 'košarica',
}

export enum RouteNames {
  HOME = '/app',
  LOGIN = '/app/login',
  REGISTER = '/app/register',
  PASSWORD_RESET = '/app/password-reset',
  PROFILE = '/app/profile',
  COMPANIES = '/app/companies',
  SCHEDULE = '/app/schedule',
  FLY_TALKS = '/app/flyTalks',
  SHOPPING = '/app/shopping',
}

export interface SubMenu {
  name: string;
  options: string[];
}

export interface Modal {
  name: string;
  edit?: boolean;
  submenus?: SubMenu;
}

export interface Route {
  path: string;
  name: string;
  modals?: Modal[];
  submenus?: SubMenu[];
}

export const routes: { [key: string]: Route } = {
  [RouteNames.HOME]: {
    path: RouteNames.HOME,
    name: 'Home',
    modals: [
      {
        name: ModalNames.NOTIFICATIONS,
        submenus: {
          name: 'Notifications',
          options: ['all', 'unread'],
        },
      },
      {
        name: ModalNames.ENTER_CODE,
      },
      {
        name: ModalNames.RATE_BOOTH,
      },
      {
        name: ModalNames.RATE_LECTURE,
      },
    ],
  },
  [RouteNames.LOGIN]: {
    path: RouteNames.LOGIN,
    name: 'Login',
  },
  [RouteNames.REGISTER]: {
    path: RouteNames.REGISTER,
    name: 'Register',
  },
  [RouteNames.PASSWORD_RESET]: {
    path: RouteNames.PASSWORD_RESET,
    name: 'Password Reset',
  },
  [RouteNames.PROFILE]: {
    path: RouteNames.PROFILE,
    name: 'Profile',
    modals: [
      {
        name: ModalNames.INTERESTS,
        edit: true,
      },
      {
        name: ModalNames.ACHIEVEMENTS,
        submenus: {
          name: 'Achievements',
          options: ['all', 'completed', 'uncompleted'],
        },
      },
      {
        name: ModalNames.AVATARS,
      },
      {
        name: ModalNames.LEADERBOARD,
      },
      {
        name: ModalNames.RECCOMENDATIONS,
      },
      {
        name: ModalNames.PRIZES,
      },
      {
        name: ModalNames.SETTINGS,
        edit: true,
        submenus: {
          name: 'Settings',
          options: ['change-password'],
        },
      },
    ],
  },
  [RouteNames.COMPANIES]: {
    path: RouteNames.COMPANIES,
    name: 'Companies',
    submenus: [
      {
        name: 'Companies Menu',
        options: ['list', 'adverts'],
      },
    ],
  },
  [RouteNames.SCHEDULE]: {
    path: RouteNames.SCHEDULE,
    name: 'Schedule',
  },
  [RouteNames.FLY_TALKS]: {
    path: RouteNames.FLY_TALKS,
    name: 'Fly Talks',
  },
  [RouteNames.SHOPPING]: {
    path: RouteNames.SHOPPING,
    name: 'Shopping',
    modals: [
      {
        name: ModalNames.TRANSACTIONS,
      },
      {
        name: ModalNames.CART,
      },
    ],
  },
} as const satisfies Record<string, Route>;

export type RouteKey = keyof typeof routes;

export function getRoute(routeKey: RouteKey) {
  return routes[routeKey];
}

export function findModalInRoute(routeKey: RouteKey, modalName: string) {
  const route = getRoute(routeKey);
  return route.modals?.find((modal) => modal.name === modalName);
}
