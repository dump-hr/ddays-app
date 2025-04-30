import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import c from './ScannedCodePopup.module.scss';
import Button from '@/components/Button';
import { useCodeApply } from '@/api/code/useCodeApply';

type ScannedCodePopupProps = {
  code: string;
  isAlreadyApplied: boolean;
  isOpen: boolean;
  closePopup: () => void;
};

const ScannedCodePopup: React.FC<ScannedCodePopupProps> = ({
  code,
  isAlreadyApplied,
  isOpen,
  closePopup,
}) => {
  const applyCode = useCodeApply();

  function handleCodeSubmit() {
    applyCode.mutate(code);
  }

  return (
    <PopupLayout
      variant='light'
      desktopStyle='normal'
      headerTitleComponent='Kod skeniran!'
      isOpen={isOpen}
      closePopup={closePopup}>
      <div className={c.content}>
        <h3 className={c.code}>{code}</h3>
        {isAlreadyApplied && (
          <p className={c.error}>Ovaj kod je već iskorišten!</p>
        )}
        <Button
          className={c.button}
          variant='orange'
          disabled={isAlreadyApplied}
          onClick={handleCodeSubmit}>
          Unesi
        </Button>
      </div>
    </PopupLayout>
  );
};

export default ScannedCodePopup;
