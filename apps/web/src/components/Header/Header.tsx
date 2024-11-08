import clsx from 'clsx';
import { useEffect, useState } from 'react';

import HamburgerButton from '../HamburgerButton';
import c from './Header.module.scss';

type HeaderProps = {
  Button: React.ReactNode;
  toggleMobileMenu: () => void;
};

const Header = ({ Button, toggleMobileMenu }: HeaderProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [isStickyVisible, setIsStickyVisible] = useState(true);

  // TODO: refactor this to only use mutation observer

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);

        const DuckieSection = document.getElementById('konferencija');
        if (DuckieSection) {
          const { top } = DuckieSection.getBoundingClientRect();

          if (window.scrollY === 0) {
            setIsStickyVisible(true);
          } else {
            setIsStickyVisible(top <= 0);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const classes = clsx({
    [c.header]: true,
    [c.blend]: scrollY > 0.85 * window.innerHeight,
    [c.scrolled]: scrollY > 32,
    [c.hidden]: !isStickyVisible,
  });

  return (
    <header className={classes}>
      <p className={c.text}>
        SPLIT <span className={c.separator}>//</span> FESB <br /> 23.{' '}
        <span className={c.separator}>—</span> 24. 05. 2024.
      </p>
      <p className={c.text}>
        BESPLATNA KONFERENCIJA <br />
        ZA NOVU GENERACIJU
      </p>
      {Button}
      <HamburgerButton className={c.hamburger} onClick={toggleMobileMenu} />
    </header>
  );
};

export default Header;
