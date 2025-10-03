import DatabaseIcon from '@/assets/icons/database.svg?react';
import c from './DatabasePage.module.scss';

export const DatabasePage = () => {
  return (
    <div className={c.databasePage}>
      <DatabaseIcon className={c.databaseIcon} />
    </div>
  );
};
