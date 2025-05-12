import Sheet from '../../assets/icons/sheet.svg';
import ArrowRight from '../../assets/icons/arrow-right-white.svg';

import c from './FeedbackButton.module.scss';

const FeedbackButton = () => {
  const handleClick = () => {
    const recipient = 'info@dump.hr';
    const subject = encodeURIComponent('Prijava greške u aplikaciji');
    const body = encodeURIComponent('');
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <button onClick={handleClick} className={c.button}>
      <img src={Sheet} className={c.icon} />
      Give us app feedback
      <img src={ArrowRight} className={c.arrow} />
    </button>
  );
};

export default FeedbackButton;
