import styles from './ShoppingHeader.module.scss';
import CrossIcon from '@/assets/icons/cross-icon.svg';
import TransactionsIcon from '@/assets/icons/transactions-icon.svg';
import ShoppingCartIcon from '@/assets/icons/shopping-cart-icon.svg';

const ShoppingHeader = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>SHOPPING</h1>
        <img src={CrossIcon} alt='' />
      </div>
      <div className={styles.navigation}>
        <button className={styles.navButton}>
          <img src={TransactionsIcon} alt='' />
          <p>Transakcije</p>
        </button>
        <button className={styles.navButton}>
          <img src={ShoppingCartIcon} alt='' />
          <p>Košarica</p>
        </button>
      </div>
    </div>
  );
};

export default ShoppingHeader;
