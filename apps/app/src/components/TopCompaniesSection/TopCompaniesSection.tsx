import c from './TopCompaniesSection.module.scss';
import React from 'react';
import { useGetTopRatedCompanies } from '@/api/booth/useGetTopRatedCompanies';
import TopCompany from '../TopCompany';

const TopCompaniesSection: React.FC = () => {
  const { data: topCompanies = [] } = useGetTopRatedCompanies();
  return (
    <section className={c.topCompanies}>
      <div className={c.mainContent}>
        <h2 className={c.title}>Trenutnih top 5</h2>
        <p className={c.description}>
          Najbolji sponzorski štandovi po ocjenama posjetitelja:
        </p>
        {topCompanies.map((company, index) => (
          <React.Fragment key={company.id}>
            {index !== 0 && <div className={c.divider} />}
            <TopCompany company={company} number={index + 1} />
          </React.Fragment>
        ))}
        {topCompanies.length === 0 && (
          <p className={c.noCompanies}>
            Prošetaj po konfi, ocijeni štandove pa ćemo vidit 'ko je u top 5!
          </p>
        )}
      </div>
      {/*<RecommendationsButton className={c.duck} />*/}
    </section>
  );
};

export default TopCompaniesSection;
