import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import { JobDto } from '@ddays-app/types';

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
      closePopup={closePopup}></PopupLayout>
  );
};

export default JobOfferPopup;
