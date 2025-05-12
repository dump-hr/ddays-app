import styles from './ShoppingWelcome.module.scss';
import DuckWelcomeImg from '@/assets/images/duck-shop-welcome.png';

import { NavigateHomeButton } from '@/components/NavigateHomeButton';
import Button from '@/components/Button';

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
            <p className={styles.welcomeText}>Tražili ste - dobili ste!</p>
            <p className={styles.welcomeText}>
              Ove godine dijelimo nagrade baš svima! Skupljaj bodove, pronađi
              proizvod koji ti se sviđa i kupi ga svojim bodovima. Svakog
              proizvoda ima u ograničenim količinama pa požuri po svoj! Nakon
              što kupis proizvod, imaš 30 min da ga preuzmeš, inače ga vraćamo u
              ponudu, a tebi ne vraćamo bodove.
            </p>
            <div className={styles.welcomeText}>
              Pravila:
              <p>isti proizvod možeš kupiti samo jednom</p>
              <p>na štandu pokaži račun za preuzimanje</p>
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
