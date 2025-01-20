type EventTheme = 'dev' | 'design' | 'marketing' | 'tech';

export function getThemeLabel(eventTheme: EventTheme | string) {
  switch (eventTheme) {
    case 'dev':
      return 'DEV';
    case 'design':
      return 'DIZ';
    case 'marketing':
      return 'MARK';
    case 'tech':
      return 'MULT';
  }
}
