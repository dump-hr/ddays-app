import c from './Modal.module.scss';
import Button from '../Button';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  toggleModal: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, toggleModal }) => {
  if (!isOpen) return null;
  return (
    <div className={c.modal}>
      <div onClick={toggleModal} className={c.overlay}></div>
      <div className={c.modalContent}>
        {children}
        <Button onClick={toggleModal}>Close</Button>
      </div>
    </div>
  );
};

export default Modal;
