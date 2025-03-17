import { CompanyPublicDto } from '@ddays-app/types';
import c from './TopCompany.module.scss';

import BadgeGold from '../../assets/images/badge-gold.png';
import BadgeSilver from '../../assets/images/badge-silver.png';
import BadgeBronze from '../../assets/images/badge-bronze.png';

type TopCompanyProps = {
  company: CompanyPublicDto;
  number: number;
};

type NumberProps = {
  number: number;
};

const Number: React.FC<NumberProps> = ({ number: number }) => {
  let Badge;
  if (number === 1) {
    Badge = BadgeGold;
  } else if (number === 2) {
    Badge = BadgeSilver;
  } else if (number === 3) {
    Badge = BadgeBronze;
  }

  if (number <= 3) return <img className={c.badge} src={Badge} />;

  return <p className={c.number}>0{number}</p>;
};

const TopCompany: React.FC<TopCompanyProps> = ({ company, number }) => {
  return (
    <div className={c.topCompany}>
      <div className={c.numberContainer}>
        <Number number={number} />
      </div>
      <div className={c.infoWrapper}>
        <p className={c.companyName}>{company.name}</p>
        <p className={c.boothId}>{company.booth}</p>
      </div>
    </div>
  );
};

export default TopCompany;
