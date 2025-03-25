import c from './RecommendationsPage.module.scss';
import ArrowLeft from '../../assets/icons/arrow-left.svg';

const RecommendationsPage = () => {
  return (
    <div className={c.page}>
      <main className={c.content}>
        <header className={c.header}>
          <img src={ArrowLeft} alt='' />
          <h3 className={c.title}>Preporuke</h3>
        </header>
      </main>
    </div>
  );
};

export default RecommendationsPage;
