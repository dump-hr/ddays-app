import clsx from 'clsx';
import { useEffect, useState } from 'react';

import HamburgerButton from '../HamburgerButton';
import c from './Header.module.scss';

type HeaderProps = {
  Button: React.ReactNode;
};

const Header = ({ Button }: HeaderProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
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
      <HamburgerButton className={c.hamburger} />
    </header>
  );
};

export default Header;
