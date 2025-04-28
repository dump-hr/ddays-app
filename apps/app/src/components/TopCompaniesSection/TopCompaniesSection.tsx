import c from './TopCompaniesSection.module.scss';
<<<<<<< HEAD:apps/app/src/pages/Home/sections/TopCompaniesSection/TopCompaniesSection.tsx
import TopCompany from '../../../../components/TopCompany';
import RecommendationsButton from '../../../../components/RecommendationsButton';
import React from 'react';
import { useGetTopRatedCompanies } from '@/api/booth/useGetTopRatedCompanies';


const TopCompaniesSection: React.FC = () => {

  const { data: topCompanies= [] } = useGetTopRatedCompanies();
=======

import React from 'react';

import TopCompany from '../TopCompany';
import { companies } from '../../pages/Home/companies';
import RecommendationsButton from '../RecommendationsButton';
>>>>>>> 32e9f1bda5492c1d6f236f7d5d5608d82fd52f72:apps/app/src/components/TopCompaniesSection/TopCompaniesSection.tsx

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
