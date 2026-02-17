import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import DaysSticker from '../../assets/images/days-sticker.webp';
import HamburgerButton from '../HamburgerButton';
import c from './Navbar.module.scss';

type NavItem = {
  name: string;
  path: string;
};

type NavbarProps = {
  items: NavItem[];
  toggleMobileMenu: () => void;
};

const Navbar = ({ items, toggleMobileMenu }: NavbarProps) => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 10) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={clsx(c.navbar, { [c.hidden]: !visible })}>
        <div className={c.content}>
          <a href='/' className={c.logo}>
            <img src={DaysSticker} alt='DUMP Days' className={c.logoImage} />
            <span className={c.logoText}>DUMP DAYS</span>
          </a>

          <div className={c.right}>
            <ul className={c.navLinks}>
              {items.map((item) => (
                <li key={item.name}>
                  <a href={item.path} className={c.navLink}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <a href='#' className={c.ctaButton}>
              <span className={c.ctaText}>Registriraj se</span>
            </a>

            <HamburgerButton
              className={c.hamburger}
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
        <div className={c.rippedEdge}>
          <div className={c.rippedFg} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
