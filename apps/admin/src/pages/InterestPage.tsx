import { useState } from 'react';

import { useInterestGetAll } from '../api/interest/useInterestGetAll';
import { useInterestRemove } from '../api/interest/useInterestRemove';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { InterestForm } from '../forms/InterestForm';

export const InterestPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interestToEditId, setInterestToEditId] = useState<number>();

  const interests = useInterestGetAll();

  const removeInterest = useInterestRemove();

  if (interests.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setInterestToEditId(undefined);
        }}>
        <InterestForm
          id={interestToEditId}
          onSuccess={() => {
            setIsModalOpen(false);
            setInterestToEditId(undefined);
          }}
        />
      </Modal>

      <Button variant='primary' onClick={() => setIsModalOpen(true)}>
        New
      </Button>

      <Table
        data={interests.data}
        actions={[
          {
            label: 'Uredi',
            action: (interest) => {
              setInterestToEditId(interest.id);
              setIsModalOpen(true);
            },
          },
          {
            label: 'Obriši',
            action: (interest) => {
              if (confirm('Jesi li siguran?')) {
                removeInterest.mutateAsync(interest.id);
              }
            },
          },
        ]}
      />
    </>
  );
};
