import { PropsWithChildren } from 'react';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';
import clsx from 'clsx';
import c from './ButtonSettings.module.scss';

type ButtonSettingsProps = {
  icon: string;
  variant: 'grey' | 'red';
};

export const ButtonSettings: React.FC<
  PropsWithChildren<ButtonSettingsProps>
> = ({ icon, children, variant }) => {
  return (
    <button
      className={clsx(c.button, {
        [c.grey]: variant === 'grey',
        [c.red]: variant === 'red',
      })}>
      <div className={c.content}>
        <img src={icon} alt='' /> {children}
      </div>
      <img src={ArrowRightIcon} />
    </button>
  );
};
