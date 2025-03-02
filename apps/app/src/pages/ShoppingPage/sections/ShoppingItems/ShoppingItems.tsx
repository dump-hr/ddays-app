import styles from './ShoppingItems.module.scss';
import StarIcon from '@/assets/icons/rating-star-1.svg';
import { useEffect, useState } from 'react';
import { ShoppingItem } from '../../../../components/ShoppingItem';
import { products, userPointsAmount } from './products';

interface ShoppingItemsProps {
  setNumItemsInCart: (updateFn: (prev: number) => number) => void;
}

const ShoppingItems: React.FC<ShoppingItemsProps> = ({ setNumItemsInCart }) => {
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    setUserPoints(userPointsAmount);
  }, []);

  return (
    <div className={styles.shoppingItemsWrapper}>
      <div className={styles.shoppingItemsContainer}>
        <div className={styles.shoppingItemsUserPoints}>
          <p>Tvoje stanje s bodovima</p>
          <div className={styles.points}>
            <img src={StarIcon} alt='' />
            <span>{userPoints}</span>
          </div>
        </div>
        <div className={styles.products}>
          {products.map((product) => (
            <ShoppingItem
              key={product.id}
              product={product}
              userPointsAmount={userPoints}
              setNumItemsInCart={setNumItemsInCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingItems;
