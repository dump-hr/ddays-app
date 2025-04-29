import { CodeDto } from '@ddays-app/types';
import { useState } from 'react';

import { useCodeGetAll } from '../api/code/useCodeGetAll';
import { useCodeRemove } from '../api/code/useCodeRemove';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { CodeForm } from '../forms/CodeForm';

const CodePage = () => {
  const codes = useCodeGetAll();
  const removeCode = useCodeRemove();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codeToEdit, setCodeToEdit] = useState<CodeDto | undefined>(undefined);

  if (codes.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}>
        <CodeForm onSuccess={() => setIsModalOpen(false)} code={codeToEdit} />
      </Modal>

      <div className='flex'>
        <Button variant='primary' onClick={() => setIsModalOpen(true)}>
          New
        </Button>
        <Button variant='secondary' onClick={() => console.log(codes)}>
          Log Codes
        </Button>
      </div>
      <Table
        data={(codes.data || []).map((achievement) => ({
          ...achievement,
        }))}
        actions={[
          {
            label: 'Uredi',
            action: (code) => {
              setCodeToEdit(code);
              setIsModalOpen(true);
            },
          },
          {
            label: 'Obriši',
            action: (code) => {
              if (confirm('Are you sure?')) {
                removeCode.mutateAsync(code.id);
              }
            },
          },
        ]}
      />
    </>
  );
};

export default CodePage;
