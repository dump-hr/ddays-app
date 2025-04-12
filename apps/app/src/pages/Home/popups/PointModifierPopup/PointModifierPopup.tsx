import MessageDuck from '@/components/MessageDuck';
import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import Backlight from '@/assets/images/backlight.svg';

import c from './PointModifierPopup.module.scss';

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
      closePopup={closePopup}
      showXButton={false}>
      <img src={Backlight} className={c.backlight} />
      <MessageDuck text='BRAVO!' progressPercent={80} />
    </PopupLayout>
  );
};

export default PointModifierPopup;
