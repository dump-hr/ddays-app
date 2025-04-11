import { useState } from 'react';
import TransactionPopup from '@/pages/ShoppingPage/popups/TransactionPopup';
import styles from './TransactionItem.module.scss';

import { getShopItemImgFromType } from '@/helpers/getShopItemImgFromType';
import { ShopItemType, ShoppingCartItemStage } from '@ddays-app/types';
import { TransactionItemResponseDto } from '@ddays-app/types/src/dto/shop';
import { useGetAllUserTransactions } from '@/api/shop/useGetAllUserTransactions';
import { getTimeFromDate } from '@/helpers/getTimeFromDate';

interface TransactionItemProps {
  item: TransactionItemResponseDto;
  index: number;
}

const TransactionItem = ({ item, index }: TransactionItemProps) => {
  const [isOpenTransactionPopup, setOpenTransactionPopup] = useState(false);
  const { data: boughtItems } = useGetAllUserTransactions();

  const getStageText = (stage: ShoppingCartItemStage) => {
    switch (stage) {
      case ShoppingCartItemStage.COLLECTED:
        return 'Preuzeto';
      case ShoppingCartItemStage.UNCOLLECTED:
        return 'Nepreuzeto';
      default:
        return 'Nepoznato';
    }
  };

  return (
    <div className={styles.cartItemContainer}>
      {isOpenTransactionPopup && (
        <TransactionPopup
          isOpen={isOpenTransactionPopup}
          closePopup={() => setOpenTransactionPopup(false)}
          item={item}
        />
      )}
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={getShopItemImgFromType(item.shopItem.type as ShopItemType)}
        />
      </div>
      <div className={styles.itemDetails}>
        <h3>{item.shopItem.itemName}</h3>
        <p className={styles.quantity}>
          Stanje:{' '}
          <span
            style={
              item.stage === ShoppingCartItemStage.COLLECTED
                ? { color: '#5FB728' }
                : { color: '#FF3737' }
            }>
            {getStageText(item.stage)}
          </span>
        </p>
        <p className={styles.quantity}>
          {`Potrebno preuzesti do ${
            item.takeByTime &&
            getTimeFromDate(new Date(item.takeByTime).toISOString())
          }`}
        </p>
        <div
          className={styles.viewTransactionButton}
          onClick={() => setOpenTransactionPopup(true)}>
          RAČUN
        </div>
      </div>
      {boughtItems?.length !== index + 1 && <div className={styles.divider} />}
    </div>
  );
};

export default TransactionItem;
