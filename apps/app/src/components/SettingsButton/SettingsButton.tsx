import { PropsWithChildren } from 'react';
import ArrowRightIcon from '@/assets/icons/arrow-right-sm.svg';
import ArrowRightWhiteIcon from '@/assets/icons/arrow-right-white.svg';
import clsx from 'clsx';
import c from './SettingsButton.module.scss';

type SettingsButtonProps = {
  icon: string;
  variant: 'grey' | 'red';
  onClick?: () => void;
};

export const SettingsButton: React.FC<
  PropsWithChildren<SettingsButtonProps>
> = ({ icon, children, variant, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(c.button, {
        [c.grey]: variant === 'grey',
        [c.red]: variant === 'red',
      })}>
      <div className={c.content}>
        <img src={icon} alt='' /> {children}
      </div>
      <img src={variant === 'red' ? ArrowRightWhiteIcon : ArrowRightIcon} />
    </button>
  );
};
