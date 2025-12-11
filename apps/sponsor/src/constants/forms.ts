import { CompanyCategory } from '@ddays-app/types';

import { Accreditation } from '../formSteps/Accreditation';
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
      if (category === CompanyCategory.BRONZE)
        return 'Predaja do 8. ožujka 2025.';
      if (category === CompanyCategory.SILVER)
        return 'Predaja do 15. ožujka 2025.';
      return 'Predaja do 1. travnja 2025.';
    },
    component: Description,
  },
  [FormSteps.Logo]: {
    title: 'Logotip tvrtke',
    description: (category) => {
      if (category === CompanyCategory.BRONZE)
        return 'Predaja do 8. ožujka 2025.';
      if (category === CompanyCategory.SILVER)
        return 'Predaja do 15. ožujka 2025.';
      return 'Predaja do 1. travnja 2025.';
    },
    component: LogoUpload,
  },
  [FormSteps.Photos]: {
    title: 'Fotografije tvrtke',
    description: (category) => {
      if (category === CompanyCategory.BRONZE)
        return 'Predaja do 8. ožujka 2025.';
      if (category === CompanyCategory.SILVER)
        return 'Predaja do 15. ožujka 2025.';
      return 'Predaja do 1. travnja 2025.';
    },
    component: PhotoUpload,
  },
  [FormSteps.Videos]: {
    title: 'Videozapis tvrtke',
    description: 'Predaja do 1. travnja 2025.',
    component: Video,
  },
  [FormSteps.Jobs]: {
    title: 'Oglasi za posao',
    description: 'Predaja do 15. travnja 2025.',
    component: Job,
  },
  [FormSteps.Interests]: {
    title: 'App Career matching',
    description: 'Predaja do 1. travnja 2025.',
    component: InterestPicker,
  },
  [FormSteps.Accreditation]: {
    title: 'Akreditacije',
    description: 'Predaja do 1.travnja 2025.',
    component: Accreditation,
  },
  [FormSteps.Flytalk]: {
    title: 'Fly Talks',
    description: 'Predaja do 1. travnja 2025.',
    component: () => null,
    tier: [],
  },
  /*[FormSteps.SwagBag]: {
  title: 'Swag Bag',
  description: 'Predaja do 15. travnja 2025.',
  component: InterestPicker,
},*/
};
