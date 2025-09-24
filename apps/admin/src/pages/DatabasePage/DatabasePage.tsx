import DatabaseIcon from '@/assets/icons/database.svg?react';
import c from './DatabasePage.module.scss';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../router/routes';
import { useEffect } from 'react';

export const DatabasePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(RouteNames.USERS);
  }, [navigate]);

  return (
    <div className={c.databasePage}>
      <DatabaseIcon className={c.databaseIcon} />
    </div>
  );
};
