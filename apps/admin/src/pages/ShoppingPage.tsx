import { useState } from 'react';

import { useDeleteShopItem } from '../api/shop/useDeleteShopItem';
import { useGetAllShopItems } from '../api/shop/useGetAllShopItems';
import { useRemoveShopItemImage } from '../api/shop/useRemoveShopItemImage';
import { useUpdateShopItemImage } from '../api/shop/useUpdateShopItemImage';
import { Button } from '../components/Button';
import { FileUpload } from '../components/FileUpload';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { ShoppingForm } from '../forms/ShoppingForm';

const ShoppingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shoppingItemIdToEdit, setShoppingItemIdToEdit] = useState<number>();

  const shopItems = useGetAllShopItems();
  const deleteShopItem = useDeleteShopItem();

  const updateImage = useUpdateShopItemImage();
  const removeImage = useRemoveShopItemImage();

  if (shopItems.isLoading) {
    return <div>Loading...</div>;
  }

  const handleImageUpload = async (files: File[]): Promise<void> => {
    await updateImage.mutateAsync({ id: shoppingItemIdToEdit, file: files[0] });
  };

  const handleImageRemove = async (): Promise<void> => {
    await removeImage.mutateAsync({ id: shoppingItemIdToEdit });
  };

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

        {shoppingItemIdToEdit && (
          <>
            <p>Slika:</p>
            <FileUpload
              src={
                shopItems.data?.find(
                  (shopItem) => shopItem.id === shoppingItemIdToEdit,
                )?.imageUrl
              }
              handleUpload={handleImageUpload}
              handleRemove={handleImageRemove}
            />
          </>
        )}
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
            action: (shopItem) => {
              setIsModalOpen(true);
              setShoppingItemIdToEdit(shopItem.id);
            },
          },
          {
            label: 'Obriši',
            action: (shopItem) => {
              if (
                confirm(
                  'Jesi li siguran? Ova akcija će izbrisati i sve transakcije vezane za ovaj proizvod!',
                )
              ) {
                deleteShopItem.mutate({ id: shopItem.id });
              }
            },
          },
        ]}
      />
    </>
  );
};

export default ShoppingPage;
