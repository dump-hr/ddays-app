import clsx from 'clsx';

import Hamburger from '../../assets/icons/hamburger.svg';
import c from './HamburgerButton.module.scss';

type HamburgerButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const HamburgerButton = ({ className, ...handlers }: HamburgerButtonProps) => {
  const classes = clsx(className, c.hamburgerButton);
  return (
    <button className={classes} {...handlers}>
      <img src={Hamburger} alt='Hamburger' />
    </button>
  );
};

export default HamburgerButton;
