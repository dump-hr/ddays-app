import Button from '../Button';
import c from './Modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  noButton?: boolean;
  toggleModal: () => void;
};

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  noButton = false,
  toggleModal,
}) => {
  if (!isOpen) return null;
  return (
    <div className={c.modal}>
      <div onClick={toggleModal} className={c.overlay}></div>
      <div className={c.modalContent}>
        {children}
        {!noButton && <Button onClick={toggleModal}>Close</Button>}
      </div>
    </div>
  );
};

export default Modal;
