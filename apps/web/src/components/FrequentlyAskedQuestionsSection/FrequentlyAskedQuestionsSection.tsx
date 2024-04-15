import { useFrequentlyAskedQuestionGetAll } from '../../api/frequently-asked-question/useFrequentlyAskedQuestionGetAll';

const FrequentlyAskedQuestionsSection = () => {
  const { data: frequentlyAskedQuestions, isLoading } =
    useFrequentlyAskedQuestionGetAll();

  if (isLoading) <div>Loading...</div>;

  return (
    <div>
      {frequentlyAskedQuestions?.map((faq) => <div>{faq.question}</div>)}
    </div>
  );
};

export default FrequentlyAskedQuestionsSection;
