import { useFetchAllFrequentlyAskedQuestions } from '../../api/useFetchFrequentlyAskedQuestions';
import Table from '../../components/Table';

const headers = ['Id', 'Pitanje', 'Odgovor', 'Akcije'];

const buttonActions = [
  {
    label: 'Uredi',
    action: (row: object) => {
      console.log('Uredi', row);
    },
  },
  {
    label: 'Obriši',
    action: (row: object) => {
      console.log('Obriši', row);
    },
  },
];

const FrequentlyAskedQuestionPage = () => {
  const { data: frequentlyAskedQuestions, isLoading } =
    useFetchAllFrequentlyAskedQuestions();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Table
      headers={headers}
      data={frequentlyAskedQuestions}
      buttonActions={buttonActions}
    />
  );
};

export default FrequentlyAskedQuestionPage;
