import Button from '../Button';
import HamburgerButton from '../HamburgerButton';
import c from './Header.module.scss';

const Header = () => {
  return (
    <header className={c.header}>
      <p className={c.text}>
        SPLIT <span className={c.separator}>//</span> FESB <br /> 23.{' '}
        <span className={c.separator}>—</span> 24. 05. 2024.
      </p>
      <p className={c.text}>
        BESPLATNA KONFERENCIJA <br />
        ZA NOVU GENERACIJU
      </p>
      <Button className={c.button}>Registriraj se</Button>
      <HamburgerButton />
    </header>
  );
};

export default Header;
