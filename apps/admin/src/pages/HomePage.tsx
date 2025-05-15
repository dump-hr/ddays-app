import { useGetUserCount } from '../api/user/useGetUserCount';
import c from './HomePage.module.scss';

export const HomePage = () => {
  const { data: userCount } = useGetUserCount();
  return (
    <div className={c.page}>
      <h1>Statistike 2025.</h1>
      <div className={c.totalUsers}>
        <p>Trenutno korisnika:</p>
        <h3>{userCount}</h3>
      </div>
    </div>
  );
};
