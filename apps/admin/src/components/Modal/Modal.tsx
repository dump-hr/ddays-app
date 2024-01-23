import { Button } from '../Button';
import c from './Modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  showCloseButton?: boolean;
  toggleModal: () => void;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  showCloseButton = false,
  toggleModal,
}) => {
  if (!isOpen) return null;
  return (
    <div className={c.modal}>
      <div onClick={toggleModal} className={c.overlay}></div>
      <div className={c.modalContent}>
        {children}
        {/* TODO: dodat X gore desno za zatvorit i maknit prop ili stavit defaultno true */}
        {showCloseButton && <Button onClick={toggleModal}>Close</Button>}
      </div>
    </div>
  );
};
