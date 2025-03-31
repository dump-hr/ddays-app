import c from './Reward.module.scss';
import AwardImage from '@/assets/images/macbook.png';

export const Reward = () => {
  return (
    <div className={c.reward}>
      <div className={c.dottedBorderTopHorizontal} />
      <div className={c.dottedBorderLeftVertical} />
      <div className={c.dottedBorderBottomHorizontal} />
      <div className={c.dottedBorderRightVertical} />
      <img src={AwardImage} alt='award image' />
      <h3>Laptop macbook</h3>
    </div>
  );
};
