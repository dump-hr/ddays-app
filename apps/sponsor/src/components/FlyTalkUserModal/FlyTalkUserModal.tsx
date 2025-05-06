import { UserToCompanyDto } from '@ddays-app/types/src/dto/user';
import { useEffect } from 'react';

import { usePatchSelectedApplicant } from '../../api/flyTalks/usePatchSelectedApplicant';
import CloseSvg from '../../assets/icons/close.svg';
import WhiteButton from '../WhiteButton';
import c from './FlyTalkUserModal.module.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: UserToCompanyDto | null;
  setModalUser: (user: UserToCompanyDto) => void;
};

const FlyTalkUserModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  user,
  setModalUser,
}) => {
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

  const patchApplicant = usePatchSelectedApplicant();

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

  const handleSelectClick = (applicant: UserToCompanyDto) => {
    patchApplicant.mutate(
      {
        user: applicant,
        selected: !applicant.selected,
      },
      {
        onSuccess: () => {
          setModalUser({ ...applicant, selected: !applicant.selected });
        },
      },
    );
  };

  return (
    <div className={c.background} onClick={onClose}>
      <div className={c.container} onClick={(e) => e.stopPropagation()}>
        <img src={CloseSvg} alt='Close' className={c.close} onClick={onClose} />
        <p className={c.subtitle}>Prijavljeni sudionik</p>
        <h3 className={c.fullName}>
          {user.firstName} {user.lastName}
        </h3>
        <h4 className={c.email}>{user.email}</h4>
        <p className={c.about}>{user.description}</p>
        <label className={c.label}>Poveznice</label>
        <p className={c.link}>
          LinkedIn: <a href={user.linkedinProfile}>{user.linkedinProfile}</a>
        </p>
        <p className={c.link}>
          Github: <a href={user.githubProfile}>{user.githubProfile}</a>
        </p>
        <p className={c.link}>
          Portfolio: <a href={user.portfolioProfile}>{user.portfolioProfile}</a>
        </p>
        <div className={c.buttons}>
          <WhiteButton
            variant='secondary'
            onClick={() => window.open(user.cv, '_blank')}>
            Pregledaj CV{' '}
          </WhiteButton>
          <WhiteButton
            variant='primary'
            onClick={() => {
              console.log('Klik na botun detektiran');
              handleSelectClick(user);
            }}>
            {user.selected ? 'Ukloni odabir' : 'Odaberi'}
          </WhiteButton>
        </div>
      </div>
    </div>
  );
};

export default FlyTalkUserModal;
