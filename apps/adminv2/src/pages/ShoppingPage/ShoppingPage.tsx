import { TableDashboard } from '../../components/TableDashboard';
import { useGetAllShopItems } from '../../api/shop/useGetAllShopItems';
import { ShoppingForm } from '../../forms/ShoppingForm';

export const ShoppingPage = () => {
  const { data: shopItems, refetch } = useGetAllShopItems();

  if (!shopItems) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={shopItems}
      dataType='ShopItemDto'
      onRefresh={refetch}
      renderForm={(onSuccess) => <ShoppingForm onSuccess={onSuccess} />}
    />
  );
};
