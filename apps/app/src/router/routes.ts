export enum ModalNames {
  NOTIFICATIONS = 'notifications',
  ENTER_CODE = 'enter-code',
  RATE = 'rate',

  INTERESTS = 'interests',
  ACHIEVEMENTS = 'achievements',
  AVATARS = 'avatars',
  LEADERBOARD = 'leaderboard',
  PRIZES = 'prizes',

  DISPLAY_AREA = 'display-area',

  SCHEDULE_LIST = 'schedule-list',
  FLY_TALKS_LIST = 'fly-talks-list',

  TRANSACTIONS = 'transactions',
  CART = 'cart',
}

export enum RouteNames {
  HOME = '/app',
  LOGIN = '/app/login',
  REGISTER = '/app/register',
  PASSWORD_RESET = '/app/password-reset',
  PROFILE = '/app/profile',
  PROFILE_INTERESTS = '/app/profile/interests',
  PROFILE_REWARDS = '/app/profile/rewards',
  PROFILE_SETTINGS = '/app/profile/settings',
  PROFILE_ACHIEVEMENTS = '/app/profile/achievements',
  PROFILE_AVATARS = '/app/profile/avatars',
  PROFILE_LEADERBOARD = '/app/profile/leaderboard',
  PROFILE_RECOMMENDATIONS = '/app/profile/recommendations',
  COMPANIES = '/app/companies',
  SCHEDULE = '/app/schedule',
  FLY_TALKS = '/app/fly-talks',
  FLY_TALKS_APPLY = '/app/fly-talks-apply',
  SHOPPING = '/app/shopping',
  CONFIRM_EMAIL = '/app/confirm-email',
  NOTIFICATIONS = '/app/notifications',
  TERMS_AND_CONDITIONS = '/app/terms-and-conditions',
  RATE_COMPANY = '/app/rate-company',
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
        name: ModalNames.RATE,
        submenus: {
          name: 'Rate',
          options: ['stand', 'lecture'],
        },
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
  [RouteNames.PROFILE]: {
    path: RouteNames.PROFILE,
    name: 'Profile',
  },
  [RouteNames.PROFILE_INTERESTS]: {
    path: RouteNames.PROFILE_INTERESTS,
    name: 'Interests',
  },
  [RouteNames.PROFILE_REWARDS]: {
    path: RouteNames.PROFILE_REWARDS,
    name: 'Rewards',
  },
  [RouteNames.PROFILE_SETTINGS]: {
    path: RouteNames.PROFILE_SETTINGS,
    name: 'Settings',
  },
  [RouteNames.PROFILE_ACHIEVEMENTS]: {
    path: RouteNames.PROFILE_ACHIEVEMENTS,
    name: 'Achievements',
  },
  [RouteNames.PROFILE_AVATARS]: {
    path: RouteNames.PROFILE_AVATARS,
    name: 'Avatars',
  },
  [RouteNames.PROFILE_LEADERBOARD]: {
    path: RouteNames.PROFILE_LEADERBOARD,
    name: 'Leaderboard',
  },
  [RouteNames.PROFILE_RECOMMENDATIONS]: {
    path: RouteNames.PROFILE_RECOMMENDATIONS,
    name: 'Recommendations',
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
    path: RouteNames.SCHEDULE,
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
    path: RouteNames.FLY_TALKS,
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
  [RouteNames.RATE_COMPANY]: {
    path: RouteNames.RATE_COMPANY,
    name: 'Rate Company',
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
