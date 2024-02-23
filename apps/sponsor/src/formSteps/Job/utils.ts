import { FormSteps } from '../../types/form';

export const getShouldRenderJobsCount = (
  count: number | undefined,
  max: number,
  key: FormSteps,
) => {
  if (count === undefined) {
    return false;
  }
  if (key === FormSteps.Jobs && count < max) {
    return true;
  }
  return false;
};
