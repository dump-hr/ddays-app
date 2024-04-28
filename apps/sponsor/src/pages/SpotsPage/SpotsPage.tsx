import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { BoothConfirmationPage } from '../../components/BoothConfirmationPage/BoothConfirmationPage';
import ChooseBooth from '../../components/ChooseBooth';

export const SpotsPage = () => {
  const currentCompany = useCompanyGetCurrentPublic();

  if (currentCompany.isLoading) {
    return <div>Loading...</div>;
  }

  if (currentCompany.data?.booth) {
    return <BoothConfirmationPage name={currentCompany.data.booth} />;
  }

  return <ChooseBooth />;
};
