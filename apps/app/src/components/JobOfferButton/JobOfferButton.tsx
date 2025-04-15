import c from './JobOfferButton.module.scss';

import { JobDto } from '@ddays-app/types';
import ArrowRight from '@/assets/icons/arrow-right-sm-squared.svg';
import { getCompanyLogo, getCompanyName } from '@/helpers/getCompanyInfo';

type JobOfferButtonProps = {
  job: JobDto;
};

const JobOfferButton: React.FC<JobOfferButtonProps> = ({ job }) => {
  /**
   * Ideja je da se samo salje JobDto. Po volji ekstrahirat propove posebno.
   */

  return (
    <div className={c.jobOfferButton}>
      <div className={c.logoWrapper}>
        <img src={getCompanyLogo(job.companyId)} alt='' />
      </div>
      <div className={c.mainContent}>
        <div className={c.arrowWrapper}>
          <div className={c.positionWrapper}>
            <h4 className={c.companyName}>{getCompanyName(job.companyId)}</h4>
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
