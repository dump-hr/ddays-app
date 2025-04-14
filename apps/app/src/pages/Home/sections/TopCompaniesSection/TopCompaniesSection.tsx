import c from './TopCompaniesSection.module.scss';
import TopCompany from '../../../../components/TopCompany';
import RecommendationsButton from '../../../../components/RecommendationsButton';
import React from 'react';
import { useGetTopRatedCompanies } from '@/api/booth/useGetTopRatedCompanies';


const TopCompaniesSection: React.FC = () => {

  const { data: topCompanies= [] } = useGetTopRatedCompanies();

  return (
    <section className={c.topCompanies}>
      <div className={c.mainContent}>
        <h2 className={c.title}>Top 5 firmi</h2>
        <p className={c.description}>
          Otkrij najbolje sponzorske štandove prema ocjenama posjetitelja
          konferencije.
        </p>
        {topCompanies.map((company, index) => (
          <React.Fragment key={company.id}>
            {index !== 0 && <div className={c.divider} />}
            <TopCompany company={company} number={index + 1} />
          </React.Fragment>
        ))}
      </div>
      <RecommendationsButton className={c.duck} />
    </section>
  );
};

export default TopCompaniesSection;
