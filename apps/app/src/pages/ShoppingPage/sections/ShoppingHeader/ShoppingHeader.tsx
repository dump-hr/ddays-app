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

  const { isMobile, isSmallMobile } = useDeviceType({ mobileBreakpoint: 769 });
  const navigate = useNavigate();
  const itemsInCart = 1;

  const navigateHome = () => {
    navigate(RouteNames.HOME);
  };

  useEffect(() => {
    if (isMobile) {
      setHeaderCardWidth(168);
      setHeaderCardHeight(110);
    } else if (isSmallMobile) {
      setHeaderCardWidth(136);
      setHeaderCardHeight(110);
    } else {
      setHeaderCardWidth(136);
      setHeaderCardHeight(136);
    }
  }, [isMobile, isSmallMobile]);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>SHOPPING</h1>
        <img src={CrossIcon} alt='' onClick={navigateHome} />
      </div>
      <div className={styles.navContainer}>
        <div className={styles.navigation}>
          {itemsInCart > 0 && (
            <div className={styles.numberOfItemsInCart}>{itemsInCart}</div>
          )}
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
    </div>
  );
};

export default ShoppingHeader;
