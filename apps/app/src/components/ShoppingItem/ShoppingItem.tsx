import React, { useEffect, useState } from 'react';
import styles from './ShoppingItem.module.scss';
import StarIcon from '@/assets/icons/rating-star-1.svg';
import StarIconGrey from '@/assets/icons/rating-star-disabled.svg';

import { ShopItemDto } from '@ddays-app/types/src/dto/shop';
import { ShopItemType } from '@ddays-app/types/src/enum';
import { getShopItemImgFromType } from '../../helpers/getShopItemImgFromType';
import toast from 'react-hot-toast';

interface ShoppingItemProps {
  userPointsAmount: number;
  product: ShopItemDto;
  setNumItemsInCart: (updateFn: (prev: number) => number) => void;
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({
  product,
  userPointsAmount,
  setNumItemsInCart,
}) => {
  const [isInCart, setIsInCart] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const outOfStock = product.quantity === 0;
  const notEnoughPoints = userPointsAmount < product.price;

  useEffect(() => {
    setDisabled(isInCart || outOfStock || notEnoughPoints);
  }, [isInCart, outOfStock, notEnoughPoints]);

  const handleCartBtnClick = () => {
    if (disabled) return;

    setNumItemsInCart((prev) => prev + 1);
    setIsInCart(true);
    toast.success('Proizvod dodan u košaricu');
  };

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
        className={`${styles.productSupply} ${
          disabled ? styles.productSupplyDisabled : ''
        }`}>
        Na zalihama: {product.quantity}
      </p>
      <div
        aria-disabled={disabled}
        onClick={handleCartBtnClick}
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
