import c from './ProfileRecommendationsPage.module.scss';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import ArrowWhite from '../../assets/icons/arrow-left-white.svg';
import RecommendedCompany from '../../components/RecommendedCompany';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@/router/routes';

import { useGetRecommendedCompanies } from '@/api/company/useGetRecommendedCompanies';

const ProfileRecommendationsPage = () => {
  const navigate = useNavigate();
  const { data: recommendations } = useGetRecommendedCompanies();

  return (
    <div className={c.page}>
      <img
        src={ArrowWhite}
        className={c.whiteArrow}
        onClick={() => navigate(RouteNames.PROFILE)}
      />
      <main className={c.content}>
        <header className={c.header}>
          <img
            className={c.arrow}
            src={ArrowLeft}
            onClick={() => navigate(RouteNames.PROFILE)}
          />
          <h3 className={c.pageTitle}>Preporuke</h3>
        </header>
        <h3 className={c.title}>Tvrtke</h3>
        <p className={c.paragraph}>
          Prema tvojim interesima vidimo da se najbolje slažeš s ovim tvrtkama.
        </p>
        <div className={c.recommendationsWrapper}>
          {recommendations?.map((company, i) => (
            <RecommendedCompany
              key={i}
              number={i + 1}
              company={company}
              hasSeparator={i !== 4}
            />
          ))}
          {recommendations?.length === 0 && (
            <p className={c.noRecommendations}>Odaberi barem jedan interes.</p>
          )}
        </div>
        {/**
         * <h3 className={c.title}>Predavanja</h3>
        <p className={c.paragraph}>
          Na temelju tvojih interesa preporučamo ti sljedeća predavanja.
        </p>
        <EventsSection />
         * 
         * 
         */}
      </main>
    </div>
  );
};

export default ProfileRecommendationsPage;
