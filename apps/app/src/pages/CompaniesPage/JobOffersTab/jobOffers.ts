import { JobDto } from '@ddays-app/types';

export const jobOffers: JobDto[] = [
  {
    id: 1,
    companyId: 1,
    position: 'Software Engineer',
    location: 'Remote',
    details: 'We are looking for a Software Engineer to join our team.',
    link: 'https://example.com/job/1',
    createdAt: new Date(),
  },
  {
    id: 2,
    companyId: 2,
    position: 'Data Scientist',
    location: 'On-site',
    details: 'We are looking for a Data Scientist to join our team.',
    link: 'https://example.com/job/2',
    createdAt: new Date(),
  },
  {
    id: 3,
    companyId: 3,
    position: 'Product Manager',
    location: 'Hybrid',
    details: 'We are looking for a Product Manager to join our team.',
    link: 'https://example.com/job/3',
    createdAt: new Date(),
  },
];
