import { useFrequentlyAskedQuestionGetAll } from '../../api/frequently-asked-question/useFrequentlyAskedQuestionGetAll';
import FrequentlyAskedQuestionCard from './FrequentlyAskedQuestionCard';
import c from './FrequentlyAskedQuestionsSection.module.scss';

const FrequentlyAskedQuestionsSection = () => {
  const { data: frequentlyAskedQuestions, isLoading } =
    useFrequentlyAskedQuestionGetAll();

  if (isLoading) <div>Loading...</div>;

  return (
    <div className={c.container}>
      <h1 className={c.heading}>FAQ</h1>
      {frequentlyAskedQuestions?.map((faq, i) => (
        <FrequentlyAskedQuestionCard faq={faq} index={++i} />
      ))}
    </div>
  );
};

export default FrequentlyAskedQuestionsSection;
