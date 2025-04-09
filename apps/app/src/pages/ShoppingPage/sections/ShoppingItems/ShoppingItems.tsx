import { useGetAllShopItems } from '@/api/shop/useGetAllShopItems';
import styles from './ShoppingItems.module.scss';
import StarIcon from '@/assets/icons/rating-star-1.svg';

import { ShoppingItem } from '@/components/ShoppingItem';
import { useGetUserPoints } from '@/api/shop/useGetUserPoints';

const ShoppingItems: React.FC = () => {
  const { data /* , isLoading */ } = useGetUserPoints();
  const { data: productsList = [] } = useGetAllShopItems();

  return (
    <div className={styles.shoppingItemsWrapper}>
      <div className={styles.shoppingItemsContainer}>
        <div className={styles.shoppingItemsUserPoints}>
          <p>Tvoje stanje s bodovima</p>
          <div className={styles.points}>
            <img src={StarIcon} alt='' />
            <span>{data?.points}</span>
          </div>
        </div>
        <div className={styles.products}>
          {productsList?.map((product) => (
            <ShoppingItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingItems;
