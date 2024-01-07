import { FormSteps } from '@ddays-app/types';

import Description from '../formSteps/Description';
import InterestPicker from '../formSteps/InterestPicker';
import LogoUpload from '../formSteps/LogoUpload';
import Video from '../formSteps/Video';
import { SponsorForm } from '../types/form';

export const sponsorForm: SponsorForm = {
  [FormSteps.Description]: {
    title: 'Opisi tvrtke',
    description: 'Predaja do x x',
    component: Description,
  },
  [FormSteps.Logo]: {
    title: 'Logotip tvrtke',
    description: 'Predaja do x x',
    component: LogoUpload,
  },
  [FormSteps.Photos]: {
    title: 'Fotografije tvrtke',
    description: 'Predaja do x x',
    component: InterestPicker,
  },
  [FormSteps.Videos]: {
    title: 'Videozapis tvrtke',
    description: 'Predaja do x x',
    component: Video,
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
