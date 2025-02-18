import styles from './ShoppingHeader.module.scss';
import CrossIcon from '@/assets/icons/cross-icon.svg';
import TransactionsIcon from '@/assets/icons/transactions-icon.svg';
import ShoppingCartIcon from '@/assets/icons/shopping-cart-icon.svg';
import { HeaderCard } from '../../../../components/Header/HeaderCard/HeaderCard';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../../../router/routes';

const ShoppingHeader = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate(RouteNames.HOME);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>SHOPPING</h1>
        <img src={CrossIcon} alt='' onClick={navigateHome} />
      </div>
      <div className={styles.navigation}>
        <HeaderCard
          img={TransactionsIcon}
          text='Transakcije'
          width={168}
          height={110}
          imgHeight={78}
          imgWidth={44}
        />
        <HeaderCard
          img={ShoppingCartIcon}
          text='Košarica'
          width={168}
          height={110}
          imgHeight={78}
          imgWidth={44}
        />
      </div>
    </div>
  );
};

export default ShoppingHeader;
