import clsx from 'clsx';
import HamburgerButton from 'components/HamburgerButton';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import c from './MobileMenu.module.scss';

gsap.registerPlugin(ScrollToPlugin);

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
        <p className={c.headerText}>Izbornik</p>
        <HamburgerButton onClick={toggle} isClose />
      </div>
      <nav className={c.items}>
        {items.map((item) => (
          <a
            key={item.name}
            href={item.path}
            onClick={(e) => {
              e.preventDefault();
              toggle();
              gsap.to(window, {
                scrollTo: item.path,
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () =>
                  history.replaceState(null, '', location.pathname),
              });
            }}
            className={c.item}>
            {item.name}
          </a>
        ))}
      </nav>
      <div className={c.dots}></div>
      {Button}
      <p className={c.bottomText}>
        Besplatna konferencija <br /> za novu generaciju
      </p>
    </div>
  );
};

export default MobileMenu;
