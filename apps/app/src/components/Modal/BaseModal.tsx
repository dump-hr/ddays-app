import { ReactNode } from 'react';
import sprite from '../../assets/sprite.svg';

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};
//type of modal - mobile (whole screen (set percentage of screen two options see design) and desktop side one and almost whole screen one same as mobile see design)
export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div>
      <div></div>
      <div>
        <p>{title}</p>
        <div onClick={() => onClose()}>
          <svg width={22} height={22}>
            <use href={`${sprite}#close-icon`} />
          </svg>
        </div>
      </div>
      {children}
    </div>
  );
};
