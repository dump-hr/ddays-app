import { useEffect, useState } from 'react';
import styles from './ShoppingHeader.module.scss';
import TransactionsIcon from '@/assets/icons/transactions-icon.svg';
import ShoppingCartIcon from '@/assets/icons/shopping-cart-icon.svg';

import { useDeviceType } from '../../../../hooks/UseDeviceType';
import { HeaderCard } from '../../../../components/Header/HeaderCard/HeaderCard';
import NavigateHomeButton from '../../../../components/NavigateHomeButton';

interface ShoppingHeaderProps {
  numItemsInCart: number;
}

const ShoppingHeader: React.FC<ShoppingHeaderProps> = ({ numItemsInCart }) => {
  const [headerCardWidth, setHeaderCardWidth] = useState(168);
  const [headerCardHeight, setHeaderCardHeight] = useState(110);
  const { isMobile, isSmallMobile } = useDeviceType({ mobileBreakpoint: 769 });

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
        <NavigateHomeButton />
      </div>
      <div className={styles.navContainer}>
        <div className={styles.navigation}>
          {numItemsInCart > 0 && (
            <div className={styles.numberOfItemsInCart}>{numItemsInCart}</div>
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
