import { ISO } from '@ddays-app/types';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { BoothConfirmationPage } from '../../components/BoothConfirmationPage/BoothConfirmationPage';
import ChooseBooth from '../../components/ChooseBooth';
import useCountdown from '../../hooks/useCountdown';

export const SpotsPage = () => {
  const currentCompany = useCompanyGetCurrentPublic();
  const { elapsedTime, didFinish } = useCountdown(ISO.SPOTS_OPENING);

  if (currentCompany.isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}>
        Loading...
      </div>
    );
  }

  if (currentCompany.data?.booth) {
    return <BoothConfirmationPage name={currentCompany.data.booth} />;
  }

  if (!didFinish) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}>
        Biranje mjesta kreće za {elapsedTime}
      </div>
    );
  }

  return <ChooseBooth />;
};
