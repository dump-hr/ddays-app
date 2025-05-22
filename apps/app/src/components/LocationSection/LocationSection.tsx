import c from './LocationSection.module.scss';
import fesb from '../../assets/images/fesb.png';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@/router/routes';

const LocationSection = () => {
  const navigate = useNavigate();
  return (
    <div className={c.containerWrapper}>
      <div className={c.titleWrapper}>
        <h1 className={c.title}>IZLOžBENI PROSTOR</h1>

        <p className={c.description}>
          Za lakše snalaženje zaviri u interaktivan tlocrt konferencije. Vidi
          gdje se koja tvrtka nalazi.
        </p>

        <Button
          className={c.button}
          variant='black'
          onClick={() => navigate(RouteNames.FLOOR_PLAN)}>
          Zaviri u naš prostor
        </Button>
      </div>

      <div className={c.imageContainer}>
        <img src={fesb} alt='zgrada fesba' className={c.image} />
      </div>
    </div>
  );
};

export default LocationSection;
