import AdminIcon from '@/assets/icons/accreditation.svg?react';
import c from './AdministratorsPage.module.scss';

export const AdministratorsPage = () => {
  return (
    <div className={c.administrationPage}>
      <AdminIcon className={c.administrationIcon} />
    </div>
  );
};
