import c from './JobOfferButton.module.scss';

import { JobDto } from '@ddays-app/types';
import ArrowRight from '@/assets/icons/arrow-right-sm-squared.svg';
import { useGetCompanyName } from '@/api/company/useGetCompanyName';
import { useGetCompanyLogo } from '@/api/company/useGetCompanyLogo';

type JobOfferButtonProps = {
  job: JobDto;
  onClick?: () => void;
};

const JobOfferButton: React.FC<JobOfferButtonProps> = ({ job, onClick }) => {
  const companyName = useGetCompanyName(job.companyId);
  const companyLogo = useGetCompanyLogo(job.companyId);

  /**
   * Ideja je da se samo salje JobDto. Po volji ekstrahirat propove posebno.
   */

  return (
    <div className={c.jobOfferButton} onClick={onClick}>
      <div className={c.logoWrapper}>
        <img
          key={job.companyId}
          src={companyLogo}
          alt=''
          width={28}
          height={28}
        />
      </div>
      <div className={c.mainContent}>
        <div className={c.arrowWrapper}>
          <div className={c.positionWrapper}>
            <h4 className={c.companyName}>{companyName}</h4>
            <p className={c.position}>{job.position}</p>
          </div>
          <img src={ArrowRight} />
        </div>
        <div className={c.dottedBreak} />
      </div>
    </div>
  );
};

export default JobOfferButton;
