import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import styles from './TransactionsPopup.module.scss';
import Button from '@/components/Button';
/* import { useShoppingContext } from '@/context/ShoppingContext'; */
import TransactionItem from '@/components/TransactionItem';
import { ShopItemType } from '@ddays-app/types';
import { TransactionItemDto } from '@ddays-app/types/src/dto/shop';
import { ShoppingCartItemStage } from '@ddays-app/types/src/enum';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
}

const TransactionsPopup = ({ closePopup, isOpen }: PopupProps) => {
  /* const { boughtItems } = useShoppingContext(); */
  const boughtItems: TransactionItemDto[] = [
    {
      shopItemId: 1,
      shopItem: {
        id: 1,
        type: ShopItemType.MUG,
        itemName: 'DUMP DAYS MAJICA',
        quantity: 10,
        price: 200,
      },
      userId: 1,
      quantity: 1,
      stage: ShoppingCartItemStage.COLLECTED,
      orderedAt: new Date().toISOString(),
      takeByTime: '21:00',
    },
    {
      shopItemId: 2,
      shopItem: {
        id: 2,
        type: ShopItemType.MUG,
        itemName: 'Vino',
        quantity: 5,
        price: 200,
      },
      userId: 1,
      quantity: 1,
      stage: ShoppingCartItemStage.COLLECTED,
      orderedAt: new Date().toISOString(),
      takeByTime: '21:00',
    },
    {
      shopItemId: 3,
      shopItem: {
        id: 3,
        type: ShopItemType.MUG,
        itemName: 'Rakija',
        quantity: 8,
        price: 200,
      },
      userId: 1,
      quantity: 1,
      stage: ShoppingCartItemStage.UNCOLLECTED,
      orderedAt: new Date().toISOString(),
      takeByTime: '21:00',
    },
  ];

  return (
    <PopupLayout
      variant='light'
      headerTitleComponent={<>Transakcije</>}
      closePopup={closePopup}
      isOpen={isOpen}>
      <div className={styles.cartContainer}>
        <div className={styles.contentDiv}>
          {boughtItems.length > 0 ? (
            boughtItems.map((item, index) => (
              <TransactionItem
                key={index}
                item={item}
                index={index}
                closePopup={closePopup}
              />
            ))
          ) : (
            <div className={styles.emptyCart}>
              <p>Nema transackcija</p>
            </div>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <Button
            variant='black'
            style={{ width: '100%' }}
            onClick={closePopup}>
            ZATVORI
          </Button>
        </div>
      </div>
    </PopupLayout>
  );
};

export default TransactionsPopup;
