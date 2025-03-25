import c from './RecommendationsPage.module.scss';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import { recommendations } from './recommendations';
import RecommendedCompany from '../../components/RecommendedCompany';

const RecommendationsPage = () => {
  return (
    <div className={c.page}>
      <main className={c.content}>
        <header className={c.header}>
          <img className={c.arrow} src={ArrowLeft} />
          <h3 className={c.pageTitle}>Preporuke</h3>
        </header>
        <h3 className={c.title}>Tvrtke</h3>
        <p className={c.paragraph}>
          Na temelju tvojih interesa dajemo ti listu kurceva koja ti najviše
          odgovaraju.
        </p>
        <div className={c.recommendationsWrapper}>
          {recommendations.map((company, i) => (
            <RecommendedCompany key={i} number={i + 1} company={company} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default RecommendationsPage;
