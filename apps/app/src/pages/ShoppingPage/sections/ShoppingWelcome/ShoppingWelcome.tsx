import styles from './ShoppingWelcome.module.scss';
import DuckWelcomeImg from '@/assets/images/duck-shop-welcome.png';
import { SHOPPING_RULES, WELCOME_PARAGRAPHS } from './welcomeSection.constants';

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
            {WELCOME_PARAGRAPHS.map((paragraph, index) => (
              <p key={index} className={styles.welcomeText}>
                {paragraph}
              </p>
            ))}
            <div className={styles.welcomeText}>
              Pravila:
              <ul className={styles.welcomeText}>
                {SHOPPING_RULES.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
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
