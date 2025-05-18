import { useState } from 'react';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { ShoppingForm } from '../forms/ShoppingForm';
import { useGetAllShopItems } from '../api/shop/useGetAllShopItems';
import { useDeleteShopItem } from '../api/shop/useDeleteShopItem';

const ShoppingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shoppingItemIdToEdit, setShoppingItemIdToEdit] = useState<number>();

  const shopItems = useGetAllShopItems();
  const deleteShopItem = useDeleteShopItem();

  if (shopItems.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setShoppingItemIdToEdit(undefined);
        }}>
        <ShoppingForm
          id={shoppingItemIdToEdit}
          onSuccess={() => {
            setIsModalOpen(false);
            setShoppingItemIdToEdit(undefined);
          }}
        />
      </Modal>
      <div className='flex'>
        <Button variant='primary' onClick={() => setIsModalOpen(true)}>
          New
        </Button>
      </div>

      <Table
        data={shopItems.data}
        actions={[
          {
            label: 'Uredi',
            action: (event) => {
              setIsModalOpen(true);
              setShoppingItemIdToEdit(event.id);
            },
          },
          {
            label: 'Obriši',
            action: (event) => {
              if (confirm('Jesi li siguran?')) {
                deleteShopItem.mutate({ id: event.id });
              }
            },
          },
        ]}
      />
    </>
  );
};

export default ShoppingPage;
