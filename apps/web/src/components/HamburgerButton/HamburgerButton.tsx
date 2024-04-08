import clsx from 'clsx';

import Close from '../../assets/icons/close.svg';
import Hamburger from '../../assets/icons/hamburger.svg';
import c from './HamburgerButton.module.scss';

type HamburgerButtonProps = {
  isClose?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const HamburgerButton = ({
  className,
  isClose,
  ...handlers
}: HamburgerButtonProps) => {
  const classes = clsx(className, c.hamburgerButton);
  return (
    <button className={classes} {...handlers}>
      <img src={isClose ? Close : Hamburger} alt='Hamburger' />
    </button>
  );
};

export default HamburgerButton;
