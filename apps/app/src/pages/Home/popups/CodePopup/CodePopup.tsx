import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import c from './CodePopup.module.scss';
import CodeInput from '@/components/CodeInput';
import Button from '@/components/Button';
import { useState } from 'react';

type CodePopupProps = {
  closePopup: () => void;
  onSubmit: (code: string) => void;
  isOpen: boolean;
};

const CodePopup: React.FC<CodePopupProps> = ({
  closePopup,
  isOpen,
  onSubmit,
}) => {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  return (
    <PopupLayout
      variant='light'
      desktopStyle='stretch'
      headerTitleComponent='UNESI KOD'
      closePopup={closePopup}
      isOpen={isOpen}>
      <div className={c.content}>
        <CodeInput code={code} setCode={setCode} />
      </div>

      <p className={c.message}>Imaš kod za bodove? Unesi ga.</p>

      <Button
        className={c.button}
        variant='orange'
        disabled={code.includes('')}
        onClick={() => onSubmit(code.join(''))}>
        Unesi
      </Button>
    </PopupLayout>
  );
};

export default CodePopup;
