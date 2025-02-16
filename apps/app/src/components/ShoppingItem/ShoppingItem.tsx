import React from 'react';
import styles from './ShoppingItem.module.scss';
import StarIcon from '@/assets/icons/rating-star-1.svg';
import MugImg from '@/assets/images/coffee-mug.png';

const ShoppingItem: React.FC = () => {
  return (
    <div className={styles.product}>
      <div className={styles.dottedBorderTopHorizontal} />
      <div className={styles.dottedBorderLeftVertical} />
      <div className={styles.dottedBorderBottomHorizontal} />
      <div className={styles.dottedBorderRightVertical} />
      <img src={MugImg} alt='' />
      <h3>Gucci dump days majica</h3>
      <p className={styles.productSupply}>Na zalihama: 4</p>
      <div className={styles.addToCartButton}>
        <img src={StarIcon} alt='' />
        <span className={styles.pointsText}>299</span>
      </div>
    </div>
  );
};

export default ShoppingItem;
