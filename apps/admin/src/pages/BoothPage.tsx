import { BoothDto } from '@ddays-app/types';
import { useState } from 'react';

import { useGetBooths } from '../api/booth/useGetBooths';
import { useRemoveBooth } from '../api/booth/useRemoveBooth';
import { useCompanyGetAllPublic } from '../api/company/useCompanyGetAllPublic';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { BoothForm } from '../forms/BoothForm';
import { ManyBoothsForm } from '../forms/ManyBoothsForm';

export const BoothPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boothToEdit, setBoothToEdit] = useState<BoothDto>();

  const booths = useGetBooths();
  const companies = useCompanyGetAllPublic();

  const [isManyModalOpen, setIsManyModalOpen] = useState(false);

  const removeBooth = useRemoveBooth();

  if (booths.isLoading || companies.isLoading) {
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
        <ManyBoothsForm
          onSuccess={() => {
            setIsManyModalOpen(false);
          }}
        />
      </Modal>

      <div className='flex'>
        <Button variant='primary' onClick={() => setIsModalOpen(true)}>
          New
        </Button>

        <Button variant='primary' onClick={() => setIsManyModalOpen(true)}>
          New (many)
        </Button>
      </div>

      <Table
        data={(booths.data || []).map((booth) => ({
          companyName:
            companies.data?.find((company) => company.id === booth.companyId)
              ?.name || null,
          ...booth,
        }))}
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
