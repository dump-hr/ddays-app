import { useState } from 'react';
import { useRewardGetAll } from '../api/reward/useRewardGetAll';
import { Modal } from '../components/Modal';

const RewardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rewards = useRewardGetAll();

  if (rewards.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* <RewardForm /> */}
        <p></p>
      </Modal>
    </>
  );
};

export default RewardPage;
