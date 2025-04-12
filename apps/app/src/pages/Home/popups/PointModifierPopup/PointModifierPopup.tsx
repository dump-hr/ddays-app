import MessageDuck from '@/components/MessageDuck';
import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import Backlight from '@/assets/images/backlight.svg';

import c from './PointModifierPopup.module.scss';
import Button from '@/components/Button';

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
      <div className={c.content}>
        <MessageDuck text='BRAVO!' progressPercent={80} />
        <h3 className={c.title}>+10 BODOVA</h3>
        <p className={c.paragraph}>
          Bravo! Super te ide - još malo do nagrade!
        </p>
        <Button className={c.button} variant='black' points={10}>
          Dajemo ti
        </Button>
      </div>
    </PopupLayout>
  );
};

export default PointModifierPopup;
