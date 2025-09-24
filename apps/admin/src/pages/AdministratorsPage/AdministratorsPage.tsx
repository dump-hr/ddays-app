import AdminIcon from '@/assets/icons/accreditation.svg?react';
import c from './AdministratorsPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../router/routes';
import { useEffect } from 'react';

export const AdministratorsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(RouteNames.ACCREDITATION_PRINT);
  }, [navigate]);
  return (
    <div className={c.administrationPage}>
      <AdminIcon className={c.administrationIcon} />
    </div>
  );
};
