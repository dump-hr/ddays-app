import { useState } from 'react';

import { useAchievementGetAll } from '../api/achievement/useAchievementGetAll';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { AchievementForm } from '../forms/AchievementForm';

const AchievementPage = () => {
  const achievements = useAchievementGetAll();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (achievements.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
        }}>
        <AchievementForm onSuccess={() => setIsCreateModalOpen(false)} />
      </Modal>
      <div className='flex'>
        <Button variant='primary' onClick={() => setIsCreateModalOpen(true)}>
          New
        </Button>
      </div>
      <Table
        data={(achievements.data || []).map((achievement) => ({
          ...achievement,
        }))}
      />
    </>
  );
};

export default AchievementPage;
