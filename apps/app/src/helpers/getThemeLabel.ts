import { Theme } from '@ddays-app/types';

export function getThemeLabel(eventTheme: Theme | string) {
  switch (eventTheme) {
    case 'DEV':
      return 'DEV';
    case 'DESIGN':
      return 'DIZ';
    case 'MARKETING':
      return 'MARK';
    case 'TECH':
      return 'TECH';
  }
}
