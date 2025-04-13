import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import c from './CodePopup.module.scss';
import CodeInput from '@/components/CodeInput';
import Button from '@/components/Button';
import { useState } from 'react';

type CodePopupProps = {
  isOpen: boolean;
  closePopup: () => void;
  onSuccess: () => void;
};

const CodePopup: React.FC<CodePopupProps> = ({
  closePopup,
  isOpen,
  onSuccess,
}) => {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [isError, setIsError] = useState(false);

  function handleCodeSubmit(code: string) {
    const isValid = code === '123456';

    if (isValid) {
      closePopup();
      setCode(Array(6).fill(''));
      onSuccess();
    } else {
      setIsError(true);
    }
  }

  return (
    <PopupLayout
      variant='light'
      desktopStyle='stretch'
      headerTitleComponent='UNESI KOD'
      closePopup={closePopup}
      isOpen={isOpen}>
      <CodeInput
        code={code}
        setCode={setCode}
        isError={isError}
        setIsError={setIsError}
        className={c.codeInput}
        shouldFocus={isOpen}
      />
      {isError ? (
        <p className={c.error}>Ne izmišljaj kodove, unesi pravi.</p>
      ) : (
        <p className={c.message}>Imaš kod za bodove? Unesi ga.</p>
      )}

      <Button
        className={c.button}
        variant='orange'
        disabled={code.includes('') || isError}
        onClick={() => handleCodeSubmit(code.join(''))}>
        Unesi
      </Button>
    </PopupLayout>
  );
};

export default CodePopup;
