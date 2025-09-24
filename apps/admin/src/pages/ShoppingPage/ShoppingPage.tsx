import { TableDashboard } from '../../components/TableDashboard';
import { useGetAllShopItems } from '../../api/shop/useGetAllShopItems';
import { ShoppingForm } from '../../forms/ShoppingForm';
import { useDeleteShopItem } from '../../api/shop/useDeleteShopItem';
import toast from 'react-hot-toast';

export const ShoppingPage = () => {
  const { data: shopItems, refetch } = useGetAllShopItems();
  const deleteShopItem = useDeleteShopItem();

  const handleDelete = async (ids: number[]) => {
    if (ids.length > 10) {
      toast.error('Možete obrisati maksimalno 10 zapisa odjednom.');
      return;
    }

    if (confirm('Jesi li siguran da želiš obrisati odabrane zapise?')) {
      for (const id of ids) {
        await deleteShopItem.mutateAsync({ id });
      }
      refetch();
    }
  };

  if (!shopItems) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={shopItems}
      dataType='ShopItemDto'
      onRefresh={refetch}
      renderForm={(onSuccess, id) => (
        <ShoppingForm onSuccess={onSuccess} id={id} />
      )}
      onDelete={handleDelete}
      onEdit={() => {}}
    />
  );
};
