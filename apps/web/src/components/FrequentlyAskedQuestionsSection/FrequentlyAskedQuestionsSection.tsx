import { useState } from 'react';

import { useFrequentlyAskedQuestionGetAll } from '../../api/frequently-asked-question/useFrequentlyAskedQuestionGetAll';
import FrequentlyAskedQuestionCard from './FrequentlyAskedQuestionCard';
import c from './FrequentlyAskedQuestionsSection.module.scss';

const FrequentlyAskedQuestionsSection = () => {
  const [openedCardId, setOpenedCardId] = useState<number | null>(null);

  const { data: frequentlyAskedQuestions, isLoading } =
    useFrequentlyAskedQuestionGetAll();

  if (isLoading) <div>Loading...</div>;

  return (
    <div className={c.container}>
      <div className={c.faqContainer}>
        <h1 className={c.faqContainerHeading}>FAQ</h1>
        {frequentlyAskedQuestions?.map((faq, index) => (
          <FrequentlyAskedQuestionCard
            faq={faq}
            index={++index}
            isRulerVisible={index !== frequentlyAskedQuestions.length}
            key={index}
            openCardId={openedCardId}
            setOpenCardId={setOpenedCardId}
          />
        ))}
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestionsSection;
