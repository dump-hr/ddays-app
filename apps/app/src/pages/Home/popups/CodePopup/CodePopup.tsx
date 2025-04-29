import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import c from './CodePopup.module.scss';
import CodeInput from '@/components/CodeInput';
import Button from '@/components/Button';
import { useState } from 'react';
import { useCodeApply } from '@/api/code/useCodeApply';
import toast from 'react-hot-toast';

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
  const [errorMessage, setErrorMessage] = useState('');
  const applyCode = useCodeApply();

  function handleCodeSubmit(code: string) {
    applyCode.mutate(code, {
      onSuccess: () => {
        toast.success('Kod je uspješno unesen!');
        closePopup();
        onSuccess();
      },
      onError: (error) => {
        setErrorMessage('Upsich! ' + error.name);
      },
    });
  }

  function handleClosePopup() {
    closePopup();
    setCode(Array(6).fill(''));
    setErrorMessage('');
  }

  return (
    <PopupLayout
      variant='light'
      desktopStyle='stretch'
      headerTitleComponent='UNESI KOD'
      closePopup={handleClosePopup}
      isOpen={isOpen}>
      <CodeInput
        code={code}
        setCode={setCode}
        isError={errorMessage !== ''}
        removeError={() => setErrorMessage('')}
        className={c.codeInput}
        shouldFocus={isOpen}
      />
      {errorMessage ? (
        <p className={c.error}>{errorMessage}</p>
      ) : (
        <p className={c.message}>Imaš kod za bodove? Unesi ga.</p>
      )}

      <Button
        className={c.button}
        variant='orange'
        disabled={code.includes('') || errorMessage !== ''}
        onClick={() => handleCodeSubmit(code.join(''))}>
        Unesi
      </Button>
    </PopupLayout>
  );
};

export default CodePopup;
