import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShoppingHeader.module.scss';
import CrossIcon from '@/assets/icons/cross-icon.svg';
import TransactionsIcon from '@/assets/icons/transactions-icon.svg';
import ShoppingCartIcon from '@/assets/icons/shopping-cart-icon.svg';
import { HeaderCard } from '../../../../components/Header/HeaderCard/HeaderCard';
import { RouteNames } from '../../../../router/routes';
import { useDeviceType } from '../../../../hooks/UseDeviceType';

const ShoppingHeader = () => {
  const [headerCardWidth, setHeaderCardWidth] = useState(168);
  const [headerCardHeight, setHeaderCardHeight] = useState(110);
  
  const { isMobile } = useDeviceType({ breakpoint: 769 });
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate(RouteNames.HOME);
  };

  useEffect(() => {
    if (isMobile) {
      setHeaderCardWidth(120);
      setHeaderCardHeight(78);
    } else {
      setHeaderCardWidth(136);
      setHeaderCardHeight(136);
    }
  }, [isMobile]);

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
          width={headerCardWidth}
          height={headerCardHeight}
          imgHeight={78}
          imgWidth={44}
        />
        <HeaderCard
          img={ShoppingCartIcon}
          text='Košarica'
          width={headerCardWidth}
          height={headerCardHeight}
          imgHeight={78}
          imgWidth={44}
        />
      </div>
    </div>
  );
};

export default ShoppingHeader;
