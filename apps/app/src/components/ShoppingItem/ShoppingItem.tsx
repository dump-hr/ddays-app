import React from 'react';
import styles from './ShoppingItem.module.scss';
import StarIcon from '@/assets/icons/rating-star-1.svg';
import { ShopItemDto } from '@ddays-app/types/src/dto/shop';
import { ShopItemType } from '@ddays-app/types/src/enum';
import { getShopItemImgFromType } from '../../helpers/getShopItemImgFromType';

interface ShoppingItemProps {
  isInCart: boolean;
  product: ShopItemDto;
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({ isInCart, product }) => {
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
        alt=''
      />
      <h3>{product.itemName}</h3>
      <p className={styles.productSupply}>Na zalihama: {product.quantity}</p>
      <div className={styles.addToCartButton}>
        <img src={StarIcon} alt='' />
        <span className={styles.pointsText}>{product.price}</span>
      </div>
    </div>
  );
};

export default ShoppingItem;
