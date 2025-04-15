import PopupLayout from '@/layout/PopupLayout/PopupLayout';

type JobOfferPopupProps = {
  closePopup: () => void;
  isOpen: boolean;
};

const JobOfferPopup: React.FC<JobOfferPopupProps> = ({
  closePopup,
  isOpen,
}) => {
  return (
    <PopupLayout
      headerTitleComponent={null}
      variant='dark'
      isOpen={isOpen}
      closePopup={closePopup}></PopupLayout>
  );
};

export default JobOfferPopup;
