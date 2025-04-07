import { UserDto } from '@ddays-app/types/src/dto/user';
import { useEffect } from 'react';

import CloseSvg from '../../assets/icons/close.svg';
import WhiteButton from '../WhiteButton';
import c from './FlyTalkUserModal.module.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: UserDto | null;
};

const FlyTalkUserModal: React.FC<ModalProps> = ({ isOpen, onClose, user }) => {
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

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
  }, [onClose]);

  if (!user) return null;

  return (
    <div className={c.background} onClick={onClose}>
      <div className={c.container} onClick={(e) => e.stopPropagation()}>
        <img src={CloseSvg} alt='Close' className={c.close} onClick={onClose} />
        <p className={c.subtitle}>Prijavljeni sudionik</p>
        <h3 className={c.fullName}>
          {user.firstName} {user.lastName}
        </h3>
        <h4 className={c.email}>{user.email}</h4>
        <p className={c.about}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
          commodi totam voluptatibus maiores placeat voluptatem? Sequi officia
          dignissimos est quaerat aut eveniet hic quisquam possimus eaque
          maiores? Reiciendis, porro corporis.
        </p>
        <label className={c.label}>Poveznice</label>
        <p className={c.link}>
          LinkedIn: <a href='https://www.google.com'>https://www.google.com</a>
        </p>
        <p className={c.link}>
          Github: <a href='https://www.google.com'>https://www.google.com</a>
        </p>
        <p className={c.link}>
          Portfolio: <a href='https://www.google.com'>https://www.google.com</a>
        </p>
        <div className={c.buttons}>
          <WhiteButton variant='secondary'>Pregledaj CV </WhiteButton>
          <WhiteButton variant='primary'>Odaberi</WhiteButton>
        </div>
      </div>
    </div>
  );
};

export default FlyTalkUserModal;
