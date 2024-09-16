import { FrequentlyAskedQuestionDto } from '@ddays-app/types';
import CloseSvg from 'assets/icons/minus.svg';
import OpenSvg from 'assets/icons/plus.svg';

import c from './FrequentlyAskedQuestionsSection.module.scss';

type FrequentlyAskedQuestionCardProps = {
  index: number;
  faq: FrequentlyAskedQuestionDto;
  isRulerVisible: boolean;
  openCardId: number | null;
  setOpenCardId: (id: number | null) => void;
};

const FrequentlyAskedQuestionCard: React.FC<
  FrequentlyAskedQuestionCardProps
> = ({ faq, index, isRulerVisible, openCardId, setOpenCardId }) => {
  const isAnswerOpen = openCardId === faq.id;

  const toggleAnswerOpen = () => {
    if (isAnswerOpen) {
      setOpenCardId(null);
    } else {
      setOpenCardId(faq.id);
    }
  };

  return (
    <>
      <div className={c.faqCard} onClick={toggleAnswerOpen}>
        <div className={c.faqCardLeft}>
          <div className={c.faqCardIndex}>{index}</div>
          <div className={c.faqCardInfo}>
            <h2 className={c.faqCardQuestion}>{faq.question}</h2>
            {isAnswerOpen && <p className={c.faqCardAnswer}>{faq.answer}</p>}
          </div>
        </div>
        <button className={c.faqCardButton} onClick={toggleAnswerOpen}>
          {isAnswerOpen ? (
            <img src={CloseSvg} alt='close icon' />
          ) : (
            <img src={OpenSvg} alt='open icon' />
          )}
        </button>
      </div>
      {isRulerVisible && (
        <div className={c.dottedRuler}>
          ...........................................................................................................................................................................................................................................................................................................................
        </div>
      )}
    </>
  );
};

export default FrequentlyAskedQuestionCard;
