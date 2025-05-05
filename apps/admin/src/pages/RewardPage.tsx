import { useState } from 'react';

import { useRewardGetAll } from '../api/reward/useRewardGetAll';
import { useRewardRemove } from '../api/reward/useRewardRemove';
import { useRewardRemoveImage } from '../api/reward/useRewardRemoveImage';
import { useRewardUpdateImage } from '../api/reward/useRewardUpdateImage';
import { Button } from '../components/Button';
import { FileUpload } from '../components/FileUpload';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { RewardForm } from '../forms/RewardForm';

const RewardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rewardToEditId, setRewardToEditId] = useState<number>();

  const rewards = useRewardGetAll();
  const updateImage = useRewardUpdateImage();
  const removeImage = useRewardRemoveImage();
  const removeReward = useRewardRemove();

  const handleImageUpload = async (files: File[]) => {
    await updateImage.mutateAsync({ id: rewardToEditId, file: files[0] });
  };

  const handleImageRemove = async () => {
    await removeImage.mutateAsync(rewardToEditId);
  };

  if (rewards.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setRewardToEditId(undefined);
        }}>
        <RewardForm
          id={rewardToEditId}
          onSuccess={() => {
            setIsModalOpen(false);
            setRewardToEditId(undefined);
          }}
        />
        {rewardToEditId && (
          <>
            <p>Slika:</p>
            <FileUpload
              src={
                rewards.data?.find((reward) => reward.id === rewardToEditId)
                  ?.imageUrl
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
        data={rewards.data}
        actions={[
          {
            label: 'Uredi',
            action: (reward) => {
              setRewardToEditId(reward.id);
              setIsModalOpen(true);
            },
          },
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
