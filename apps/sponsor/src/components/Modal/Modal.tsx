import React from 'react';

import { FormStep } from '../../types/form';
import c from './Modal.module.scss';

interface ModalProps {
  close: () => void;
  form: FormStep;
}

const Modal: React.FC<ModalProps> = ({ form, close }) => {
  return (
    <>
      <div className={c.container}>
        <img src='/close.svg' alt='Close' className={c.close} onClick={close} />
        {form.component({ close })}
      </div>
      <div className={c.background}></div>
    </>
  );
};

export default Modal;
