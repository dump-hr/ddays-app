import MessageDuck from '@/components/MessageDuck';
import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import Backlight from '@/assets/images/backlight.svg';
import RedBacklight from '@/assets/images/red-backlight.svg';

import c from './PointModifierPopup.module.scss';
import Button from '@/components/Button';

type PointModifierPopupProps = {
  isOpen: boolean;
  points: number;
  closePopup: () => void;
};

const paragraphText = {
  positive: 'Bravo! Super te ide - još malo do nagrade!',
  negative: 'Nažalost, morat ćemo ti oduzeti bodove. Nema predaje!',
};

const buttonText = {
  positive: 'Dajemo ti',
  negative: 'Oduzimamo ti',
};

const PointModifierPopup: React.FC<PointModifierPopupProps> = ({
  isOpen,
  points,
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
      <img
        src={points > 0 ? Backlight : RedBacklight}
        className={c.backlight}
      />
      <div className={c.content}>
        <MessageDuck
          text={points > 0 ? 'BRAVO!' : 'ŠTETA!'}
          progressPercent={80}
          sparkles={points > 0}
        />

        <h3 className={c.title}>
          {points > 0 && '+'}
          {points} BODOVA
        </h3>
        <p className={c.paragraph}>
          {points > 0 ? paragraphText.positive : paragraphText.negative}
        </p>
        <Button
          className={c.button}
          variant='black'
          points={points}
          onClick={closePopup}>
          {points > 0 ? buttonText.positive : buttonText.negative}
        </Button>
      </div>
    </PopupLayout>
  );
};

export default PointModifierPopup;
