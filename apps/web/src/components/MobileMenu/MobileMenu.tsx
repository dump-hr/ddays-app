import clsx from 'clsx';
import HamburgerButton from 'components/HamburgerButton';

import c from './MobileMenu.module.scss';

type MobileMenuProps = {
  Button: React.ReactNode;
  isOpen: boolean;
  toggle: () => void;
  items: { name: string; path: string }[];
};

const MobileMenu = ({ Button, isOpen, toggle, items }: MobileMenuProps) => {
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
      <nav className={c.items}>
        {items.map((item) => (
          <a
            key={item.name}
            href={item.path}
            onClick={toggle}
            className={c.item}>
            {item.name}
          </a>
        ))}
      </nav>
      {Button}
    </div>
  );
};

export default MobileMenu;
