import { UserDto } from '@ddays-app/types/src/dto/user';
import clsx from 'clsx';

import c from './FlyTalkUserModal.module.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: UserDto | null;
};

const FlyTalkUserModal: React.FC<ModalProps> = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  return (
    <div className={clsx(c.backdrop, { [c.open]: isOpen })}>
      <div className={c.modal}>
        <p>
          Modalchich {user.firstName} {user.lastName}
        </p>
        <button onClick={() => onClose()}>chiusare!</button>
      </div>
    </div>
  );
};

export default FlyTalkUserModal;
