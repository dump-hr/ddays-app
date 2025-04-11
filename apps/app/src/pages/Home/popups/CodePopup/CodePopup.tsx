import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import c from './CodePopup.module.scss';
import CodeInput from '@/components/CodeInput';
import Button from '@/components/Button';

type CodePopupProps = {
  closePopup: () => void;
  isOpen: boolean;
};

const CodePopup: React.FC<CodePopupProps> = ({ closePopup, isOpen }) => {
  return (
    <PopupLayout
      variant='light'
      desktopStyle='stretch'
      headerTitleComponent='UNESI KOD'
      closePopup={closePopup}
      isOpen={isOpen}>
      <div className={c.content}>
        <CodeInput />
      </div>
      <p className={c.message}>Imaš kod za bodove? Unesi ga.</p>
      <Button className={c.button} variant='orange' disabled>
        Unesi
      </Button>
    </PopupLayout>
  );
};

export default CodePopup;
