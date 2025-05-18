import { useState } from 'react';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { useGetAllShopItems } from '../api/shop/useGetAllShopItems';
import { Modal } from '../components/Modal';
import { ShoppingForm } from '../forms/ShoppingForm';

const ShoppingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shoppingItemIdToEdit, setShoppingItemIdToEdit] = useState<number>();

  const shopItems = useGetAllShopItems();

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
            },
          },
          {
            label: 'Obriši',
            action: (event) => {
              if (confirm('Jesi li siguran?')) {
              }
            },
          },
        ]}
      />
    </>
  );
};

export default ShoppingPage;
