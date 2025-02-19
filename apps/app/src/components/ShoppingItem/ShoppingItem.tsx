import React from 'react';
import styles from './ShoppingItem.module.scss';
import StarIcon from '@/assets/icons/rating-star-1.svg';
import StarIconGrey from '@/assets/icons/rating-star-disabled.svg';
import { ShopItemDto } from '@ddays-app/types/src/dto/shop';
import { ShopItemType } from '@ddays-app/types/src/enum';
import { getShopItemImgFromType } from '../../helpers/getShopItemImgFromType';

interface ShoppingItemProps {
  isInCart: boolean;
  userPointsAmount: number;
  product: ShopItemDto;
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({
  isInCart,
  product,
  userPointsAmount,
}) => {
  const outOfStock = product.quantity === 0;
  const notEnoughPoints = userPointsAmount < product.price;

  const disabled = isInCart || outOfStock || notEnoughPoints;
  
  return (
    <div className={styles.product}>
      <div className={styles.dottedBorderTopHorizontal} />
      <div className={styles.dottedBorderLeftVertical} />
      <div className={styles.dottedBorderBottomHorizontal} />
      <div className={styles.dottedBorderRightVertical} />
      {isInCart && <span className={styles.inCart}>U košarici</span>}
      <img
        className={styles.productImage}
        src={getShopItemImgFromType(product.type as ShopItemType)}
        alt='shop-item'
      />
      <h3>{product.itemName}</h3>
      <p
        style={disabled ? { color: '#B3B3B2' } : {}}
        className={styles.productSupply}>
        Na zalihama: {product.quantity}
      </p>
      <div
        aria-disabled={disabled}
        className={`${styles.addToCartButton} ${
          disabled ? styles.addToCartButtonDisabled : ''
        }`}>
        <img
          className={styles.ratingStar}
          src={disabled ? StarIconGrey : StarIcon}
          alt=''
        />
        <span className={styles.pointsText}>
          {!isInCart ? product.price : 'MAX. 1'}
        </span>
      </div>
    </div>
  );
};

export default ShoppingItem;
