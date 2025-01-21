import c from './TopCompaniesSection.module.scss';

import React from 'react';

import TopCompany from '../../../../components/TopCompany';
import { companies } from '../../companies';
import RecommendationsButton from '../../../../components/RecommendationsButton';

const TopCompaniesSection = () => {
  return (
    <section className={c.topCompanies}>
      <div className={c.mainContent}>
        <h2 className={c.title}>Top 5 firma</h2>
        <p className={c.description}>
          Otkrij najbolje sponzorske štandove prema ocjenama posjetitelja
          konferencije.
        </p>
        {companies.map((company, index) => (
          <React.Fragment key={index}>
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
