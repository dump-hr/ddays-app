import { ShopItemType } from '@ddays-app/types/src/enum';
import CoffeeMugImg from '@/assets/images/coffee-mug.png';
import ShirtImg from '@/assets/images/t-shirt.png';
import DuckImg from '@/assets/images/duck.png';
import PlaceholderImg from '@/assets/images/placeholder.png';

export function getShopItemImgFromType(type: ShopItemType | null): string {
  switch (type) {
    case ShopItemType.HOODIE:
      return ShirtImg;
    case ShopItemType.MUG:
      return CoffeeMugImg;
    case ShopItemType.SHIRT:
      return ShirtImg;
    case ShopItemType.STICKER:
      return DuckImg;
    default:
      return PlaceholderImg;
  }
}
