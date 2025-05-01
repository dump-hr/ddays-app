import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import { JobDto } from '@ddays-app/types';
import c from './JobOfferPopup.module.scss';
import { getCompanyLogo, getCompanyName } from '@/helpers/getCompanyInfo';
import LocationPin from '@/assets/icons/location-pin.svg';
import Button from '@/components/Button';

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
            src={getCompanyLogo(job.companyId)}
            className={c.companyLogo}
            alt={`${getCompanyName(job.companyId)} Logo`}
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
        <p className={c.details}>{job.details}</p>

        <div className={c.listSection}>
          <h3 className={c.listTitle}>Što očekujemo od tebe?</h3>
          <ul className={c.list}>
            <li className={c.item}>Prethodno radno iskustvo kao QA tester</li>
            <li className={c.item}>Prethodno radno iskustvo kao QA tester</li>
            <li className={c.item}>Prethodno radno iskustvo kao QA tester</li>
            <li className={c.item}>Prethodno radno iskustvo kao QA tester</li>
            <li className={c.item}>Prethodno radno iskustvo kao QA tester</li>
          </ul>
        </div>
        <div className={c.listSection}>
          <h3 className={c.listTitle}>Što možeš očekivati od nas?</h3>
          <ul className={c.list}>
            <li className={c.item}>Prethodno radno iskustvo kao QA tester</li>
            <li className={c.item}>Prethodno radno iskustvo kao QA tester</li>
            <li className={c.item}>Prethodno radno iskustvo kao QA tester</li>
            <li className={c.item}>Prethodno radno iskustvo kao QA tester</li>
            <li className={c.item}>Prethodno radno iskustvo kao QA tester</li>
          </ul>
        </div>
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
