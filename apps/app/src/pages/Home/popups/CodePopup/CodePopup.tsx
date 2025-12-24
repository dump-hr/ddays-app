import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import c from './CodePopup.module.scss';
import CodeInput from '@/components/CodeInput';
import Button from '@/components/Button';
import { useState } from 'react';
import { useCodeApply } from '@/api/code/useCodeApply';
import { useGeoValidation } from '@/hooks/useGeoValidation';

type CodePopupProps = {
  isOpen: boolean;
  closePopup: () => void;
  onSuccess: (points: number) => void;
};

const CodePopup: React.FC<CodePopupProps> = ({
  closePopup,
  isOpen,
  onSuccess,
}) => {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [errorMessage, setErrorMessage] = useState('');
  const applyCode = useCodeApply();
  const geolocation = useGeoValidation();

  function handleCodeSubmit(code: string) {
    if (!geolocation.isOk) {
      setErrorMessage(
        `Ne možete unijeti kod izvan dozvoljene lokacije. ${geolocation?.error ?? ''}`,
      );
      return;
    }

    applyCode.mutate(code, {
      onSuccess: (submittedCode) => {
        closePopup();
        if (submittedCode.redirectUrl) {
          const currentUrl = new URL(window.location.href);
          const appendPath = submittedCode.redirectUrl;
          currentUrl.pathname =
            currentUrl.pathname.replace(/\/$/, '') + appendPath;
          window.location.href = currentUrl.toString();
        }
        setCode(Array(6).fill(''));
        onSuccess(submittedCode.code.points || 0);
      },
      onError: (error) => {
        setErrorMessage(String(error));
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
