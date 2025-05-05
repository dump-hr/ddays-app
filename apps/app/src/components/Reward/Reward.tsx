import c from './Reward.module.scss';

type RewardProps = {
  name?: string;
  image?: string;
};
export const Reward = ({ name, image }: RewardProps) => {
  return (
    <div className={c.reward}>
      <div className={c.dottedBorderTopHorizontal} />
      <div className={c.dottedBorderLeftVertical} />
      <div className={c.dottedBorderBottomHorizontal} />
      <div className={c.dottedBorderRightVertical} />
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};
