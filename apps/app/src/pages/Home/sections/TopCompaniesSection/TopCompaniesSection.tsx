import c from './TopCompaniesSection.module.scss';

import React, { useEffect, useState } from 'react';

import TopCompany from '../../../../components/TopCompany';
import RecommendationsButton from '../../../../components/RecommendationsButton';
import { CompanyPublicDto } from '@ddays-app/types';

async function fetchTopRatedCompanies(): Promise<CompanyPublicDto[] | undefined> {
  try {
    const response = await fetch('/api/company/top-rated');
    if (!response.ok) {
      throw new Error('Failed to fetch top-rated companies');
    }
    const data = await response.json();
    console.log(data);
    return data as CompanyPublicDto[];
  } catch (error) {
    console.error('Error fetching top-rated companies:', error);
  }
}

const TopCompaniesSection: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyPublicDto[]>([]);

  useEffect(() => {
    const loadTopRatedCompanies = async () => {
      const fetchedCompanies = await fetchTopRatedCompanies();
      if (fetchedCompanies) setCompanies(fetchedCompanies);
    };

    loadTopRatedCompanies();
  }, []);

  return (
    <section className={c.topCompanies}>
      <div className={c.mainContent}>
        <h2 className={c.title}>Top 5 firmi</h2>
        <p className={c.description}>
          Otkrij najbolje sponzorske štandove prema ocjenama posjetitelja
          konferencije.
        </p>
        {companies.map((company, index) => (
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
