import clsx from 'clsx';
import c from './BoothButton.module.scss';
import GoldBadge from '@/assets/images/badge-gold.png';
import SilverBadge from '@/assets/images/badge-silver.png';

type BoothButtonProps = {
  boothString: string;
  position: {
    x: number;
    y: number;
  };
};

enum BoothType {
  GOLD,
  SILVER,
}

const BoothButton = ({ boothString, position }: BoothButtonProps) => {
  const boothType =
    boothString.charAt(0) === 'Z' ? BoothType.GOLD : BoothType.SILVER;

  const classes = clsx({
    [c.boothButton]: true,
    [c.gold]: boothType === BoothType.GOLD,
  });

  const positionStyle = {
    left: `${position.x}%`,
    bottom: `${position.y}%`,
  };

  return (
    <button className={classes} style={positionStyle}>
      <img src={boothType === BoothType.GOLD ? GoldBadge : SilverBadge} />
      <p>{boothString}</p>
    </button>
  );
};

export default BoothButton;
