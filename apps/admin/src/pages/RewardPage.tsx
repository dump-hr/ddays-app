import { useState } from 'react';
import { useRewardGetAll } from '../api/reward/useRewardGetAll';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { RewardForm } from '../forms/RewardForm';
import { useRewardRemove } from '../api/reward/useRewardRemove';

const RewardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rewardToEditId, setRewardToEditId] = useState<number>();

  const rewards = useRewardGetAll();

  const removeReward = useRewardRemove();

  if (rewards.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}>
        <RewardForm
          onSuccess={() => {
            setIsModalOpen(false);
          }}></RewardForm>
      </Modal>

      <div className='flex'>
        <Button variant='primary' onClick={() => setIsModalOpen(true)}>
          New
        </Button>
      </div>

      <Table
        data={rewards.data}
        actions={[
          {
            label: 'Obriši',
            action: (reward) => {
              if (confirm('Jesi li siguran?')) {
                removeReward.mutateAsync(reward.id);
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default RewardPage;
