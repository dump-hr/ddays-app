import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import { JobDto } from '@ddays-app/types';
import c from './JobOfferPopup.module.scss';
import LocationPin from '@/assets/icons/location-pin.svg';
import Button from '@/components/Button';
import { useGetCompanyLogo } from '@/api/company/useGetCompanyLogo';
import { useGetCompanyName } from '@/api/company/useGetCompanyName';

type JobOfferPopupProps = {
  closePopup: () => void;
  isOpen: boolean;
  job: JobDto | null;
};

const JobOfferPopup: React.FC<JobOfferPopupProps> = ({
  closePopup,
  isOpen,
  job,
}) => {
  const companyName = useGetCompanyName(job?.companyId || 0);
  const companyLogo = useGetCompanyLogo(job?.companyId || 0);
  if (!job) {
    return null;
  }
  return (
    <PopupLayout
      headerTitleComponent={job.position}
      variant='black-fullscreen'
      isOpen={isOpen}
      closePopup={closePopup}>
      <div className={c.headerWrapper}>
        <div className={c.contentWrapper}>
          <img
            src={companyLogo}
            className={c.companyLogo}
            alt={`${companyName} Logo`}
          />
          <div className={c.locationWrapper}>
            <img className={c.pinIcon} src={LocationPin} />
            <p className={c.location}>{job.location}</p>
          </div>
        </div>
        <div className={c.dottedBreak} />
      </div>
      <div className={c.main}>
        <h2 className={c.position}>{job.position}</h2>
        <p className={c.details}>
          {job.details.split(/(?=[\-*•])/).map((line, index) => (
            <div key={index}>{line.trim()}</div>
          ))}
        </p>

        <Button
          className={c.button}
          variant='orange'
          onClick={() => window.open(job.link)}>
          Prijavi se
        </Button>
      </div>
    </PopupLayout>
  );
};

export default JobOfferPopup;
