import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import c from './CodePopup.module.scss';

type CodePopupProps = {
  closePopup: () => void;
  isOpen: boolean;
};

const CodePopup: React.FC<CodePopupProps> = ({ closePopup, isOpen }) => {
  return (
    <PopupLayout
      variant='light'
      headerTitleComponent='Unesi kod'
      closePopup={closePopup}
      isOpen={isOpen}>
      <div className={c.content}></div>
    </PopupLayout>
  );
};

export default CodePopup;
