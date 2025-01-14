import { Header } from '../../components/Header';
import c from './Home.module.scss';

const HomePage = () => {
  return (
    <div className={c.page}>
      <header className={c.header}>
        <Header />
      </header>
      <main className={c.main}></main>
    </div>
  );
};

export default HomePage;
