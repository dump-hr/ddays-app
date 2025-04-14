import { CompanyDto } from '@ddays-app/types';

export const recommendations: CompanyDto[] = [
  {
    id: 1,
    category: 'GOLD',
    name: 'Netmedia',
    interests: [
      { id: 1, name: 'Web development', theme: 'DEV' },
      { id: 2, name: 'React', theme: 'DEV' },
      { id: 3, name: 'Frontend', theme: 'DEV' },
    ],
    username: 'netmedia',
    password: 'password',
  },
  {
    id: 2,
    category: 'SILVER',
    name: 'Blank',
    interests: [
      { id: 4, name: 'React', theme: 'DEV' },
      { id: 5, name: 'JavaScript', theme: 'DEV' },
      { id: 6, name: 'Web development', theme: 'DEV' },
    ],
    username: 'blank',
    password: 'password',
  },
  {
    id: 3,
    category: 'BRONZE',
    name: 'ArsFutura',
    interests: [
      { id: 7, name: 'React', theme: 'DEV' },
      { id: 8, name: 'JavaScript', theme: 'DEV' },
      { id: 9, name: 'Web development', theme: 'DEV' },
    ],
    username: 'arsfutura1',
    password: 'password',
  },
  {
    id: 4,
    category: 'BRONZE',
    name: 'ArsFutura',
    interests: [
      { id: 10, name: 'React', theme: 'DEV' },
      { id: 11, name: 'JavaScript', theme: 'DEV' },
      { id: 12, name: 'Web development', theme: 'DEV' },
    ],
    username: 'arsfutura2',
    password: 'password',
  },
  {
    id: 5,
    category: 'BRONZE',
    name: 'ArsFutura',
    interests: [
      { id: 13, name: 'React', theme: 'DEV' },
      { id: 14, name: 'JavaScript', theme: 'DEV' },
    ],
    username: 'arsfutura3',
    password: 'password',
  },
];
