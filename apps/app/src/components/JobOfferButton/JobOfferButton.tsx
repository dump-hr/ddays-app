import c from './JobOfferButton.module.scss';

import { JobDto } from '@ddays-app/types';
import ProficoLogo from '@/assets/images/Profico.svg';
import ArrowRight from '@/assets/icons/arrow-right-sm-squared.svg';

type JobOfferButtonProps = {
  job: JobDto;
};

const JobOfferButton: React.FC<JobOfferButtonProps> = ({ job }) => {
  /**
   * Ideja je da se samo salje JobDto. Po volji ekstrahirat propove posebno.
   */
  function getCompanyName(companyId: number) {
    return `Profico (${companyId})`;
  }

  function getCompanyLogo(companyId: number) {
    if (companyId) return ProficoLogo;
    return ProficoLogo;
  }

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
