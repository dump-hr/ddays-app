import { useGetWorkshopsWithUsers } from '../api/event/useGetWorkshopsWithUsers';
import { useGetUserCount } from '../api/user/useGetUserCount';
import c from './HomePage.module.scss';

export const HomePage = () => {
  const { data: userCount } = useGetUserCount();
  const { data: workshops } = useGetWorkshopsWithUsers();

  return (
    <div className={c.page}>
      <h1>Statistike 2025.</h1>
      <div className={c.totalUsers}>
        <p>Trenutno korisnika:</p>
        <h3>{userCount}</h3>
      </div>
      <section>
        <p>Radionice</p>
        <button onClick={() => console.log(workshops)}>Prikaži podatke</button>
      </section>
    </div>
  );
};
