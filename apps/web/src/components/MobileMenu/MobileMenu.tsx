import clsx from 'clsx';

import c from './MobileMenu.module.scss';

type MobileMenuProps = {
  Button: React.ReactNode;
  isOpen: boolean;
};

const MobileMenu = ({ Button, isOpen }: MobileMenuProps) => {
  const classes = clsx({
    [c.mobileMenu]: true,
    [c.open]: isOpen,
  });

  return (
    <div className={classes}>
      mobile menu
      {Button}
    </div>
  );
};

export default MobileMenu;
