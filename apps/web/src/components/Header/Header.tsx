import Button from '../Button';
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
      <Button>TEXT</Button>
    </header>
  );
};

export default Header;