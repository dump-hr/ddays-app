import styles from './ShoppingWelcome.module.scss';
import DuckWelcomeImg from '@/assets/images/duck-shop-welcome.png';

import { NavigateHomeButton } from '../../../../components/NavigateHomeButton';
import Button from '../../../../components/Button';

interface ShoppingWelcomeProps {
  setFirstShopVisit: (value: boolean) => void;
}

const ShoppingWelcome: React.FC<ShoppingWelcomeProps> = ({
  setFirstShopVisit,
}) => {
  const handleNextClick = () => {
    localStorage.setItem('firstShopVisit', 'false');
    setFirstShopVisit(false);
    document.querySelector('body')!.scrollTo(0, 0);
  };

  return (
    <div className={styles.welcomeWrapper}>
      <h1>SHOPPING</h1>
      <NavigateHomeButton />
      <div className={styles.duckImageWrapper}>
        <img src={DuckWelcomeImg} alt='Shopping welcome' />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <h2>Shopping</h2>
            <NavigateHomeButton />
          </div>
          <div className={styles.content}>
            <p className={styles.welcomeText}>
              Ove godine imamo takav i takav sistem, ovdje možete kupit svojim
              bodovima to i to ali pazite jer će to potrošit vaše bodove.
            </p>
            <p className={styles.welcomeText}>
              Možete svoje stvari preuzet na štandu tako da pokažete svoj račun
              ili nešto gdje će se također voditi evidencija o vašim preuzetim
              stvarima.
            </p>
            <div className={styles.welcomeText}>
              Pravila:
              <p>Pravilo 1:</p>
              <p>Pravilo 2:</p>
            </div>
          </div>
        </div>
        <Button
          variant='orange'
          className={styles.nextButton}
          onClick={handleNextClick}>
          DALJE
        </Button>
      </div>
    </div>
  );
};

export default ShoppingWelcome;
