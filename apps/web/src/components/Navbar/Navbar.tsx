import { SectionBreaker } from 'components/SectionBreaker';
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
  return (
    <>
      <nav className={c.navbar}>
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
      </nav>
      <SectionBreaker fg='dark' bg='light' className={c.sectionBreaker} />
    </>
  );
};

export default Navbar;
