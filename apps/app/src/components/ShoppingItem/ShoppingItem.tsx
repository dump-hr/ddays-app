import React from 'react';
import styles from './ShoppingItem.module.scss';
import StarIcon from '@/assets/icons/rating-star-1.svg';
import { ProductDTO } from '../../pages/ShoppingPage/sections/ShoppingItems/products';

interface ShoppingItemProps {
  isInCart: boolean;
  product: ProductDTO;
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({ isInCart, product }) => {
  return (
    <div className={styles.product}>
      <div className={styles.dottedBorderTopHorizontal} />
      <div className={styles.dottedBorderLeftVertical} />
      <div className={styles.dottedBorderBottomHorizontal} />
      <div className={styles.dottedBorderRightVertical} />
      {isInCart && <span className={styles.inCart}>U košarici</span>}
      <img src={product.img} alt='' />
      <h3>{product.name}</h3>
      <p className={styles.productSupply}>Na zalihama: {product.quantity}</p>
      <div className={styles.addToCartButton}>
        <img src={StarIcon} alt='' />
        <span className={styles.pointsText}>{product.price}</span>
      </div>
    </div>
  );
};

export default ShoppingItem;
