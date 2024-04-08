import clsx from 'clsx';
import HamburgerButton from 'components/HamburgerButton';

import c from './MobileMenu.module.scss';

type MobileMenuProps = {
  Button: React.ReactNode;
  isOpen: boolean;
  toggle: () => void;
};

const MobileMenu = ({ Button, isOpen, toggle }: MobileMenuProps) => {
  const classes = clsx({
    [c.mobileMenu]: true,
    [c.open]: isOpen,
  });

  return (
    <div className={classes}>
      <div className={c.header}>
        <p>Izbornik</p>
        <HamburgerButton onClick={toggle} />
      </div>
      {Button}
    </div>
  );
};

export default MobileMenu;
