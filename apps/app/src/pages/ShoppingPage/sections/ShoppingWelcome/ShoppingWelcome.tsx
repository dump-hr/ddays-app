import styles from './ShoppingWelcome.module.scss';
import NavigateHomeButton from '../../../../components/NavigateHomeButton';
import Button from '../../../../components/Button';
import DuckWelcomeImg from '../../../../assets/images/duck-shop-welcome.png';

const ShoppingWelcome = () => {
  return (
    <div className={styles.welcomeWrapper}>
      <h1>SHOPPING</h1>
      <div className={styles.imageWrapper}>
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
              Ove godine imamo takav i takav sistem, ovdi možete kupit svojim
              bodovima to i to ali pazite jer ce vam to potrosit vase bodove
            </p>
            <p className={styles.welcomeText}>
              Možete svoje stvari preuzet na štandu tako da pokažete svoj račun/
              ili nešto gdje će se također voditi evidencija o vašim preuzetim
              stvarima.{' '}
            </p>
            <div className={styles.welcomeText}>
              Pravila:
              <ul className={styles.welcomeText}>
                <li>Pravilo 1</li>
                <li>Pravilo 2</li>
              </ul>
            </div>
          </div>
        </div>
        <Button variant='orange' className={styles.nextButton}>
          DALJE
        </Button>
      </div>
    </div>
  );
};

export default ShoppingWelcome;
