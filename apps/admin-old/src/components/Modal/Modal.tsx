import { Button } from '../Button';
import c from './Modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  showCloseButton?: boolean;
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  showCloseButton = false,
  onClose,
}) => {
  if (!isOpen) return null;
  return (
    <div className={c.modal}>
      <div onClick={onClose} className={c.overlay}></div>
      <div className={c.modalContent}>
        {children}
        {/* TODO: dodat X gore desno za zatvorit i maknit prop ili stavit defaultno true */}
        {showCloseButton && <Button onClick={onClose}>Close</Button>}
      </div>
    </div>
  );
};
