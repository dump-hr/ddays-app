import BoothPopupLayout from '@/layout/BoothPopupLayout';

type BoothPopupProps = {
  closePopup: () => void;
  isOpen: boolean;
};

const BoothPopup: React.FC<BoothPopupProps> = ({ closePopup, isOpen }) => {
  return (
    <BoothPopupLayout closePopup={closePopup} isOpen={isOpen}>
      <p>test</p>
    </BoothPopupLayout>
  );
};

export default BoothPopup;
