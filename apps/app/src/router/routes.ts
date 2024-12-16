export enum ModalNames {
  NOTIFICATIONS = 'notifications',
  ENTER_CODE = 'enter-code',
  RATE = 'rate',

  INTERESTS = 'interests',
  ACHIEVEMENTS = 'achievements',
  AVATARS = 'avatars',
  LEADERBOARD = 'leaderboard',
  PRIZES = 'prizes',
  SETTINGS = 'settings',

  DISPLAY_AREA = 'display-area',

  SCHEDULE_LIST = 'schedule-list',
  FLY_TALKS_LIST = 'fly-talks-list',

  TRANSACTIONS = 'transactions',
  CART = 'cart',
}

export enum RouteNames {
  HOME = '',
  LOGIN = 'login',
  REGISTER = 'register',
  PASSWORD_RESET = 'password-reset',
  PROFILE = 'profile',
  COMPANIES = 'companies',
  SCHEDULE = 'schedule',
  FLY_TALKS = 'flyTalks',
  SHOPPING = 'shopping',
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
    path: '/home',
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
        name: ModalNames.RATE,
        submenus: {
          name: 'Rate',
          options: ['stand', 'lecture'],
        },
      },
    ],
  },
  [RouteNames.LOGIN]: {
    path: '/login',
    name: 'Login',
  },
  [RouteNames.REGISTER]: {
    path: '/register',
    name: 'Register',
  },
  [RouteNames.PASSWORD_RESET]: {
    path: '/password-reset',
    name: 'Password Reset',
  },
  [RouteNames.PROFILE]: {
    path: '/profile',
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
    path: '/companies',
    name: 'Companies',
    submenus: [
      {
        name: 'Companies Menu',
        options: ['list', 'adverts'],
      },
    ],
    modals: [
      {
        name: ModalNames.DISPLAY_AREA,
        submenus: {
          name: 'Company Map',
          options: ['stands'],
        },
      },
    ],
  },
  [RouteNames.SCHEDULE]: {
    path: '/schedule',
    name: 'Schedule',
    modals: [
      {
        name: ModalNames.SCHEDULE_LIST,
        submenus: {
          name: 'Schedule List',
          options: ['first', 'second', 'my-schedule'],
        },
      },
    ],
  },
  [RouteNames.FLY_TALKS]: {
    path: '/fly-talks',
    name: 'Fly Talks',
    modals: [
      {
        name: ModalNames.FLY_TALKS_LIST,
        submenus: {
          name: 'Fly Talks List',
          options: ['first', 'second'],
        },
      },
    ],
  },
  [RouteNames.SHOPPING]: {
    path: '/shopping',
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
