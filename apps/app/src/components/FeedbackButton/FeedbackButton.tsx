import Sheet from '../../assets/icons/sheet.svg';
import ArrowRight from '../../assets/icons/arrow-right-white.svg';

import c from './FeedbackButton.module.scss';

type FeedbackButtonProps = {
  onClick: () => void;
};

const FeedbackButton: React.FC<FeedbackButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={c.button}>
      <img src={Sheet} className={c.icon} />
      Give us app feedback
      <img src={ArrowRight} className={c.arrow} />
    </button>
  );
};

export default FeedbackButton;
