import { CompanyDto } from '@ddays-app/types';
import c from './RecommendedCompany.module.scss';
import clsx from 'clsx';

type RecommendedCompanyProps = {
  number: number;
  company: CompanyDto;
};

const RecommendedCompany: React.FC<RecommendedCompanyProps> = ({
  number,
  company,
}) => {
  return (
    <div
      className={clsx({
        [c.recommendedCompany]: true,
        [c.first]: number === 1,
      })}>
      <div className={c.numberWrapper}>
        <p>0{number}</p>
      </div>
      <div className={c.content}>
        <h3 className={c.companyName}>{company.name}</h3>
        <div className={c.interestsWrapper}>
          {company.interests &&
            company.interests.map((interest, i) => (
              <span key={i} className={c.interest}>
                {interest.name}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedCompany;
