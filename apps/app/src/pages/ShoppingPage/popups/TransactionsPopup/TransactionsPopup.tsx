import styles from './TransactionsPopup.module.scss';
import { useShoppingContext } from '@/context/ShoppingContext';
import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import Button from '@/components/Button';
import TransactionItem from '@/components/TransactionItem';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
}

const TransactionsPopup = ({ closePopup, isOpen }: PopupProps) => {
  const { boughtItems } = useShoppingContext();

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
              <p className={styles.noTransactions}>Nema transackcija ⚠️</p>
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
