import { CompanyCategory } from '@ddays-app/types';
import { DISPLAY } from '@ddays-app/types';

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
        return DISPLAY.SPONSOR_DEADLINE_OZUJAK_8;
      if (category === CompanyCategory.SILVER)
        return DISPLAY.SPONSOR_DEADLINE_OZUJAK_15;
      return DISPLAY.SPONSOR_DEADLINE_TRAVANJ_1;
    },
    component: Description,
  },
  [FormSteps.Logo]: {
    title: 'Logotip tvrtke',
    description: (category) => {
      if (category === CompanyCategory.BRONZE)
        return DISPLAY.SPONSOR_DEADLINE_OZUJAK_8;
      if (category === CompanyCategory.SILVER)
        return DISPLAY.SPONSOR_DEADLINE_OZUJAK_15;
      return DISPLAY.SPONSOR_DEADLINE_TRAVANJ_1;
    },
    component: LogoUpload,
  },
  [FormSteps.Photos]: {
    title: 'Fotografije tvrtke',
    description: (category) => {
      if (category === CompanyCategory.BRONZE)
        return DISPLAY.SPONSOR_DEADLINE_OZUJAK_8;
      if (category === CompanyCategory.SILVER)
        return DISPLAY.SPONSOR_DEADLINE_OZUJAK_15;
      return DISPLAY.SPONSOR_DEADLINE_TRAVANJ_1;
    },
    component: PhotoUpload,
  },
  [FormSteps.Videos]: {
    title: 'Videozapis tvrtke',
    description: DISPLAY.SPONSOR_DEADLINE_TRAVANJ_1,
    component: Video,
  },
  [FormSteps.Jobs]: {
    title: 'Oglasi za posao',
    description: DISPLAY.SPONSOR_DEADLINE_TRAVANJ_15,
    component: Job,
  },
  [FormSteps.Interests]: {
    title: 'App Career matching',
    description: DISPLAY.SPONSOR_DEADLINE_TRAVANJ_1,
    component: InterestPicker,
  },
  [FormSteps.Accreditation]: {
    title: 'Akreditacije',
    description: DISPLAY.SPONSOR_DEADLINE_TRAVANJ_1,
    component: Accreditation,
  },
  [FormSteps.Flytalk]: {
    title: 'Fly Talks',
    description: DISPLAY.SPONSOR_DEADLINE_TRAVANJ_1,
    component: () => null,
    tier: [],
  },
};
  /*[FormSteps.SwagBag]: {
  title: 'Swag Bag',
  description: 'Predaja do 15. travnja 2025.',
  component: InterestPicker,
},*/
};
