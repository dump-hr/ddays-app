import { CodeWithConnectedAchievementsDto } from '@ddays-app/types';
import { useState } from 'react';

import { useCodeGetAllWithConnectedAchievements } from '../api/code/useCodeGetAllWithConnectedAchievements';
import { useCodeRemove } from '../api/code/useCodeRemove';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { CodeForm } from '../forms/CodeForm';

const CodePage = () => {
  const codes = useCodeGetAllWithConnectedAchievements();
  const removeCode = useCodeRemove();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codeToEdit, setCodeToEdit] = useState<
    CodeWithConnectedAchievementsDto | undefined
  >(undefined);
  /// OVO GORE NAPRAVIT DA UZ KOD ODMA DODAJE I CONNECTED ACHIEVEMENTS!

  if (codes.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {codeToEdit && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}>
          <CodeForm onSuccess={() => setIsModalOpen(false)} code={codeToEdit} />
        </Modal>
      )}

      <div className='flex'>
        <Button variant='primary' onClick={() => setIsModalOpen(true)}>
          New
        </Button>
        <Button variant='secondary' onClick={() => console.log(codes)}>
          Log Codes
        </Button>
      </div>
      <Table
        data={(codes.data || []).map((code) => ({
          ...code,
        }))}
        actions={[
          {
            label: 'Uredi',
            action: (code) => {
              setCodeToEdit(code as CodeWithConnectedAchievementsDto);
              setIsModalOpen(true);
            },
          },
          {
            label: 'Obriši',
            action: (code) => {
              if (confirm('Are you sure?')) {
                removeCode.mutateAsync(
                  (code as CodeWithConnectedAchievementsDto).id,
                );
              }
            },
          },
        ]}
      />
    </>
  );
};

export default CodePage;
