import c from './Reward.module.scss';
import AwardImage from '@/assets/images/macbook.png';

export const Reward = () => {
  return (
    <div className={c.reward}>
      <img src={AwardImage} alt='award image' />
      <h3>Laptop macbook</h3>
    </div>
  );
};
