import clsx from 'clsx';
import c from './InterestCard.module.scss';
import { InterestDto } from '@ddays-app/types';
import RemoveIcon from '@/assets/icons/remove-icon.svg';

type Props = {
  interest: InterestDto;
  isSelected: boolean;
  allowSelection: boolean;
  handleInterestClick: (interest: InterestDto) => void;
};

const InterestCard = ({
  interest,
  isSelected,
  allowSelection,
  handleInterestClick,
}: Props) => {
  return (
    <div
      className={clsx({
        [c.interestsCard]: true,
        [c.selected]: isSelected,
        [c.clickable]: allowSelection,
      })}
      key={interest.id}
      onClick={() => handleInterestClick(interest)}>
      {interest.name}
      {isSelected && allowSelection && (
        <img src={RemoveIcon} alt='remove icon' width={10} height={10}></img>
      )}
    </div>
  );
};

export default InterestCard;
