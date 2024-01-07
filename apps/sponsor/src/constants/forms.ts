import { FormSteps, SponsorForm } from '@ddays-app/types';

import InterestPicker from '../components/InterestPicker';

export const sponsorForm: SponsorForm = {
  [FormSteps.Description]: {
    title: 'Opisi tvrtke',
    description: 'Predaja do x x',
    component: InterestPicker,
  },
  [FormSteps.Logo]: {
    title: 'Logotip tvrtke',
    description: 'Predaja do x x',
    component: InterestPicker,
  },
  [FormSteps.Photos]: {
    title: 'Fotografije tvrtke',
    description: 'Predaja do x x',
    component: InterestPicker,
  },
  [FormSteps.Videos]: {
    title: 'Videozapis tvrtke',
    description: 'Predaja do x x',
    component: InterestPicker,
  },
  [FormSteps.Jobs]: {
    title: 'Oglasi za posao',
    description: 'Predaja do x x',
    component: InterestPicker,
  },
  [FormSteps.Interests]: {
    title: 'App career matching',
    description: 'Predaja do x x',
    component: InterestPicker,
  },
  [FormSteps.SwagBag]: {
    title: 'Swag Bag',
    description: 'Predaja do x x',
    component: InterestPicker,
  },
};
