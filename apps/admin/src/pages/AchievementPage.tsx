import { AchievementDto } from '@ddays-app/types';
import { useState } from 'react';

import { useAchievementGetAll } from '../api/achievement/useAchievementGetAll';
import { useAchievementRemove } from '../api/achievement/useAchievementRemove';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { AchievementForm } from '../forms/AchievementForm';

const AchievementPage = () => {
  const achievements = useAchievementGetAll();
  const removeAchievement = useAchievementRemove();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [achievementToEdit, setAchievementToEdit] = useState<AchievementDto>();

  if (achievements.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}>
        <AchievementForm
          onSuccess={() => setIsModalOpen(false)}
          achievement={achievementToEdit}
        />
      </Modal>
      <div className='flex'>
        <Button variant='primary' onClick={() => setIsModalOpen(true)}>
          New
        </Button>
      </div>
      <Table
        data={(achievements.data || []).map((achievement) => ({
          ...achievement,
        }))}
        actions={[
          {
            label: 'Uredi',
            action: (achievement) => {
              setAchievementToEdit(achievement);
              setIsModalOpen(true);
            },
          },
          {
            label: 'Obriši',
            action: (achievement) => {
              if (confirm('Are you sure?')) {
                removeAchievement.mutateAsync(achievement.id);
              }
            },
          },
        ]}
      />
    </>
  );
};

export default AchievementPage;
