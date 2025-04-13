import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import c from './NewLevelPopup.module.scss';
import Button from '@/components/Button';
import LevelUpBadge from '@/components/LevelUpBadge';

type NewLevelPopupProps = {
  isOpen: boolean;
  closePopup: () => void;
};

const NewLevelPopup: React.FC<NewLevelPopupProps> = ({
  isOpen,
  closePopup,
}) => {
  return (
    <PopupLayout
      variant='dark'
      showXButton={false}
      headerTitleComponent={null}
      isOpen={isOpen}
      closePopup={closePopup}
      desktopStyle='stretch'>
      <div className={c.content}>
        <LevelUpBadge level={3} />
        <h3 className={c.title}>ČESTITAMO!</h3>
        <p className={c.paragraph}>
          Bravo, majstore! Sljedeća razina te čeka! Jesi li spreman?
        </p>
        <Button className={c.button} variant='orange' onClick={closePopup}>
          HVALA
        </Button>
      </div>
    </PopupLayout>
  );
};

export default NewLevelPopup;
