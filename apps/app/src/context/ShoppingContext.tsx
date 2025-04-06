import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { products } from '@/pages/ShoppingPage/sections/ShoppingItems/products';
import { ShopItemDto, TransactionItemDto } from '@ddays-app/types/src/dto/shop';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';

interface ShoppingContextType {
  cartItems: ShopItemDto[];
  setCartItems: React.Dispatch<React.SetStateAction<ShopItemDto[]>>;
  userPoints: number;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
  productsList: typeof products;
  setProductsList: React.Dispatch<React.SetStateAction<typeof products>>;
  totalCost: number;
  boughtItems: TransactionItemDto[];
  setBoughtItems: React.Dispatch<React.SetStateAction<TransactionItemDto[]>>;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(
  undefined,
);

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error(
      'useShoppingContext must be used within a ShoppingProvider',
    );
  }
  return context;
};

export const ShoppingProvider = ({ children }: { children: ReactNode }) => {
  /* const { data: user, isLoading } = useLoggedInUser(); */

  const [boughtItems, setBoughtItems] = useState<TransactionItemDto[]>([]);
  const [cartItems, setCartItems] = useState<ShopItemDto[]>([]);
  const [userPoints, setUserPoints] = useState(1000 /* user?.points || 0 */);
  const [productsList, setProductsList] = useState(products);

  /*  useEffect(() => {
    if (user) setUserPoints(user?.points || 0);
  }, [isLoading, user]); */

  const totalCost = useMemo(
    () =>
      cartItems.reduce((acc, product) => {
        return acc + product.price;
      }, 0),
    [cartItems],
  );

  useEffect(() => {}, [userPoints]);

  return (
    <ShoppingContext.Provider
      value={{
        cartItems,
        setCartItems,
        userPoints,
        setUserPoints,
        productsList,
        setProductsList,
        totalCost,
        boughtItems,
        setBoughtItems,
      }}>
      {children}
    </ShoppingContext.Provider>
  );
};
