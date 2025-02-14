import styles from './ShoppingItems.module.scss';
import StarIcon from '@/assets/icons/rating-star-1.svg';
import ShoppingItem from '../../../../components/ShoppingItem';

const ShoppingItems = () => {
  return (
    <div className={styles.shoppingItemsWrapper}>
      <div className={styles.shoppingUserPoints}>
        <p>Tvoje stanje s bodovima</p>
        <div className={styles.points}>
          <img src={StarIcon} alt='' />
          <span>299</span>
        </div>
      </div>
      <div className={styles.products}>
        <ShoppingItem />
        <ShoppingItem />
        <ShoppingItem />
        <ShoppingItem />
        <ShoppingItem />
      </div>
    </div>
  );
};

export default ShoppingItems;
