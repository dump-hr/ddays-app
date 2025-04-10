import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import c from './CodePopup.module.scss';
import CodeInput from '@/components/CodeInput';

type CodePopupProps = {
  closePopup: () => void;
  isOpen: boolean;
};

const CodePopup: React.FC<CodePopupProps> = ({ closePopup, isOpen }) => {
  return (
    <PopupLayout
      variant='light'
      headerTitleComponent='UNESI KOD'
      closePopup={closePopup}
      isOpen={isOpen}>
      <div className={c.content}>
        <CodeInput />
      </div>
    </PopupLayout>
  );
};

export default CodePopup;
