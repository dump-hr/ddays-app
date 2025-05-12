import c from './TopCompaniesSection.module.scss';

import React from 'react';

import TopCompany from '../TopCompany';
import { companies } from '../../pages/Home/companies';
import RecommendationsButton from '../RecommendationsButton';

const TopCompaniesSection = () => {
  return (
    <section className={c.topCompanies}>
      <div className={c.mainContent}>
        <h2 className={c.title}>Trenutnih top 5</h2>
        <p className={c.description}>
          Najbolji sponzorski štandovi po ocjenama posjetitelja:
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
