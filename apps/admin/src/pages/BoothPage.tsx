import { AdminBoothDto } from '@ddays-app/types';
import { useState } from 'react';

import { useGetBoothes } from '../api/booth/useGetBoothes';
import { useRemoveBooth } from '../api/booth/useRemoveBooth';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { BoothForm } from '../forms/BoothForm';
import { ManyBoothesForm } from '../forms/ManyBoothesForm';

export const BoothPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boothToEdit, setBoothToEdit] = useState<AdminBoothDto>();

  const companies = useGetBoothes();
  const [isManyModalOpen, setIsManyModalOpen] = useState(false);

  const removeBooth = useRemoveBooth();

  if (companies.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setBoothToEdit(undefined);
        }}>
        <BoothForm
          booth={boothToEdit}
          onSuccess={() => {
            setIsModalOpen(false);
            setBoothToEdit(undefined);
          }}
        />
      </Modal>

      <Modal
        isOpen={isManyModalOpen}
        onClose={() => {
          setIsManyModalOpen(false);
        }}>
        <ManyBoothesForm
          onSuccess={() => {
            setIsManyModalOpen(false);
          }}
        />
      </Modal>

      <Button variant='primary' onClick={() => setIsModalOpen(true)}>
        New
      </Button>

      <Button variant='primary' onClick={() => setIsManyModalOpen(true)}>
        New (many)
      </Button>

      <Table
        data={companies.data}
        actions={[
          {
            label: 'Uredi',
            action: (booth) => {
              setBoothToEdit(booth);
              setIsModalOpen(true);
            },
          },
          {
            label: 'Obriši',
            action: (booth) => {
              if (confirm('Are you sure?')) {
                removeBooth.mutateAsync(booth.id);
              }
            },
          },
        ]}
      />
    </>
  );
};
