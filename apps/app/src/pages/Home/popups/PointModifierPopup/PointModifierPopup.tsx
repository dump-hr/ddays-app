import PopupLayout from '@/layout/PopupLayout/PopupLayout';

type PointModifierPopupProps = {
  isOpen: boolean;
  closePopup: () => void;
};

const PointModifierPopup: React.FC<PointModifierPopupProps> = ({
  isOpen,
  closePopup,
}) => {
  return (
    <PopupLayout
      headerTitleComponent={null}
      variant='dark'
      desktopStyle='stretch'
      isOpen={isOpen}
      closePopup={closePopup}></PopupLayout>
  );
};

export default PointModifierPopup;
