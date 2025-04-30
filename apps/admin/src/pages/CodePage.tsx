import { CodeWithConnectedAchievementsDto } from '@ddays-app/types';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useCodeGetAllWithConnectedAchievements } from '../api/code/useCodeGetAllWithConnectedAchievements';
import { useCodeRemove } from '../api/code/useCodeRemove';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { CodeForm } from '../forms/CodeForm';
import { CodeHelper } from '../helpers/code';

const CodePage = () => {
  const codes = useCodeGetAllWithConnectedAchievements();
  const removeCode = useCodeRemove();

  const [uniqueCode, setUniqueCode] = useState<string | undefined>(
    CodeHelper.generateUniqueCode(codes.data),
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codeToEdit, setCodeToEdit] = useState<
    CodeWithConnectedAchievementsDto | undefined
  >(undefined);

  if (codes.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCodeToEdit(undefined);
        }}>
        <CodeForm
          onSuccess={() => {
            setIsModalOpen(false);
            setCodeToEdit(undefined);
          }}
          code={codeToEdit}
        />
      </Modal>

      <div className='flex'>
        <Button variant='primary' onClick={() => setIsModalOpen(true)}>
          New
        </Button>
        <Button
          variant='secondary'
          onClick={() =>
            navigator.clipboard
              .writeText(uniqueCode || '')
              .then(() =>
                toast.success('Code ' + uniqueCode + ' copied to clipboard!'),
              )
              .then(() =>
                setUniqueCode(CodeHelper.generateUniqueCode(codes.data)),
              )
          }>
          Generate Unique Code
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
