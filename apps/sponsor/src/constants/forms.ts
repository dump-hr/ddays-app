import { CompanyCategory } from '@ddays-app/types';

import { Description } from '../formSteps/Description';
import { InterestPicker } from '../formSteps/InterestPicker';
import { Job } from '../formSteps/Job/Job';
import { LogoUpload } from '../formSteps/LogoUpload';
import { PhotoUpload } from '../formSteps/PhotoUpload';
import { Video } from '../formSteps/Video';
import { FormSteps, SponsorForm } from '../types/form';

export const sponsorForm: SponsorForm = {
  [FormSteps.Description]: {
    title: 'Opisi tvrtke',
    description: (category) => {
      if (category === CompanyCategory.Bronze)
        return 'Predaja do 8. ožujka 2024.';
      if (category === CompanyCategory.Silver)
        return 'Predaja do 15. ožujka 2024.';
      return 'Predaja do 1. travnja 2024.';
    },
    component: Description,
  },
  [FormSteps.Logo]: {
    title: 'Logotip tvrtke',
    description: (category) => {
      if (category === CompanyCategory.Bronze)
        return 'Predaja do 8. ožujka 2024.';
      if (category === CompanyCategory.Silver)
        return 'Predaja do 15. ožujka 2024.';
      return 'Predaja do 1. travnja 2024.';
    },
    component: LogoUpload,
  },
  [FormSteps.Photos]: {
    title: 'Fotografije tvrtke',
    description: (category) => {
      if (category === CompanyCategory.Bronze)
        return 'Predaja do 8. ožujka 2024.';
      if (category === CompanyCategory.Silver)
        return 'Predaja do 15. ožujka 2024.';
      return 'Predaja do 1. travnja 2024.';
    },
    component: PhotoUpload,
  },
  [FormSteps.Videos]: {
    title: 'Videozapis tvrtke',
    description: 'Predaja do 1. travnja 2024.',
    component: Video,
  },
  [FormSteps.Jobs]: {
    title: 'Oglasi za posao',
    description: 'Predaja do 15. travnja 2024.',
    component: Job,
  },
  [FormSteps.Interests]: {
    title: 'App career matching',
    description: 'Predaja do 1. travnja 2024.',
    component: InterestPicker,
  },
};

/*[FormSteps.SwagBag]: {
  title: 'Swag Bag',
  description: 'Predaja do 15. travnja 2024.',
  component: InterestPicker,
},*/
