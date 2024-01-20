import { FormSteps } from '@ddays-app/types';
import React from 'react';
import { useEffect } from 'react';

import { FormStep } from '../../types/form';
import c from './Modal.module.scss';

interface ModalProps {
  currentForm?: keyof typeof FormSteps | null;
  close: () => void;
  form: FormStep;
}

const Modal: React.FC<ModalProps> = ({ form, close, currentForm }) => {
  useEffect(() => {
    if (currentForm) {
      const width = document.body.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.width = `${width}px`;
    } else {
      document.body.style.overflow = 'visible';
      document.body.style.width = `auto`;
    }

    return () => {
      document.body.style.overflow = 'visible';
      document.body.style.width = `auto`;
    };
  }, [currentForm]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [close]);

  return (
    <>
      <div className={c.background} onClick={close}>
        <div className={c.container} onClick={(e) => e.stopPropagation()}>
          <img
            src='/close.svg'
            alt='Close'
            className={c.close}
            onClick={close}
          />
          {form.component({ close })}
        </div>
      </div>
    </>
  );
};

export default Modal;
